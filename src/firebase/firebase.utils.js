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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return; // if it is null, this = true ==> 
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapshot = await userRef.get();
	// console.log('snapshot');
	// console.log(snapshot);
	if (!snapshot.exists){ //if there is no snapshot, create new.
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
}

export default firebase;