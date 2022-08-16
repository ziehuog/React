import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalAddSubject(props) {
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
              name="answer_2"
              type="text"
              placeholder="answer"
              onChange={e => console.log(e.target.value)}
            />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalAddSubject;
