import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalQuestion = ({ text, header, accept, cancel, show, handleAction, handleClose }) => {
    return (
        <Modal size="sm" centered show={show} onHide={handleClose}>
            <Modal.Body className="text-center">
                <h5>{header}</h5>
                <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{text}</p>
                <Button className="me-2 px-3" variant="secondary" onClick={handleClose}>
                    {cancel}
                </Button>
                <Button className="px-3" variant="danger" onClick={handleAction}>
                    {accept}
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default ModalQuestion;
