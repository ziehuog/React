import { addDoc, collection, getDocs } from "firebase/firestore";
import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { db } from "../../utils/firebase";
import { dataContext } from "../Share/DataContext";

function ModalAddSubject(props) {
  const [subjectInput, setSubjextInput] = useState("");

  //function to add data
  const handleAdd = async () => {
    let flag = false;

    const querySnapshot = await getDocs(collection(db, "Subjects"));
    querySnapshot.forEach((doc) => {
      const subjectDb = doc.data();
      if (subjectDb.subject === subjectInput) {
        flag = true;
      } 
    });
    if (!flag) {
      addDoc(collection(db, "Subjects"), {
        subject: subjectInput,
      });
      toast.success("success");
      props.onHide();
    } else {
      toast.error("This subject has existed!");
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
          Add new subject
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] 2xl:col-span-10 
              md:col-span-9 outline-none placeholder:text-gray-500"
          // name="answer_2"
          type="text"
          value={subjectInput}
          placeholder="type new subject here"
          onChange={(e) => setSubjextInput(e.target.value)}
        />
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
export default ModalAddSubject;
