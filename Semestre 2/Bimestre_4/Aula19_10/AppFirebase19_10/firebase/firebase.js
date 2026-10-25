import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCSMpGl492UKo1tQuDFfL3k7plJsFb4-k8',
  authDomain: 'appteste-3b1cf.firebaseapp.com',
  projectId: 'appteste-3b1cf',
  storageBucket: 'appteste-3b1cf.firebasestorage.app',
  messagingSenderId: '200228507512',
  appId: '1:200228507512:web:2c9f022dd86a68d4adc28d',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);