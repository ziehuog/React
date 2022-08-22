import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { db } from "../../../utils/firebase";

function ModalChangePassword(props) {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [cfNewPassword, setCfNewPassword] = useState('')

    const [message, setMessage] = useState('')
    const [messagePw, setMessagePw] = useState('')

    const id = props.user?.id

    console.log(id)
    
    const onSubmit = async () => {

        if(password !== props.user?.data.password){
            setMessage('wrong password!')
            return;
        } else {
            setMessage('')
        }
        if(cfNewPassword !== newPassword ){
            setMessagePw('cf failed')
            return;
        } else{

        }
        try {
            await updateDoc(doc(db, "Users", id), {
              ...props.user.data,
              data: {
                password: newPassword, 
                ...props.user.data
              }
              
            });
            toast.success("update successfully!");
            props.onHide();
            window.location.reload();
          } catch {
            toast.error("Update failed");
          }


    }
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
        <label >Password</label>
        <div className="flex mb-[15px]">
          <input
            className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
            type="password"
            placeholder="password"
            value={password}
            onChange ={e => setPassword(e.target.value)}
            // ref={refPassword}
            
          />
        </div>
          <p className="text-red-500">{message}</p>

        <label >New Password</label>
        <div className="flex mb-[15px]">
          <input
            className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
            type="password"
            placeholder="new password"
            value={newPassword}
            onChange ={e => setNewPassword(e.target.value)}
            // onChange
          />
        </div>

        <label >Confirm new password</label>
        <div className="flex mb-[15px]">
          <input
            className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
            type="password"
            placeholder="Confirm"
            value={cfNewPassword}
            onChange ={e => setCfNewPassword(e.target.value)}

          />
        </div>
        <p className="text-red-500">{messagePw}</p>

      </Modal.Body>
      <Modal.Footer>
        <button onClick={onSubmit} className="border px-2 py-1">Ok</button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalChangePassword;
