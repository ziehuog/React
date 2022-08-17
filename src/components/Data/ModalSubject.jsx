import { deleteDoc, doc } from 'firebase/firestore';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../utils/firebase';
import { dataContext } from '../Share/DataContext';

function ModalSubject(props) {
  const { subject, arraySubjects } = useContext(dataContext);
  const navigate = useNavigate();

  const deleteSubject = async (id) => {
    let confirm = window.confirm("Are you sure?");
    if (confirm) {
      await deleteDoc(doc(db, "Subjects", props.id));
      toast.success("Delete successfully");
      props.onHide()
      window.location.reload();
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
          {subject} 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <button
          onClick={() => {
            navigate("/test/add-data")
          }
          }
          value={subject}
          className="border transition duration-300 cursor-pointer px-4 py-2 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white mx-3"
        >
          Add data
        </button>
        <button
          onClick={deleteSubject}
          value={subject}
          className="border transition duration-300 cursor-pointer px-4 py-2 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white mx-3"
        >
          Delete
        </button>
      </Modal.Body>
      <Modal.Footer>
      
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalSubject