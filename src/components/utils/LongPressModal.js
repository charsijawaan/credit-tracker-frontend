import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { updateBlockedAndArchived } from "../../api-service/api-service";

function LongPressModal(props) {
  const [isBlocked, setIsBlocked] = useState(
    JSON.parse(props.customer.is_blocked)
  );
  const [isArchived, setIsArchived] = useState(
    JSON.parse(props.customer.is_archived)
  );

  const update = async () => {
    const response = await updateBlockedAndArchived(
      props.customer.customer_id,
      isBlocked,
      isArchived
    );
    if (response.status !== 200) {
      alert("Some Error Occured");
    } else {
      props.onHide();
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.customer.first_name} {props.customer.last_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <p>Blocked</p>
          <input
            style={{ marginLeft: 8 }}
            type="checkbox"
            checked={isBlocked}
            onChange={() => {
              setIsBlocked(!isBlocked);
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <p>Archived</p>
          <input
            style={{ marginLeft: 8 }}
            type="checkbox"
            checked={isArchived}
            onChange={() => {
              setIsArchived(!isArchived);
            }}
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => {
              update();
            }}
          >
            Update
          </button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LongPressModal;
