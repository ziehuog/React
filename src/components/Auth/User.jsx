import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../Share/Context";
import logo from "../../asset/img/ziehuog-logo.png";


export const User = () => {
  const { authUsername, setToken, setAuthUsername } = useContext(Auth);
  let navigate = useNavigate();

  const Logout = () => {
    let result = window.confirm(
      "Do you want to log out? your test will stop and it will not save"
    );

    if (result) {
      setToken(localStorage.removeItem("id"));
      setAuthUsername(localStorage.removeItem("username"));
      // localStorage.removeItem("id");

      navigate("/");

      window.location.reload();
    }
  };

  const navigateToHome = () =>{
    navigate('/home')
  }

  const navigateToUser = () =>{
    navigate('/user')
  }
  return (
    <div className="flex justify-between px-6 h-[45px] items-center bg-white z-[100] fixed w-full">
      <div onClick={navigateToHome}>
        <img className="h-[45px] cursor-pointer" src={logo} />
      </div>
      <div  className="border border-indigo-600 px-4 py-[3px] rounded-2xl cursor-pointer" onClick={navigateToUser}>
        Username: {JSON.parse(authUsername)}
      </div>
      <button
        className="bg-gradient-to-b from-indigo-500  to-indigo-300 px-4 py-2 rounded-2xl"
        onClick={Logout}
      >
        Log out
      </button>
    </div>
  );
};
