import { Fragment, useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navigation from "./components/Navigation";
import { Auth } from "./components/Share/Context";
import StartScreen from "./components/StartScreen";

function App() {
  const { token } = useContext(Auth);

  const navigate = useNavigate();

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
