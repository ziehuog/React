import React, { Fragment, useContext } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import AddData from "../Data/AddData";
import { Auth } from "../Share/Context/Auth";
import { dataContext } from "../Share/Context/DataContext";
import Information from "./Information";
import Permissions from "./Permissions";
import ShowResult from "./ShowResult";
import UserAddData from "./UserAddData";

function NavUser() {
  const { dataUser, permissions } = useContext(dataContext);
  const { authUsername } = useContext(Auth);

  const navLinkStyle = ({ isActive }) => {
    return { background: isActive ? "#B6C3FD" : "",
    color: isActive ? "#fff" : "#000",
  };
  };

  return (
    <Fragment>
      <div className="pt-[55px] mt-0 grid grid-cols-12 gap-5 bg-white">
        <div className="md:col-span-4 xl:col-span-2 border py-4 h-[100vh] ">
          {dataUser.map((user, index) => (
            <div key={index}>
              {user.data.username === JSON.parse(authUsername) ? (
                <ul>
                  {permissions.map((permission, index) => (
                    <div key={index}>
                      {user.data.permission.includes(permission.data.key) ? (
                        <li className="flex items-center border-b-2 h-[35px] ">
                          <NavLink
                          className='w-full h-full transition-all duration-200 px-4'
                            style={navLinkStyle}
                            to={`${permission.data.path}`}
                          >
                            {permission.data.title}
                          </NavLink>
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
            <Route path="add-data/:chosenSubject" element={<AddData />} />
          </Routes>
        </div>
      </div>
    </Fragment>
  );
}

export default NavUser;
