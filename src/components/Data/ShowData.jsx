import React, { useContext, useState } from "react";
import { db } from "../../utils/firebase";
import { addDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { questionContext } from "../Share/Context";
import Modals from "./Modals";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ShowData() {
  const { state, setModalShow, modalShow } = useContext(questionContext);
  const { data } = state;
  const [allData, setAllData] = useState([]);
  const [upData, setUpData] = useState({});
  const [value, setValue] = useState({
    question: upData.question,
  });

  const handleChange = (question) => (e) => {
    e.preventDefault();
    setValue({ ...value, [question]: e.target.value });
    console.log(question);
  };

  const FetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "Questions"));

    querySnapshot.forEach((doc) => {
      setAllData((prev) => {
        return [...prev, { data: doc.data(), id: doc.id }];
      });
    });
  };
  // const {question} = value
  console.log(value);
  // getData();
  // }

  // const updateData = () => {
  //   setUpData(doc)
  //   setModalShow(true);
  // };

  const deleteData = async (id) => {
    console.log(id);
    await deleteDoc(collection(db, "Questions", id));
  };

  return (
    <div className="px-6">
      <Modals
        handleChange={handleChange}
        value={value}
        upData={upData}
        show={modalShow}
        onHide={() => setModalShow(false)}
        deleteData={deleteData}
      />

      <button onClick={FetchData}>Fetch</button>

      <h1 className="text-center text-[35px] pt-7 font-bold pb-5 ">
        List questions
      </h1>
      <p>{allData.id}</p>

      {allData.map((items) => (
        <div key={items.data.id}>
          <div className="flex justify-between">
            <div>Question {items.data.id}</div>
            <div>
              <button
                variant="primary"
                onClick={() => {
                  setUpData(items.data.question);
                  setModalShow(true);
                }}
                className="border mx-2 px-3 py-1 rounded-md hover:text-white 
              transition-all duration-300 hover:bg-indigo-400 bg-zinc-100/60"
              >
                Update
              </button>
              <button
                onClick={() => {
                  deleteData(items.id);
                }}
                className="border mx-2 px-3 py-1 rounded-md hover:text-white 
              transition-all duration-300 hover:bg-indigo-400 bg-zinc-100/60"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="border border-black my-3">
            <p>Question: </p>
            <p>{items.data.question} </p>
            <p>Answers: </p>
            {items.data.answers.map((ans) => (
              <div key={ans.id}>
                <p>
                  {ans.id}: {ans.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowData;
