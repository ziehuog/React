import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SimpleBar from "simplebar-react";
import { db } from "../../utils/firebase";
import { dataContext } from "../Share/Context/DataContext";
import ModalAddFromFile from "../Share/Modals/ModalAddFromFile";
import ShowData from "./ShowData";

function AddData() {
  const { subject } = useContext(dataContext);
  const [displayFetch, setDisplayFetch] = useState("block");
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);


  const {chosenSubject} = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let flag = true;

  const onSubmit = async (data) => {
    console.log(data);
    const querySnapshot = await getDocs(collection(db, `${chosenSubject}`));
    querySnapshot.forEach((doc) => {
      const dataQuestions = doc.data();
      if (dataQuestions.id === data.id) {
        flag = false;
      }
      dataQuestions.answers.map((items) => {
        console.log(items);
      });
    });

    if (flag) {
      addDoc(collection(db, `${chosenSubject}`), {
        id: data.id,
        question: data.question,
        correctAnswer: data.correctAnswer,
        answers: [
          { answer: data.answer_0, id: data.answerId_0 },
          { answer: data.answer_1, id: data.answerId_1 },
          { answer: data.answer_2, id: data.answerId_2 },
          { answer: data.answer_3, id: data.answerId_3 },
        ],
      });
      toast.success("success");
      setDisplayFetch("block");
    } else {
      toast.error("question id is duplicated!");
    }
  };

  return (
    <div className=" flex align-middle justify-center w-[100vw] h-[100vh] 
    bg-gradient-to-b from-indigo-500">
      <div className="w-full container mt-[100px]">
        <div
          className="bg-gradient-to-r relative from-indigo-400 
          via-indigo-200 to-indigo-400 mb-3"
        >
          <button
            onClick={() => navigate("/user/add-question")}
            className="absolute hover:text-white hover:underline top-2 left-3"
          >
            Back
          </button>
          <h1 className="text-[35px] text-center font-bold">{chosenSubject}</h1>
        </div>
        <div className=" grid grid-cols-2 gap-6 ">
          <div
            className="sm:m-w-[350px] border relative border-gray-400 
            col-span-1 m-auto bg-slate-200/50 rounded-3xl w-full md:h-[800px]"
          >
            <h1 className="text-center text-[25px] pt-7 font-bold pb-5 ">
              Add question
            </h1>

            <form className="px-[35px]" onSubmit={handleSubmit(onSubmit)}>
              <button
                onClick={() => setModalShow(true)}
                className="border px-2 py-1 rounded-lg hover:text-white 
              transition-all duration-300 hover:bg-indigo-400 bg-zinc-100/60"
              >
                Add from file
              </button>

              <SimpleBar style={{ maxHeight: 600 }}>
                <div className="grid grid-cols-12 gap-y-3 2xl:gap-5 w-full">
                  <div className="2xl:col-span-2 md:col-span-12">
                    <label htmlFor="id">Question id</label>
                    <div className=" flex w-full mt-[15px] bg-gray-100 rounded-md">
                      <input
                        className="h-[35px] w-full bg-gray-100 rounded-md 
                        px-[15px] outline-none placeholder:text-gray-500"
                        name="id"
                        type="number"
                        required
                        {...register("id")}
                      />
                    </div>
                    <p className="text-[15px] text-red-600">
                      {errors.id?.message}
                    </p>
                  </div>
                  <div className="2xl:col-span-10 md:col-span-12 ">
                    <label htmlFor="question">Question</label>

                    <input
                      className="h-[35px] my-3 w-full bg-gray-100 rounded-md 
                      px-[15px] outline-none placeholder:text-gray-500"
                      type="text"
                      placeholder="question"
                      name="question"
                      {...register("question")}
                    />
                    <p className="text-[15px] text-red-600">
                      {errors.question?.message}
                    </p>
                  </div>
                </div>

                <label htmlFor="correctAnswer">Correct answer</label>
                <div className=" flex my-[15px] grid grid-cols-12 2xl:gap-5">
                  <select
                    name="correctAnswer"
                    className="uppercase bg-gray-100 rounded-md 2xl:col-span-2 
                    md:col-span-12 h-[35px] w-full bg-gray-100 rounded-md px-[15px] 
                    outline-none placeholder:text-gray-500"
                    {...register("correctAnswer")}
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>

                <p>ANSWERS</p>

                <div className="mt-[20px]">
                  <div className="grid grid-cols-12 gap-y-3 2xl:gap-5 md:gap-2 w-full">
                    <div className="2xl:col-span-2 md:col-span-3">
                      <input
                        className="h-[35px] my-3 w-full bg-gray-100 rounded-md px-[15px] 
                        outline-none placeholder:text-gray-500"
                        type="text"
                        name="question"
                        value="A"
                        {...register("answerId_0")}
                      />
                    </div>
                    <div className="2xl:col-span-10 md:col-span-9">
                      <input
                        className="h-[35px] my-3 w-full bg-gray-100 rounded-md 
                      px-[15px] outline-none placeholder:text-gray-500"
                        type="text"
                        placeholder="answer"
                        name="question"
                        required
                        {...register("answer_0")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-y-3 2xl:gap-5 md:gap-2 w-full">
                    <div className="2xl:col-span-2 md:col-span-3">
                      <input
                        className="form-input"
                        type="text"
                        name="question"
                        value="B"
                        {...register("answerId_1")}
                      />
                    </div>
                    <div className="2xl:col-span-10 md:col-span-9">
                      <input
                        className="form-input"
                        type="text"
                        placeholder="answer"
                        required
                        name="question"
                        {...register("answer_1")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-y-3 2xl:gap-5 md:gap-2 w-full">
                    <div className="2xl:col-span-2 md:col-span-3">
                      <input
                        className="form-input"
                        type="text"
                        name="question"
                        value="C"
                        {...register("answerId_2")}
                      />
                    </div>
                    <div className="2xl:col-span-10 md:col-span-9">
                      <input
                        className="form-input"
                        type="text"
                        placeholder="answer"
                        required
                        name="question"
                        {...register("answer_2")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-y-3 2xl:gap-5 md:gap-2 w-full">
                    <div className="2xl:col-span-2 md:col-span-3">
                      <input
                        className="form-input"
                        type="text"
                        name="answerId_3"
                        value="D"
                        {...register("answerId_3")}
                      />
                    </div>
                    <div className="2xl:col-span-10 md:col-span-9">
                      <input
                        className="form-input"
                        type="text"
                        placeholder="answer"
                        name="answer_3"
                        {...register("answer_3")}
                        required
                      />
                    </div>
                  </div>
                </div>
              </SimpleBar>
              <div className="flex justify-center absolute bottom-[5px] left-[135px] pt-10">
                <input
                  className="border transition duration-300 cursor-pointer px-3 py-1 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white"
                  type="submit"
                />
              </div>
            </form>
          </div>

          <div
            className="sm:m-w-[350px] col-span-1 border  border-gray-400 m-auto bg-slate-200/50 rounded-3xl
          w-full md:h-[800px]"
          >
            <ShowData
              setDisplayFetch={setDisplayFetch}
              displayFetch={displayFetch}
            />
            <ModalAddFromFile
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddData;
