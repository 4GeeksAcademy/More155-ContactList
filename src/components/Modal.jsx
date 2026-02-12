export const Modal = ({ show, onHide, onConfirm }) => {
  if (!show) return null;

  return (
    <>
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Are you sure?</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onHide}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>If you delete this thing the entire universe will go down!</p>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onHide}
              >
                Oh no!
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={onConfirm}
              >
                Yes baby!
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" onClick={onHide}></div>
    </>
  );
};