import React, { Fragment, useContext } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Navbar } from "../Auth/Navbar";
import { Auth } from "../Share/Context";
import { dataContext } from "../Share/Context/DataContext";
import Information from "./Information";
import Permissions from "./Permissions";
import ShowResult from "./ShowResult";
import UserAddData from "./UserAddData";

function NavUser() {
  const { dataUser, permissions } = useContext(dataContext);
  const { authUsername } = useContext(Auth);

  return (
    <Fragment>
      <Navbar />
      <div className="pt-[55px] grid grid-cols-12 gap-5">
        <div className="md:col-span-4 xl:col-span-2 border p-4 h-[100vh] ">
          {dataUser.map((user, index) => (
            <div key={index}>
              {user.data.username === JSON.parse(authUsername) ? (
                <ul >
                  {permissions.map((permission, index) => (
                    <div key={index} >
                      {user.data.permission.includes(permission.data.key) ? (
                        <li className="flex items-center border-b-2 my-[10px]">
                          <Link to={`${permission.data.path}`}>
                            {permission.data.title}
                          </Link>
                        </li>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  ))}
                </ul>
              ) : (
                <div></div>
              )}
            </div> //
          ))}
        </div>
        <div className="md:col-span-8 xl:col-span-10 p-4">
          <Routes>
            <Route path="information" element={<Information />} />
            <Route path="result" element={<ShowResult />} />
            <Route path="add_question" element={<UserAddData />} />
            <Route path="permission" element={<Permissions />} />
          </Routes>
        </div>
      </div>
    </Fragment>
  );
}

export default NavUser;
