import { yupResolver } from "@hookform/resolvers/yup";
import { collection, getDocs } from "firebase/firestore";
import React, { useReducer } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as yup from "yup";
import { auth, db } from "../../utils/firebase";
import { HIDE_PASSWORD, SHOW_PASSWORD } from "../Share/Constants";
import { initState, reducer } from "../Share/Reducer";
import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const Login = () => {

  const navigate = useNavigate();

  let schema = yup
    .object()
    .shape({
      username: yup.string().required().min(3).trim(),
      password: yup.string().required().min(6).trim(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const loginWithGithub = () => {
    signInWithPopup(auth, new GithubAuthProvider())
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const onSubmit = async (data) => {
    let isMatched = false;

    //get data from db to compare
    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
      const aUser = doc.data();
      if (
        aUser.username === data.username &&
        aUser.password === data.password
      ) {
        //save id and user name in local storage
        localStorage.setItem("id", JSON.stringify(doc.id));
        localStorage.setItem("username", JSON.stringify(doc.data().username));
        isMatched = false;
        navigate("/start");
        window.location.reload();
      } else {
        isMatched = true;
      }
    });

    isMatched
      ? toast.error("Oh no! username or password have some mistake.")
      : toast.success("Login successfully!");
  };

  //display show password state
  const [state, dispatch] = useReducer(reducer, initState);
  const { eyeState, closeEyeState, passwordType } = state;

  return (
    <div className=" flex align-middle justify-center  w-[100vw] h-[100vh] ">
      <div className="sm:m-w-[350px] border relative border-gray-400 m-auto w-[350px] h-[520px] bg-slate-200/50 rounded-3xl">
        <h1 className="text-center text-[35px] pt-7 font-bold pb-5">Login</h1>

        <form className="px-[35px]" 
        onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="username">Username</label>
          <div className="flex mt-[15px]">
            <input
              className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
              type="text"
              placeholder="username"
              name="username"
              {...register("username")}
            />
          </div>
          <p className="text-[15px] text-red-600">{errors.username?.message}</p>

          <label className="" htmlFor="password">
            Password
          </label>
          <div className=" flex mt-[15px] bg-gray-100 rounded-md">
            <input
              className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
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
              
          <div className="flex justify-center pt-4">
            <input
              className="border transition duration-300 cursor-pointer px-3 py-1 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               mt-[20px] rounded-md hover:bg-sky-700  hover:text-white"
              type="submit"
            />
          </div>
          <div className="flex justify-center pt-4">
            <button
            onClick={loginWithGoogle}
              className="border transition duration-300 cursor-pointer px-3 py-1 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               rounded-md hover:bg-sky-700  hover:text-white w-full"
            >
              Login with google
            </button>
           
          </div>
          <div className="flex justify-center pt-2">
            <button
            onClick={loginWithGithub}
              className="border transition duration-300 cursor-pointer px-3 py-1 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               rounded-md hover:bg-sky-700  hover:text-white w-full"
            >
              Login with github
            </button>
           
          </div>
          
        </form>
        

            <p
              className="cursor-pointer hover:text-indigo-600 absolute bottom-5 left-5" 
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot password?
            </p>
            <p
              className="cursor-pointer hover:text-indigo-600 absolute bottom-5 right-5"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </p>
      </div>
    </div>
  );
};

export default Login;
