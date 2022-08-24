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
  const { setToken, setAuthUsername } = useContext(Auth);
  let navigate = useNavigate();

  const id = props.user?.id;

  const onSubmit = async () => {
    //validate
    if (password !== props.user?.data.password) {
      setMessage("wrong password!");
      return;
    } else {
      setMessage("");
    }
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
            onChange={(e) => setPassword(e.target.value.trim())}
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
            onChange={(e) => setNewPassword(e.target.value.trim())}
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
            onChange={(e) => setCfNewPassword(e.target.value.trim())}
          />
        </div>
        <p className="text-red-500">{messagePw}</p>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={onSubmit}
          className="border px-2 py-1 rounded-lg transition-all duration-300 
          bg-indigo-200 hover:bg-slate-200  mx-2"
        >
          Ok
        </button>
        <button
          className="border px-2 py-1 rounded-lg transition-all duration-300 
          bg-indigo-200 hover:bg-slate-200  mx-2"
          onClick={props.onHide}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalChangePassword;
