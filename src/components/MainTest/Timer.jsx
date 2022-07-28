// import moment from "moment";
import React, { useContext } from "react";
import { Context } from "../Share/Context";

require("moment-duration-format");

const Timer = () => {
  let moment = require("moment");

  const { remaining, timeOver } = useContext(Context);

  return (
    <div className=" pt-6">
      Time remaining:
      <span className={`${timeOver}`}>
        {" "}
        {moment.duration(remaining).format("hh:mm:ss")}
      </span>
    </div>
  );
};

export default Timer;
