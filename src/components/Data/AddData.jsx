import React, { useContext, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { questionContext } from "../Share/Context";
// import Select from "react-select/dist/declarations/src/Select";
import Select from "react-select";

function AddData() {
  const { state } = useContext(questionContext);
  const { storeAns, data } = state;
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
    setIdInput(
      data.map((data) => {
        return Number(data.id);
      })[data.length - 1] + 1
    );
  }, [data]);

  const preloadValue = {
    id: idInput,
  };

  // }
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: preloadValue,
    resolver: yupResolver(schema),
  });
  let flag = true;

  const onSubmit = async (data) => {
    console.log(data);

    const querySnapshot = await getDocs(collection(db, "Questions"));
    querySnapshot.forEach((doc) => {
      const dataQuestions = doc.data();
      if (dataQuestions.id === data.id) {
        flag = false;
      }
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
  const options = [{value: 'A', label: 'A'}, {value: 'B', label: 'B'}, ];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "answers",
  });
  return (
    <div>
      <div className=" flex align-middle justify-center  w-[100vw] h-[100vh] bg-gradient-to-b from-indigo-500">
        <div
          className="sm:m-w-[350px] border relative border-gray-400 m-auto bg-slate-200/50 rounded-3xl
         xl:w-[1050px] xl:h-[1200px] md:w-[850px] md:h-[700px]"
        >
          <h1 className="text-center text-[35px] pt-7 font-bold pb-5">
            Add question
          </h1>
          <form className="px-[35px]" onSubmit={handleSubmit(onSubmit)}>
            {/* id */}
            <div className="grid grid-cols-12 gap-5">
              <div className=" col-span-2">
                <label className="my-5" htmlFor="id">
                  Question id
                </label>

                <div className=" flex w-full mt-[15px] bg-gray-100 rounded-md">
                  <input
                    className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
                    name="id"
                    {...register("id")}
                    required
                  />
                </div>
                <p className="text-[15px] text-red-600">
                  {errors.questionId?.message}
                </p>
              </div>
              {/* question */}
              <div className="col-span-10">
                <label htmlFor="question">Question</label>
                <div className="flex my-[15px]">
                  <input
                    className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
                    type="text"
                    placeholder="question"
                    name="question"
                    {...register("question")}
                  />
                </div>
                <p className="text-[15px] text-red-600">
                  {errors.question?.message}
                </p>
              </div>
            </div>

            {/* CorrectAnswer */}
            <label className="my-5" htmlFor="correctAnswer">
              Correct answer
            </label>

            <div className=" flex my-[15px] grid grid-cols-12 gap-5">
              <select
                name="correctAnswer"
                className="uppercase  bg-gray-100 rounded-md col-span-2 h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
                {...register("correctAnswer")}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </div>

            {/* Answers */}
            <p>ANSWERS</p>
            <div className="mt-[20px]">
              <div className="">
                {fields.map((item, index) => (
                  <div
                    className="grid grid-cols-12 gap-5 w-full my-4"
                    key={item.id}
                  >
                    <div className=" col-span-2">
                      <Controller
                        as={<Select options={options} />}
                        control={control}
                        onChange={([selected]) => {
                          // React Select return object instead of value for selection
                          return { value: selected };
                        }}
                        name={`food[${index}].name`}
                        defaultValue={{ value: "chocolate" }}
                      />
                      {/* <input
                        className="uppercase w-full h-[35px] rounded-md px-[15px] outline-none placeholder:text-gray-500"
                        {...register(`answers.${index}.id`)}
                      /> */}
                    </div>
                    <div className=" col-span-8">
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
                    <div className="">
                      <button
                        onClick={() => remove(index)}
                        className="border transition duration-300 cursor-pointer px-3 py-1 
                      bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
                       rounded-md hover:bg-sky-700  hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                    <button type="button"></button>
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

            {/* Button add */}
            <div className="flex justify-center absolute bottom-[40px] left-[135px] pt-10">
              <input
                className="border transition duration-300 cursor-pointer px-3 py-1 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddData;
