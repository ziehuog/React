import React, { Fragment } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Navbar } from "../Auth/Navbar";
import Information from "./Information";
import ShowResult from "./ShowResult";
import { FaHouseUser, FaUsers } from "react-icons/fa";
import { BsStickiesFill } from "react-icons/bs";
import { AiFillFileAdd } from "react-icons/ai";
import UserAddData from "./UserAddData";


function NavUser() {

  return (
    <Fragment>
      <Navbar />

      <div className="pt-[55px] grid grid-cols-12 gap-5">
        <ul className="md:col-span-4 xl:col-span-2 border p-4 h-[100vh] ">
          <li className="flex items-center my-[10px]">
          <FaHouseUser className="mr-[20px]"/>
            <Link to="information">  Information</Link>
          </li>
          <li className="flex items-center my-[10px]">
            <BsStickiesFill className="mr-[20px]"/>
            <Link to="result"> Result</Link>
          </li>
          <li className="flex items-center my-[10px]">
            <AiFillFileAdd className="mr-[20px]"/>
            <Link to="add-question"> Add Question</Link>
          </li>
          <li className="flex items-center my-[10px]">
            <FaUsers className="mr-[20px]"/>
            <Link to="add-question"> Decentralization</Link>
          </li>
        </ul>
        <div className="md:col-span-8 xl:col-span-10 p-4">
          <Routes>
            <Route path="information" element={<Information />} />
            <Route
              path="result"
              element={<ShowResult />}
            />
            <Route path="add-question" element={<UserAddData />} />
          </Routes>
        </div>
      </div>
    </Fragment>
  );
}

export default NavUser;
