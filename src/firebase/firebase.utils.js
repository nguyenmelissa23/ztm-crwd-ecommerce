import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// API Address
const config = {
    apiKey: "AIzaSyCbKNkbzG71fe-Ne4SwuvjDby0LMtL7iIs",
    authDomain: "crwd-db-381d0.firebaseapp.com",
    databaseURL: "https://crwd-db-381d0.firebaseio.com",
    projectId: "crwd-db-381d0",
    storageBucket: "crwd-db-381d0.appspot.com",
    messagingSenderId: "762617274076",
    appId: "1:762617274076:web:0dda23f433dd06d5b01e19"
  };

firebase.initializeApp(config);


export const signInWithEmail = (email, password) => auth.signInWithEmailAndPassword(email, password)
	.then( result => {
    // result.user.tenantId should be ‘TENANT_PROJECT_ID’.
		console.log('login result:', result);
  })
	.catch(error => {
    // Handle error.
		console.log('login error:', error);
  });

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return; // if it is not null, this = true ==> 
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	// NOTE: Firebase always gives us back the userRef and snapshot object even if there is none
	const collectionRef = firestore.collection('users');

	const snapshot = await userRef.get();
	const collectionSnapshot = await collectionRef.get();
	console.log('{collectionSnapshot}',{collectionSnapshot: collectionSnapshot.docs.map(doc => doc.data())});
	// console.log('snapshot');
	if (!snapshot.exists){ //if the snapshot does NOT exist, create new. NOTE: only at this point, do we know whether this "exists" or not.
		const { email, displayName } = userAuth;
		const createAt = new Date();
		
		try {
			await userRef.set({
				email,
				createAt, 
				displayName, 
				...additionalData
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}
	return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);
	
	const batch = firestore.batch(); // "batch" all items needed to be added together so that if one fails, they all fail and only go through if all passes.

	objectsToAdd.forEach(obj => {
		//foreach won't return an array but do the actions for each of the items in the array)
		const newDocRef = collectionRef.doc();
		// create a new collection reference
		batch.set(newDocRef, obj);
		// then set it with the new obj using "batch"
	});

	return await batch.commit(); // then commit everything. 
}

export const convertCollectionsSnapshotToMap  = (collectionsSnapshot) => {
	const transformedCollection = collectionsSnapshot.docs.map(doc => {
		const {title, items} = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()), 
			id: doc.id,
			title, 
			items
		};
	});

	console.log('transformedCollection', transformedCollection);
	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
		//destructure the collection from the database to key (hats, jeans): value (item objects) pairs.
	}, {});
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;