import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { classByCondition } from "../Share/classByCondition";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import ModalPermission from "../Share/Modals/ModalPermission";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { toast } from "react-toastify";
import { dataContext } from "../Share/Context/DataContext";
import { Auth } from "../Share/Context/Auth";

function Permissions() {
  const { dataUser, permissions} = useContext(dataContext);
  const [modalShow, setModalShow] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const deleteUser = async (id) => {
    let confirm = window.confirm("Are you sure?");
    if (confirm) {
      await deleteDoc(doc(db, "Users", id));
      toast.success("Delete successfully");
      window.location.reload();
    }
  };

  return (
    <div>
      <p>List User</p>
      {dataUser.map((user, index) => (
        <div key={index}>
          <div className="grid grid-cols-5 border-b-[1px] py-2">
            <div className="col-span-1 px-2 flex items-center">
              <div>{user.data.username}</div>
            </div>
            <div className="col-span-3 md:col-span-4  flex">
              {permissions.map((permission, index) => (
                <div
                  key={index}
                  className={
                    "border-2 px-2 py-1 mx-1 my-2 lg:mx-2 rounded-lg cursor-auto border-indigo-400" +
                    classByCondition(
                      "bg-indigo-400 text-white ",
                      user.data.permission.includes(permission.data.key)
                    )
                  }
                >
                  {permission.data.title}
                </div>
              ))}
            </div>
            <div className="col-span-1 md:col-end-6 flex">
              {user.data.username !== 'admin'? (
                <div className="flex">
                  <button
                    onClick={() => {
                      setCurrentUser(user);
                      setModalShow(true);
                    }}
                    className="border transition duration-300 cursor-pointer flex justify-center
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
              items-center py-1 px-2 rounded-md hover:bg-sky-700  hover:text-white mx-2"
                  >
                    <BsFillPencilFill className="text-white" />
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="border transition duration-300 cursor-pointer flex justify-center
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
              items-center py-1 px-2 rounded-md hover:bg-sky-700  hover:text-white mx-2"
                  >
                    <FaTimes className="text-white" />
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      ))}
      <ModalPermission
        user={currentUser}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default Permissions;
