import React from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

const ModalOverlay = ({ children, title, onClose, onHandelSubmit }) => {
  return (
    <div
      className="modal fade show"
      style={{ display: "block" }}
      onClick={onClose}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div>{children}</div>
            <div className="d-flex justify-content-end mt-4">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onHandelSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

function Modal({ children, onClose, title, onHandelSubmit }) {
  return (
    <>
      {createPortal(
        <ModalOverlay
          title={title}
          onClose={onClose}
          onHandelSubmit={onHandelSubmit}
        >
          {children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
}

export default Modal;
