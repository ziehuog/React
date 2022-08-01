import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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


export const db = getFirestore(app);

// useEffect(() => {
//   const getData = async () => {
//     const questionData = await getDocs(collection(db, "Questions"));
//     setData(questionData.docs.map((doc) => doc.data()).sort((a, b) => a.id - b.id));
//   };
//   getData();
// }, []);