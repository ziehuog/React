import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import SimpleBar from "simplebar-react";
import * as yup from "yup";
import { db } from "../../utils/firebase";
import { Navbar } from "../Auth/Navbar";
import { questionContext } from "../Share/Context";
import ShowData from "./ShowData";

function AddData() {
  const { state } = useContext(questionContext);
  const { data } = state;
  const [idInput, setIdInput] = useState();

  let schema = yup
    .object()
    .shape({
      id: yup.string().required(),
      question: yup.string().required(),
      correctAnswer: yup.string().required(),
      answer: yup.string().required(),
    })
    .required();

  useEffect(() => {
    console.log(data.id);
  }, [data]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({});
  let flag = true;

  const onSubmit = async (data) => {
    console.log(data);

    const querySnapshot = await getDocs(collection(db, "Questions"));
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
      addDoc(collection(db, "Questions"), {
        id: data.id,
        question: data.question,
        correctAnswer: data.correctAnswer,
        answers: data.answers,
      });
      toast.success("success");
    } else {
      toast.error("question id is duplicated!");
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "answers",
  });
  return (
    <div className=" flex align-middle justify-center w-[100vw] h-[100vh] bg-gradient-to-b from-indigo-500">
      <Navbar />

      <div className="container mx-auto mt-[100px] grid grid-cols-2 gap-6 ">
        <div
          className="sm:m-w-[350px] border relative border-gray-400 col-span-1 m-auto bg-slate-200/50 rounded-3xl
          xl:h-[850px] w-full md:h-[800px]"
        >
          <h1 className="text-center text-[35px] pt-7 font-bold pb-5">
            Add question
          </h1>
          <form className="px-[35px]" onSubmit={handleSubmit(onSubmit)}>
            <SimpleBar style={{ maxHeight: 600 }}>
              <div className="grid grid-cols-12 gap-y-3 2xl:gap-5 w-full">
                <div className="2xl:col-span-2 md:col-span-12">
                  <label htmlFor="id">Question id</label>
                  <div className=" flex w-full mt-[15px] bg-gray-100 rounded-md">
                    <input
                      className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
                      name="id"
                      type="number"
                      // value={`${idInput}`}
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
                    className="h-[35px] my-3 w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
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
                  className="uppercase bg-gray-100 rounded-md 2xl:col-span-2 md:col-span-12 h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
                  {...register("correctAnswer")}
                >
                  <option value="a">A</option>
                  <option value="b">B</option>
                  <option value="c">C</option>
                  <option value="d">D</option>
                  <option value="e">E</option>
                </select>
              </div>

              <p>ANSWERS</p>

              <div className="mt-[20px]">
                <div>
                  {fields.map((item, index) => (
                    <div key={item.id}>
                      <p>Ans: {index + 1}</p>
                      <div className="grid grid-cols-12 2xl:gap-5 md:gap-2 w-full ">
                        <div className=" 2xl:col-span-2 md:col-span-3">
                          <input
                            className="uppercase w-full h-[35px] rounded-md px-[15px] outline-none placeholder:text-gray-500"
                            {...register(`answers.${index}.id`)}
                          />
                        </div>
                        <div className=" 2xl:col-span-8 md:col-span-9">
                          <Controller
                            render={({ field }) => (
                              <input
                                className="w-full h-[35px] rounded-md px-[15px] outline-none placeholder:text-gray-500"
                                {...field}
                              />
                            )}
                            name={`answers.${index}.answer`}
                            control={control}
                          />
                        </div>
                        <div className="md:col-end-10">
                          <button
                            onClick={() => remove(index)}
                            className="border transition duration-300 cursor-pointer px-3 py-1 
                              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
                              rounded-md hover:bg-sky-700  hover:text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    className="border transition duration-300 cursor-pointer px-3 py-1 
                bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
                 rounded-md hover:bg-sky-700  hover:text-white"
                    type="button"
                    onClick={() => append()}
                  >
                    Append
                  </button>
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
          xl:h-[850px] w-full md:h-[800px]"
        >
          <ShowData />
        </div>
      </div>
    </div>
  );
}

export default AddData;
