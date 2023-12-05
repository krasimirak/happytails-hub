import { useState } from 'react';

import { Modal } from 'flowbite-react';

/**
 * This component renders a greeting to the user.
 *
 * @param {string} title - modal title to be displayed
 * @param {function} closeHandler - callback function to resolve
 * @returns {ReactNode}
 */

export default function ErrorModal({title, children, closeHandler}) {
  const [openModal, setOpenModal] = useState(true);

  const onModalClose = () => {
    setOpenModal(false);
    closeHandler();
  }

  return (
    <>
      <Modal show={openModal} onClose={onModalClose}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {children}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
