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

  const dataId = props.updata.id;
  const question = props.updata.question;
  const correctAnswer = props.updata.correctAnswer;
  const answer_0 = props.updata.answer_0;
  const answer_1 = props.updata.answer_1;
  const answer_2 = props.updata.answer_2;
  const answer_3 = props.updata.answer_3;
  const id_0 = props.updata.id_0;
  const id_1 = props.updata.id_1;
  const id_2 = props.updata.id_2;
  const id_3 = props.updata.id_3;




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
        answers: [
          {answer: answer_0, id: id_0},
          {answer: answer_1, id: id_1},
          {answer : answer_2 , id: id_2 } ,
          {answer: answer_3, id: id_3},
        ],

      });
      toast.success("update successfully!");
      props.onHide()
      window.location.reload()

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

          {/* display input question */}
          <label htmlFor="question">Question</label>
          <div className="flex my-[15px]">
            <input
              className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
              type="text"
              value={question}
              placeholder="question"
              name="question"
              {...register("question", {
                onChange: props.handleChange("question"),
              })}
            />
          </div>

          {/* display correct answer */}
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
                onChange: props.handleChange("correctAnswer"),
              })}
            />
          </div>
          <p>Answers</p>

          <div className=" flex mt-[15px] bg-gray-100 rounded-md">
          <input
              className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
              name="id_0"
              type="text"
              placeholder="answer"
              value={id_0}
              {...register("id_0", {
                onChange: props.handleChange("id_0"),
              })}
            />
            <input
              className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
              name="answer_0"
              type="text"
              placeholder="answer"
              value={answer_0}
              {...register("answer_0", {
                onChange: props.handleChange("answer_0"),
              })}
            />
          </div>
          <div className=" flex mt-[15px] bg-gray-100 rounded-md">
          <input
              className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
              name="id_1"
              type="text"
              placeholder="answer"
              value={id_1}
              {...register("id_1", {
                onChange: props.handleChange("id_1"),
              })}
            />
            <input
              className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
              name="answer_1"
              type="text"
              placeholder="answer"
              value={answer_1}
              {...register("answer_1", {
                onChange: props.handleChange("answer_1"),
              })}
            />
          </div>
          <div className=" flex mt-[15px] bg-gray-100 rounded-md">
          <input
              className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
              name="id_2"
              type="text"
              placeholder="answer"
              value={id_2}
              {...register("id_2", {
                onChange: props.handleChange("id_2"),
              })}
            />
            <input
              className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
              name="answer_2"
              type="text"
              placeholder="answer"
              value={answer_2}
              {...register("answer_2", {
                onChange: props.handleChange("answer_2"),
              })}
            />
          </div>

          <div className=" flex mt-[15px] bg-gray-100 rounded-md">
          <input
              className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
              name="id_3"
              type="text"
              placeholder="answer"
              value={id_3}
              {...register("id_3", {
                onChange: props.handleChange("id_3"),
              })}
            />
            <input
              className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
              name="answer_3"
              type="text"
              placeholder="answer"
              value={answer_3}
              {...register("answer_3", {
                onChange: props.handleChange("answer_3"),
              })}
            />
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
