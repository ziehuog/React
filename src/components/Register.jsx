import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {

    const navigateToLogin = () => {
        navigate("/");
    
      }
  const refUsername = useRef();
  const refPassword = useRef();
  const refConfirmPassword = useRef();

  const [message, setMessage] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [eye, setEye] = useState("block");
  const [closeEye, setCloseEye] = useState("none");

  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");
  const [cfEye, setCfEye] = useState("block");
  const [cfCloseEye, setCfCloseEye] = useState("none");
  const navigate = useNavigate();


  const store = []

  const handleSubmit = (e) => {
    e.preventDefault();
  };




  const register = async () => {

    const inputUsername = refUsername.current.value;
    const inputPassword = refPassword.current.value;
    const inputConfirmPassword = refConfirmPassword.current.value;
  
    let data = {
      username: inputUsername,
      password: inputPassword,
    };
  

    if (inputPassword === "") {
      setMessage("Password need input value");
    } else if (inputPassword.split("").length < 6) {
      setMessage("Password need more than 6 letters");
    } else {
      // console.log(data);
    }

    if (inputUsername === "") {
      setMessage("Username need input value");
    } else if (inputUsername.split("").length < 3) {
      setMessage(" Username need more than 6 letters");
    } else {
      // console.log(data);
    }

    if(inputConfirmPassword !== inputPassword){
        setMessage(" Fail to confirm password");
    }

    if(inputPassword === inputConfirmPassword){
      store.push(data)
      console.log(store)
    }


  };

  //show password

  const changeEyeState = () => {
    if (eye === "none") {
      setEye("block");
      setCloseEye("none");
      setTypePassword("password");
    }
    if (eye === "block") {
      setEye("none");
      setCloseEye("block");
      setTypePassword("text");
    }
  };

  const changeCfEyeState = () => {
    if (cfEye === "none") {
      setCfEye("block");
      setCfCloseEye("none");
      setTypeConfirmPassword("password");
    }
    if (cfEye === "block") {
      setCfEye("none");
      setCfCloseEye("block");
      setTypeConfirmPassword("text");
    }
  };
  return (
    <div className=" flex align-middle justify-center w-[100vw] h-[100vh] bg-gradient-to-b from-indigo-500">
      <div className="sm:m-w-[350px] m-auto w-[350px] h-[520px] bg-slate-200 rounded-3xl opacity-90">
        <p className="text-center text-[35px] font-bold py-5"> Register Form</p>
        <form className="px-7" onSubmit={handleSubmit}>

{/* username */}
          <div className="py-4 px-[35px]">
            <label htmlFor="username">Username</label>
            <div className="border-gray-700 border-b-[2px]">
              <input
                className="h-[30px] w-full bg-gray-100 outline-none bg-inherit"
                id="username"
                ref={refUsername}
              />
            </div>
          </div>
{/* password */}
          <div className="py-4 px-[35px]">
            <label htmlFor="password">Password</label>
            <div className="border-gray-700 border-b-[2px] flex">
              <input
                type={typePassword}
                className="h-[30px] w-full bg-gray-100  outline-none bg-inherit "
                id="password"
                ref={refPassword}
              />
              <span className=" mx-2 pt-2 " onClick={changeEyeState}>
                <AiOutlineEye style={{ display: `${eye}` }} />
                <AiOutlineEyeInvisible style={{ display: `${closeEye}` }} />
              </span>
            </div>
          </div>
{/* confirm password */}
          <div className="py-4 px-[35px]">
            <label htmlFor="refConfirmPassword">Confirm Password</label>
            <div className="border-gray-700 border-b-[2px] focus-within:border-indigo-500 flex">
              <input
                type={typeConfirmPassword}
                className="h-[30px] w-full bg-gray-100  outline-none bg-inherit "
                id="password"
                ref={refConfirmPassword}
              />
              <span className=" mx-2 pt-2 " onClick={changeCfEyeState}>
                <AiOutlineEye style={{ display: `${cfEye}` }} />
                <AiOutlineEyeInvisible style={{ display: `${cfCloseEye}` }} />
              </span>
            </div>
          </div>
          <p className="text-red-700">{message}</p>

          <div className="flex justify-center w-full">
            <input
              type="submit"
              className="border transition duration-300 cursor-pointer px-3 py-1 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white"
              onClick={register}
            />
          </div>
          <p className="text-right cursor-pointer hover:text-indigo-500 box-border" onClick={navigateToLogin}>
            Login
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
