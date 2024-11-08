import React from 'react';
import {Modal} from "semantic-ui-react";
import "./ModalBasic.css";

export function ModalBasic(props) {
    const {show, size, title, children, onClose} = props;
  return (
    <Modal 
        className='modal-basic'
        open={show}
        onClose={onClose}
        size={size}
    >
        {title && <Modal.Header>{title}</Modal.Header>}
        <Modal.Content>{children}</Modal.Content>

    </Modal>
  );
}

ModalBasic.defaultProps = {
    size: "tiny",
}