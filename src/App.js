import { Fragment, useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Auth } from "./components/Share/Context";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navigation from "./components/Navigation";
import StartScreen from "./components/StartScreen";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserManager from "./components/Auth/UserManager";

function App() {
  const { token } = useContext(Auth);

  const navigate = useNavigate();
  console.log('rerender')

  useEffect(() => {
    if (!token && window.location.pathname !== "/") {
      navigate("/");
    } else if (!token && window.location.pathname === "/"){
      navigate("/");
    } else{
      navigate("/home");

    }
  }, [token]);

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/*" element={<StartScreen />} />
        <Route path="/*" element={<Navigation />} />



      </Routes>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
