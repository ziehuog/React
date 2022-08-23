import { addDoc, collection } from "firebase/firestore";
import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { read, utils } from "xlsx";
import { db } from "../../../utils/firebase";
import { dataContext } from "../Context/DataContext";

function ModalAddFromFile(props) {
  const { subject } = useContext(dataContext);
  const [jsonData, setJsonData] = useState();

  //get data from file
  const handleFile = async (e) => {
    const file = e.target.files[0];

    const data = await file.arrayBuffer();
    const workbook = read(data);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    setJsonData(utils.sheet_to_json(worksheet));
  };

  //add data into firestore
  const addData = () => {

    try {
      jsonData?.map((data) => {
        addDoc(collection(db, `${subject}`), {
          id: data.id,
          question: data.question,
          correctAnswer: data.correctAnswer,
          answers: [
            { answer: data.answer_0, id: data.id_0 },
            { answer: data.answer_1, id: data.id_1 },
            { answer: data.answer_2, id: data.id_2 },
            { answer: data.answer_3, id: data.id_3 },
          ],
        });
      });
      toast.success("success");
      props.onHide();
    } catch {
      toast.error("question id is duplicated!");
    }
  };

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new subject
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" onChange={(e) => handleFile(e)} />

          {jsonData?.map((data, index) => (
            <div key={index}>
              <div className="border border-black my-3">
                <p>Question: </p>
                <p className="px-4">{data.question} </p>
                <p>Answers: </p>
                <div className="px-4">
                  <p>
                    {data.id_0}: {data.answer_0}
                  </p>
                  <p>
                    {data.id_1}: {data.answer_1}
                  </p>
                  <p>
                    {data.id_2}: {data.answer_2}
                  </p>
                  <p>
                    {data.id_3}: {data.answer_3}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={addData}
            className="border transition duration-300 cursor-pointer px-4 py-2 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white mx-3"
          >
            Add
          </button>
          <button
            onClick={props.onHide}
            className="border transition duration-300 cursor-pointer px-4 py-2 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white mx-3"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalAddFromFile;
