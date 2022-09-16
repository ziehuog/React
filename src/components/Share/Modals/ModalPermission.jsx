import { doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { db } from "../../../utils/firebase";
import { classByCondition } from "../classByCondition";
import { dataContext } from "../Context/DataContext";

function ModalPermission(props) {
  const { permissions } = useContext(dataContext);
  const [keys, setKeys] = useState();

  const id = props.user?.id;

  useEffect(() => {
    setKeys(props.user?.data.permission);
  }, [props.user]);

  const changeKeys = (e) => {
    const value = e.target.value;
    const newKeys = keys.includes(value)
      ? keys.filter((key) => key !== value)
      : [...keys, value];

    setKeys(newKeys);
  };

  const handleAdd = async () => {
    try {
      await updateDoc(doc(db, "Users", id), {
        ...props.user.data,
        permission: keys,
      });
      toast.success("update successfully!");
      props.onHide();
      window.location.reload();
    } catch {
      toast.error("Update failed");
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
          Change permission
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {permissions.map((permission, index) => (
          <button
            key={index}
            value={permission.data.key}
            onClick={changeKeys}
            className={
              "border-2 px-2 py-1 mx-1 my-2 lg:mx-2 rounded-lg border-indigo-400" +
              classByCondition(
                "bg-indigo-400 text-white ",
                keys?.includes(permission.data.key)
              )
            }
          >
            {permission.data.title}
          </button>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={handleAdd}
          className="border transition duration-300 cursor-pointer px-4 py-2 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white mx-3"
        >
          Add
        </button>
        <button
          onClick={props.onHide}
          className="border transition duration-300 cursor-pointer px-4 py-2 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white mx-3"
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalPermission;
