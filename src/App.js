import { Fragment, useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navigation from "./components/Navigation";
import { Auth } from "./components/Share/Context/Context";
// import { Auth } from "./components/Share/Context/Context";

function App() {
  const { token,  } = useContext(Auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);


  

  return (

    
    <Fragment >
          <div className="h-full w-full bg-gradient-to-b from-indigo-500">

      <Routes>
        
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Navigation to="login" replace/>} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Routes>
      <ToastContainer />
      </div>
    </Fragment>
  );
}

export default App;
