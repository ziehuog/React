import moment from "moment";
import React, { useContext } from "react";
import { Context } from "./Context";

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
