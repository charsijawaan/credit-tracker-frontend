import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { API_URL } from "./../../config";
import { mailCSV } from "../../api-service/api-service";

function MailModal(props) {
  const [startDate, setStartDate] = useState(new Date(new Date().getTime()));
  const [endDate, setEndDate] = useState(new Date(new Date().getTime()));
  const [email, setEmail] = useState("");

  async function mail() {
    const response = await mailCSV(
      props.customer.customer_id,
      startDate,
      endDate,
      email
    );
    if (response.status !== 200) {
      alert("Some Error Occuered");
    } else {
      alert("Mail has been sent");
    }
  }
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
        <div>
          <p>Select Start Date</p>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </div>
        <div>
          <p>Select End Date</p>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </div>
        <div>
          <p>Enter Email</p>
          <input
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <button
          style={{ marginTop: 10 }}
          className="btn btn-primary"
          onClick={() => {
            mail();
          }}
        >
          Mail CSV
        </button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MailModal;
