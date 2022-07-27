import React, { useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const refUsername = useRef();
  const refPassword = useRef();
  const [message, setMessage] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [eye, setEye] = useState("block");
  const [closeEye, setCloseEye] = useState("none");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const login = async () => {
    const inputUsername = refUsername.current.value;
    const inputPassword = refPassword.current.value;

    let data = {
      username: inputUsername,
      password: inputPassword,
    };

    if (inputPassword === "") {
      setMessage("Password need input value");
    } else if (inputPassword.split("").length < 6) {
      setMessage("Password need more than 6 letters");
    } else {
      console.log(data);
    }

    if (inputUsername === "") {
      setMessage("Username need input value");
    } else if (inputUsername.split("").length < 3) {
      setMessage(" Username need more than 6 letters");
    } else {
      console.log(data);
    }

    fetch("https://api-management.sunoil.com.vn/management/accounts/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        return response.json();
      })
      .then((result) => {
        let token = result.data.token;
        localStorage.setItem("token", JSON.stringify(token));
        console.log(result);
        navigate("/home");
      })
      .catch(async (err) => {
        console.log(err);
      });
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
    <div className=" flex align-middle justify-center w-[100vw] h-[100vh] bg-gradient-to-r from-indigo-500">
      <div className="sm:m-w-[350px] m-auto w-[350px] h-[420px] bg-slate-200 rounded-3xl border-3 border-black">
        <p className="text-center text-[35px] font-bold py-5">Form Login</p>
        <form className="px-7" onSubmit={handleSubmit}>
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

          <div className="py-4 px-[35px]">
            <label htmlFor="password">Password</label>
            <div className="border-gray-700 border-b-[2px] flex">
              <input
                type={typePassword}
                className="h-[30px] w-full bg-gray-100  outline-none bg-inherit "
                id="password"
                ref={refPassword}
              />
              <span className=" mx-2 pt-2" onClick={changeEyeState}>
                <AiOutlineEye style={{ display: `${eye}` }} />
                <AiOutlineEyeInvisible style={{ display: `${closeEye}` }} />
              </span>
            </div>
          </div>
          <p className="text-red-700">{message}</p>

          <div className="flex justify-center w-full">
            <input
              type="submit"
              className="border px-3 py-1 bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white"
              onClick={login}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
