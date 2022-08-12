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
  const answers = props.updata.answers;
  let answerList = []
  // let answerList = []

  answers.map((ans, idx) => {
    answerList.push(ans.answer)
    
    console.log(ans.answer)
    console.log(ans.id)

  })

  console.log(props.updata)




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
              {answers.map((ans, index) => (
                <div className="flex my-[15px]" key={index}>
                <input
                  className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
                  type="text"
                  value={answerList[index]}
                  placeholder="answer"
                  name={`answer-${index}`}
                  {...register(`answer-${index}`, {
                    onChange: props.handleChange(`answer-${index}`),
                  })}
                />
              </div>
              ))}

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
