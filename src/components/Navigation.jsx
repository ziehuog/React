import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import TestContainer from "./TestContainer";
import StartScreen from "./StartScreen";
import SubmitScreen from "./SubmitScreen";
import ScoreScreen from "./ScoreScreen";

const Navigation = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/question" element={<TestContainer />} />
        <Route path="/submit" element={<SubmitScreen />} />
        <Route path="/score" element={<ScoreScreen />} />
      </Routes>
    </Fragment>
  );
};

export default Navigation;
