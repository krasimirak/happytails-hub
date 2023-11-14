import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';

/**
 * This component renders a greeting to the user.
 *
 * @param {string} title - modal title to be displayed
 * @param {function} closeHandler - callback function to resolve
 * @returns {ReactNode} A React element that renders a greeting to the user.
 */

export default function ErrorModal(props) {
  const [openModal, setOpenModal] = useState(true);

  const onModalClose = () => {
    setOpenModal(false);
    props.closeHandler();
  }

  return (
    <>
      <Modal show={openModal} onClose={onModalClose}>
        <Modal.Header>{props.title}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {props.children}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
