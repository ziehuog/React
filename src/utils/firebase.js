import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfDS5eWjiWq7b9A4G2A6ITmViuMzf1kDw",
  authDomain: "ziehuog.firebaseapp.com",
  databaseURL: "https://ziehuog-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ziehuog",
  storageBucket: "ziehuog.appspot.com",
  messagingSenderId: "1091649578259",
  appId: "1:1091649578259:web:3c1b7f21cd3c7fb28e26e6",
  measurementId: "G-4FM9MLDVE8"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db = getFirestore(app);


export const testData = async () => {
  const querySnapshot = await getDocs(collection(db, "Questions"));
querySnapshot.forEach((doc) => {

  const questionsData = doc.data();
  console.log(questionsData)
})
}

// try {
//   const docRef = addDoc(collection(db, "Users"), {
//     username: data.username,
//     password: data.password
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e)}

