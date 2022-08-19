import { Fragment, useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navigation from "./components/Navigation";
import { Auth } from "./components/Share/Context";

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

      <Routes>
        
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Navigation to="login" replace/>} />
        <Route path="register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
