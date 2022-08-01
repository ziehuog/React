import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { db } from "../../utils/firebase";
import { Auth } from "../Share/Context";

const Login = () => {
  const refUsername = useRef();
  const refPassword = useRef();
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [eye, setEye] = useState("block");
  const [closeEye, setCloseEye] = useState("none");
  const navigate = useNavigate();

  const { setBtnStart } = useContext(Auth);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const login = async () => {
    setNotification("");
    setMessage("");

    const inputUsername = refUsername.current.value;
    const inputPassword = refPassword.current.value;

    let data = {
      username: inputUsername,
      password: inputPassword,
    };

    if (inputUsername === "") {
      setMessage("Username need input value");
      refUsername.current.focus();
      refUsername.current.value = "";
      return;
    }
    if (inputUsername.split("").length < 3) {
      setMessage(" Username need more than 6 letters");
      refUsername.current.focus();
      refUsername.current.value = "";
      return;
    }

    if (inputPassword === "") {
      setMessage("Password need input value");
      refPassword.current.focus();
      setNotification("");
      refPassword.current.value = "";
      return;
    }
    if (inputPassword.split("").length < 6) {
      setMessage("Password need more than 6 letters");
      refPassword.current.focus();
      refPassword.current.value = "";
      setNotification("");
      return;
    }

    //Get and compare data
    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      const aUser = doc.data();
      if (
        aUser.username === inputUsername &&
        aUser.password === inputPassword
      ) {
        localStorage.setItem("id", JSON.stringify(doc.id));
        localStorage.setItem("username", JSON.stringify(doc.data().username));
        setBtnStart(false);
      window.location.reload();

        navigate("/home");
        return;
      } else {
        setNotification("Oh no! username or password have some mistake.");
        refUsername.current.focus();
      }
    });
  };
  //navigate

  const navigateToSignup = () => {
    navigate("/register");
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



  return (
    <div className=" flex align-middle justify-center w-[100vw] h-[100vh] bg-gradient-to-b from-indigo-500">
      <div className="sm:m-w-[350px] m-auto w-[350px] h-[420px] bg-gray-200/30 hover:bg-gray-200/50 transition duration-200 border border-indigo-400 opacity- rounded-3xl border-3 border-black">
        <p className="text-center text-[35px] font-bold py-5">Form Login</p>
        <form className="px-7" onSubmit={handleSubmit}>
          <p className="text-red-700 text-center">{notification}</p>
          <div className="py-4 px-[35px]">
            <label htmlFor="username">Username</label>
            <div className="border-gray-700 border-b-[2px] focus-within:border-indigo-500 transition duration-300 ">
              <input
                className="h-[30px] w-full bg-gray-100 outline-none bg-inherit"
                id="username"
                ref={refUsername}
              />
            </div>
          </div>

          <div className="py-4 px-[35px]">
            <label htmlFor="password">Password</label>
            <div className="border-gray-700 border-b-[2px]  focus-within:border-indigo-500 transition duration-300 flex">
              <input
                type={typePassword}
                className="h-[30px] w-full outline-none bg-inherit "
                id="password"
                ref={refPassword}
              />
              <span className=" mx-2 pt-2 " onClick={changeEyeState}>
                <AiOutlineEye style={{ display: `${eye}` }} />
                <AiOutlineEyeInvisible style={{ display: `${closeEye}` }} />
              </span>
            </div>
          </div>
          <p className="text-red-700">{message}</p>

          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="border transition duration-300 cursor-pointer px-3 py-1 bg-gradient-to-b from-indigo-500  to-indigo-300
             my-[20px] rounded-md hover:bg-sky-700  hover:text-white"
              onClick={login}
            >
              Login
            </button>
          </div>
          <p
            className="text-right cursor-pointer hover:text-indigo-500 box-content"
            onClick={navigateToSignup}
          >
            create account
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
