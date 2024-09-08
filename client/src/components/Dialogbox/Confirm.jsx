import { useState } from "react";

const Confirm = ({ onConfirm, onCancel, message }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm();
  };

  const handleCancel = () => {
    setIsOpen(false);
    onCancel();
  };

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      onCancel();
    }
  };

  const toggleDialog = () => {
    setIsOpen(true);
  };

  return (
    <div className="confirmation-dialog" onClick={handleClose}>
      {isOpen && (
        <div className="dialog-content">
          <p>{message}</p>
          <button onClick={handleConfirm} className="btn btn-error">
            ใช่
          </button>
          <button onClick={handleCancel} className="btn btn-error">
            ไม่
          </button>
        </div>
      )}
      {!isOpen && (
        <button onClick={toggleDialog} className="btn btn-error">
          ลบ
        </button>
      )}
    </div>
  );
};

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <Confirm
      message={message}
      onConfirm={onConfirm}
      onCancel={onCancel}
    ></Confirm>
  );
};

export default ConfirmationDialog;