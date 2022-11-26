import React, { useEffect, useState } from "react";

export default function Modal({ children }) {
  const [modal, setModal] = useState(true);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (modal) {
      setInterval(() => {
        setModal(false);
      }, 5000);
    }
  }, [modal]);

  return (
    <>
      {modal && (
        <div className="modal" onClick={toggleModal}>
          <div className="modal-content">{children}</div>
        </div>
      )}
    </>
  );
}
