import { Fragment, useEffect, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TestContainer from "./components/MainTest/TestContainer";
import Navigation from "./components/Navigation";
import ScoreScreen from "./components/ScoreScreen";
import { Auth } from "./components/Share/Context/Auth";
import StartScreen from "./components/StartScreen";
import SubmitScreen from "./components/SubmitScreen";
import NavUser from "./components/User/NavUser";

function App() {
  const { token } = useContext(Auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <Fragment>
      <div className="h-full w-full bg-gradient-to-b from-indigo-500">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Navigation />}>
            <Route
              path="question/:currentSubject"
              element={<TestContainer />}
            />
            <Route index path="/start" element={<StartScreen />} />
            <Route path="submit/:currentSubject" element={<SubmitScreen />} />
            <Route path="score/:currentSubject" element={<ScoreScreen />} />
            <Route path="user/*" element={<NavUser />} />
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
        <ToastContainer />
      </div>
    </Fragment>
  );
}

export default App;
