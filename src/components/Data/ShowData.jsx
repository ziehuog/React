import React, { useContext, useState } from "react";
import { db } from "../../utils/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { questionContext } from "../Share/Context";
import Modals from "./Modals";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { toast } from "react-toastify";

function ShowData() {
  const { state } = useContext(questionContext);
  const [modalShow, setModalShow] = useState(false);

  const [allData, setAllData] = useState([]);
  const [upData, setUpData] = useState({
    data: {
      question: "",
      correctAnswer: "",
    },
    id: "",
  });

  const FetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "Questions"));

    querySnapshot.forEach((doc) => {
      setAllData((prev) => {
        return [...prev, { data: doc.data(), id: doc.id }];
      });
    });
  };

  const deleteData = async (id) => {
    let confirm = window.confirm("Are you sure?");
    if (confirm) {
      await deleteDoc(doc(db, "Questions", id));
      toast.success("Delete successfully");
      window.location.reload();
    }
  };

  return (
    <div className="px-6">
      <Modals
        // handleChange={handleChange}
        upData={upData}
        show={modalShow}
        onHide={() => setModalShow(false)}
        deleteData={deleteData}
        // updateData = {updateData}
      />

      <button onClick={FetchData}>Fetch</button>

      <h1 className="text-center text-[35px] pt-7 font-bold pb-5 ">
        List questions
      </h1>
      <SimpleBar style={{ maxHeight: 600 }}>
        {allData.map((items) => (
          <div key={items.data.id}>
            <div className="flex justify-between">
              <div>Question {items.data.id}</div>
              <div>
                <button
                  variant="primary"
                  onClick={() => {
                    setUpData(items);
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
      </SimpleBar>
    </div>
  );
}

export default ShowData;
