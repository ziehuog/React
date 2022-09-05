import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { DataProvider } from "./components/Share/Context/DataContext";
import { AuthProvider } from "./components/Share/Context/Auth";
// import QuestionProvider from "./components/Share/Context/QuestionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <DataProvider>
        {/* <QuestionProvider> */}
          <App />
        {/* </QuestionProvider> */}
      </DataProvider>
    </AuthProvider>
  </BrowserRouter>

  // </React.StrictMode>
);

reportWebVitals();
