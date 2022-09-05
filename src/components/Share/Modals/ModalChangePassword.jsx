import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../utils/firebase";
import { Auth } from "../Context/Auth";

function ModalChangePassword(props) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cfNewPassword, setCfNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messagePw, setMessagePw] = useState("");
<<<<<<< HEAD

  const id = props.user?.id;

  console.log(id);

  const onSubmit = async () => {
=======
  const { setToken, setAuthUsername } = useContext(Auth);
  let navigate = useNavigate();

  const id = props.user?.id;

  const onSubmit = async () => {
    //validate
>>>>>>> 2cd68cd2dc53cf0c05fc51fee871bc0af80af7a7
    if (password !== props.user?.data.password) {
      setMessage("wrong password!");
      return;
    } else {
      setMessage("");
    }
<<<<<<< HEAD
    if (cfNewPassword !== newPassword) {
      setMessagePw("cf failed");
      return;
    } else {
    }
    try {
      await updateDoc(doc(db, "Users", id), {
        ...props.user.data,
        data: {
          password: newPassword,
          ...props.user.data,
        },
      });
      toast.success("update successfully!");
      props.onHide();
      window.location.reload();
    } catch {
      toast.error("Update failed");
=======
    if (cfNewPassword !== newPassword || newPassword === "") {
      setMessagePw("confirm password failed");
      return;
    } else {
      setMessage("");

      //update value
      try {
        await updateDoc(doc(db, "Users", id), {
          username: props.user.data.username,
          permission: props.user.data.permission,
          password: newPassword,
        });
        toast.success("update successfully!");
        props.onHide();
        setToken(localStorage.removeItem("id"));
        setAuthUsername(localStorage.removeItem("username"));
        navigate("/login");
      } catch {
        toast.error("Update failed");
      }
>>>>>>> 2cd68cd2dc53cf0c05fc51fee871bc0af80af7a7
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Password</label>
        <div className="flex mb-[15px]">
          <input
            className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] 
            outline-none placeholder:text-gray-500"
            type="password"
            placeholder="password"
            value={password}
<<<<<<< HEAD
            onChange={(e) => setPassword(e.target.value)}
            // ref={refPassword}
=======
            onChange={(e) => setPassword(e.target.value.trim())}
>>>>>>> 2cd68cd2dc53cf0c05fc51fee871bc0af80af7a7
          />
        </div>
        <p className="text-red-500">{message}</p>

        <label>New Password</label>
        <div className="flex mb-[15px]">
          <input
            className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] 
            outline-none placeholder:text-gray-500"
            type="password"
            placeholder="new password"
            value={newPassword}
<<<<<<< HEAD
            onChange={(e) => setNewPassword(e.target.value)}
            // onChange
=======
            onChange={(e) => setNewPassword(e.target.value.trim())}
>>>>>>> 2cd68cd2dc53cf0c05fc51fee871bc0af80af7a7
          />
        </div>

        <label>Confirm new password</label>
        <div className="flex mb-[15px]">
          <input
            className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] 
            outline-none placeholder:text-gray-500"
            type="password"
            placeholder="Confirm"
            value={cfNewPassword}
<<<<<<< HEAD
            onChange={(e) => setCfNewPassword(e.target.value)}
=======
            onChange={(e) => setCfNewPassword(e.target.value.trim())}
>>>>>>> 2cd68cd2dc53cf0c05fc51fee871bc0af80af7a7
          />
        </div>
        <p className="text-red-500">{messagePw}</p>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={onSubmit}
<<<<<<< HEAD
          className="border transition duration-300 cursor-pointer px-4 py-2 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white mx-3"
=======
          className="border px-2 py-1 rounded-lg transition-all duration-300 
          bg-indigo-200 hover:bg-slate-200  mx-2"
>>>>>>> 2cd68cd2dc53cf0c05fc51fee871bc0af80af7a7
        >
          Ok
        </button>
        <button
<<<<<<< HEAD
          onClick={props.onHide}
          className="border transition duration-300 cursor-pointer px-4 py-2 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white mx-3"
=======
          className="border px-2 py-1 rounded-lg transition-all duration-300 
          bg-indigo-200 hover:bg-slate-200  mx-2"
          onClick={props.onHide}
>>>>>>> 2cd68cd2dc53cf0c05fc51fee871bc0af80af7a7
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalChangePassword;
