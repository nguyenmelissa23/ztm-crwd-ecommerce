import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('NLYaCKgw7p9zXHUexsJZ').collection('cartItems').doc('GNxGdt4oVUxpt3CAuRc6');
firestore.doc('/users/NLYaCKgw7p9zXHUexsJZ/cartItems/GNxGdt4oVUxpt3CAuRc6'); //equivalent

