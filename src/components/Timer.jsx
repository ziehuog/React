import React, { useContext, useEffect, useState } from "react";
import Moment from "react-moment";
import moment from "moment";
import { Context } from "./Context";
import { useNavigate } from "react-router-dom";

const Timer = () => {
  const { remaining, timeOver } = useContext(Context);

  return (
    <div >
      Time remaining:
      <span className={`${timeOver}`}> {moment.duration(remaining).format("hh:mm:ss")}</span>
    </div>
  );
};

export default Timer;
