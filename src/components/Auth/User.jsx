import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../Share/Context";
import logo from '../../asset/img/ziehuog-logo.png'

export const User = () => {
  const { authUsername, setToken } = useContext(Auth);
  let navigate = useNavigate();

  const Logout = () => {
    setToken(localStorage.removeItem("token"));
    navigate("/");

    window.location.reload();
  };

  return (
    <div className="flex justify-between px-6 h-[45px] items-center bg-white z-[100] fixed w-full">
      <div ><img className="h-[45px]" src={logo} /></div>
      <div className="border border-indigo-600 px-4 py-[3px] rounded-2xl" >Username: {authUsername}</div>
      <button className="bg-gradient-to-b from-indigo-500  to-indigo-300 px-4 py-2 rounded-2xl" onClick={Logout}>Log out</button>
    </div>
  );
};
