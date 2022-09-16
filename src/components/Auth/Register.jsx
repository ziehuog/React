import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useReducer } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { db } from "../../utils/firebase";
import {
  HIDE_CFPASSWORD,
  HIDE_PASSWORD,
  SHOW_CFPASSWORD,
  SHOW_PASSWORD,
} from "../Share/Constants";
import { cfInitState, cfReducer, initState, reducer } from "../Share/Reducer";

const Register = () => {
  const navigate = useNavigate();

  // validate
  let schema = yup
    .object()
    .shape({
      username: yup.string().required().min(3),
      password: yup.string().required().min(6),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // read data from firebase
    let flag = true;

    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
      const aUser = doc.data();
      if (aUser.username === data.username) {
        flag = false;
      }
    });

    // validate unique and push into firebase

    if (flag) {
      addDoc(collection(db, "Users"), {
        username: data.username,
        password: data.password,
        permission: ['info', 'result'],
      });
      toast.success("success");
      navigate("/login");
    } else {
      toast.warning("This username has existed! ");
    }
  };

  //Show password

  const [state, dispatch] = useReducer(reducer, initState);
  const { eyeState, closeEyeState, passwordType } = state;

  const [cfState, cfDispatch] = useReducer(cfReducer, cfInitState);
  const { cfEyeState, cfCloseEyeState, cfPasswordType } = cfState;

  //
  return (
    <div className=" flex align-middle justify-center  w-[100vw] h-[100vh]">
      <div className="sm:m-w-[350px] border relative border-gray-400 m-auto w-[350px] h-[520px] bg-slate-200/50 rounded-3xl">
        <h1 className="text-center text-[35px] pt-7 font-bold pb-5">
          Register
        </h1>
        <form className="px-[35px]" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username</label>
          <div className="flex my-[15px]">
            <input
              className="form-input"
              type="text"
              placeholder="username"
              name="username"
              {...register("username")}
            />
          </div>
          <p className="text-[15px] text-red-600">{errors.username?.message}</p>

          {/* password */}
          <label className="" htmlFor="password">
            Password
          </label>

          <div className=" flex my-[15px] bg-gray-100 rounded-md">
            <input
              className="form-input"
              name="password"
              type={`${passwordType}`}
              placeholder="password"
              {...register("password")}
            />
            <span
              className=" mx-2 pt-2 bg-gray-100 cursor-pointer"
              onClick={() => {
                passwordType === "text"
                  ? dispatch(HIDE_PASSWORD)
                  : dispatch(SHOW_PASSWORD);
              }}
            >
              <AiOutlineEye style={{ display: `${eyeState}` }} />
              <AiOutlineEyeInvisible style={{ display: `${closeEyeState}` }} />
            </span>
          </div>
          <p className="text-[15px] text-red-600">{errors.password?.message}</p>

          {/* confirm password */}
          <label htmlFor="password">Confirm Password</label>
          <div className=" flex mt-[15px] bg-gray-100 rounded-md">
            <input
              className="form-input"
              name="confirmPassword"
              type={`${cfPasswordType}`}
              placeholder="password"
              {...register("confirmPassword")}
            />
            <span
              className=" mx-2 pt-2 bg-gray-100 cursor-pointer"
              onClick={() => {
                cfPasswordType === "text"
                  ? cfDispatch(HIDE_CFPASSWORD)
                  : cfDispatch(SHOW_CFPASSWORD);
              }}
            >
              <AiOutlineEye style={{ display: `${cfEyeState}` }} />
              <AiOutlineEyeInvisible
                style={{ display: `${cfCloseEyeState}` }}
              />
            </span>
          </div>
          <p className="text-[15px] text-red-600">
            {errors.confirmPassword?.message}
          </p>

          <div className="flex justify-center absolute bottom-[40px] left-[135px] pt-10">
            <input
              className="border transition duration-300 cursor-pointer px-3 py-1 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white"
              type="submit"
            />
          </div>
          <div className="flex justify-end absolute bottom-[18px] right-[35px]">
            <p
              className="cursor-pointer hover:text-indigo-600"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
