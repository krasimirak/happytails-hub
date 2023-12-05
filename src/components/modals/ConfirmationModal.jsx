import { Modal, Button } from 'flowbite-react';

/**
 * This component renders a greeting to the user.
 *
 * @param {string} title - modal title to be displayed
 * @param {function} closeHandler - callback function to resolve cancel
 * @param {function} confirmHandler - callback function to resolve confirmation
 * @returns {ReactNode} A React element that renders a greeting to the user.
 */

export default function ConfirmationModal({title, children, closeHandler, confirmHandler}) {
  return (
    <>
      <Modal show={true} onClose={closeHandler}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {children}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={confirmHandler} color="failure" size="lg">Yes, I&apos;m sure</Button>
          <Button onClick={closeHandler} color="light" size="lg">Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
