import React from "react";
import { Modal, Button, ModalFooter } from "react-bootstrap";
import '../App.css'

const CustomModal = ({ showModal, closeModal, children }) => {
  return (
    <Modal show={showModal} onHide={closeModal} centered className="glass-morphism" >
      <Modal.Body style={{width:"97%",maxWidth:"800px "}}>
          {children}
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" className="btn btn-danger" onClick={closeModal}>
                Close
          </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
