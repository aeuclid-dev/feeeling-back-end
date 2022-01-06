import firebase from 'firebase-admin';
import pushAccount from './feeeling1-15d7c-firebase-adminsdk-q9bcc-4404943b0c.json';

export const push = firebase.initializeApp({
  credential: firebase.credential.cert(pushAccount as Object),
});
