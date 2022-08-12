import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { db } from "../../utils/firebase";

import {
  doc, updateDoc
} from "firebase/firestore";
import { toast } from "react-toastify";

function Modals(props) {

  // const {dataId, question, correctAnswer} = props.updata
  const dataId = props.updata.id;
  const question = props.updata.question;
  const correctAnswer = props.updata.correctAnswer;

  // console.log(qId)


  const handleChange = (question) => (e) => {
    console.log(e.target.value);
    props.setupdata({ ...props.updata, [question]: e.target.value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const updateData = async (data) => {
    try {
      await updateDoc(doc(db, "Questions", dataId), {
        ...data,
        question: question,
        correctAnswer: correctAnswer,
      });
      toast.success("update successfully!");
      props.onHide()
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="px-[35px]">
          <label htmlFor="question">Question</label>
          <div className="flex my-[15px]">
            <input
              className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
              type="text"
              value={question}
              placeholder="question"
              name="question"
              {...register("question", {
                onChange: handleChange("question"),
              })}
            />
          </div>
          <label className="" htmlFor="correctAnswer">
            CorrectAnswer
          </label>

          <div className=" flex mt-[15px] bg-gray-100 rounded-md">
            <input
              className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
              name="correctAnswer"
              type="text"
              placeholder="correctAnswer"
              value={correctAnswer}
              {...register("correctAnswer", {
                onChange: handleChange("correctAnswer"),
              })}
            />
            <span className=" mx-2 pt-2 bg-gray-100 cursor-pointer"></span>
          </div>
          <button
            className="border mx-2 px-3 py-1 rounded-md hover:text-white 
          transition-all duration-300 bg-indigo-400 hover:bg-indigo-600 mt-7"
            onClick={handleSubmit(updateData)}
          >
            Update
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="border mx-2 px-3 py-1 rounded-md hover:text-white 
          transition-all duration-300 bg-indigo-400 hover:bg-indigo-600  "
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Modals;
