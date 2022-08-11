import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { db } from "../../utils/firebase";

import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";


function Modals({ upData, show, onHide, deleteData }) {
    const [value, setValue] = useState({
      question: upData.data.question,
      correctAnswer: upData.data.correctAnswer,


    });

    const {question, id, correctAnswer} = value
    // console.log(value)
    console.log(upData.data.question)

  
    const handleChange = (question) => (e) => {
      console.log(e.target.value)
      e.preventDefault();
    
      setValue({...value, [question]: e.target.value});
    };

    const updateData = async () => {
      const dataRef = doc(db, "Questions");
      
      await updateDoc(dataRef, {
        question: question,
        correctAnswer: correctAnswer
      });
          toast.success('Update successfully')
          
        };



  return (
    <Modal
      // {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Change value</h4>
            <input type="text" name= 'question' value={question} onChange = {() => {handleChange('question')}} />
            <input type="text" name= 'correctAnswer' value={correctAnswer} onChange = {() => {handleChange('correctAnswer')}} />
            <button onClick={updateData}>Update</button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Modals