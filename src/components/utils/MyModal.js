import { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import DownloadModal from "./DownloadModal";
import MailModal from "./MailModal";
import {
  increaseCustomerCredit,
  decreaseCustomerCredit,
} from "../../api-service/api-service";

function MyModal(props) {
  const [increaseCreditAmount, setIncreaseCreditAmount] = useState(0);
  const [decreaseCreditAmount, setDecreaseCreditAmount] = useState(0);
  const [authName, setAuthName] = useState("");
  const [image, setImage] = useState(null);

  const [downloadModal, setDownloadModal] = useState(false);
  const [mailModal, setMailModal] = useState(false);

  const updateCustomerCredit = async () => {
    if (Number(increaseCreditAmount) > 0 && Number(decreaseCreditAmount) > 0) {
      alert("Enter only in 1 Field at a time");
      return;
    } else if (
      Number(increaseCreditAmount) == 0 &&
      Number(decreaseCreditAmount) == 0
    ) {
      alert("Enter Some Amount to Update");
      return;
    } else if (
      Number(increaseCreditAmount) < 0 ||
      Number(decreaseCreditAmount) < 0
    ) {
      alert("Negative Values Not Allowed");
      return;
    } else if (image === null) {
      alert("Attach a Receipt");
      return;
    } else if (authName === "") {
      alert("Enter Authorizer Name");
      return;
    }
    // If Validation Passed and case = IncreaseCredit
    else if (Number(increaseCreditAmount) > 0) {
      const response = await increaseCustomerCredit(
        props.customer.customer_id,
        increaseCreditAmount,
        authName,
        image
      );
      if (response.status !== 200) {
        alert("Some Error Occured");
      } else {
        props.onHide();
      }
    }
    // If Validation Passed and case = DecreaseCredit
    else if (Number(decreaseCreditAmount) > 0) {
      const response = await decreaseCustomerCredit(
        props.customer.customer_id,
        decreaseCreditAmount,
        authName,
        image
      );
      if (response.status !== 200) {
        alert("Some Error Occured");
      } else {
        props.onHide();
      }
    }
  };

  return (
    <>
      <Modal
        backdrop="static"
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
        <Modal.Body>
          <p>Contact Number: {props.customer.contact_number}</p>
          <p>First Line of Address: {props.customer.address_one}</p>
          <p>Second Line of Address: {props.customer.address_two}</p>
          <p>Town / City: {props.customer.town_city}</p>
          <p>Credit: {props.customer.customer_credit}</p>
          <p>Details: {props.customer.customer_details}</p>
          <hr style={{ border: "1px solid #000000" }}></hr>
          <div style={{ display: "flex" }}>
            <p>Authorizer Name: </p>
            <input
              style={{ marginLeft: 30 }}
              value={authName}
              onChange={(e) => {
                setAuthName(e.target.value);
              }}
            />
          </div>
          <div style={{ display: "flex" }} className="mt-2">
            <p>Increase Credit: </p>
            <input
              style={{ marginLeft: 40 }}
              value={increaseCreditAmount}
              onChange={(e) => {
                setIncreaseCreditAmount(e.target.value);
              }}
            />
          </div>
          <div style={{ display: "flex" }} className="mt-2">
            <p>Decrease Credit: </p>
            <input
              style={{ marginLeft: 30 }}
              value={decreaseCreditAmount}
              onChange={(e) => {
                setDecreaseCreditAmount(e.target.value);
              }}
            />
          </div>
          <div
            className="custom-file"
            style={{ display: "flex" }}
            className="mt-2"
          >
            <label className="custom-file-label">Attach Receipt</label>
            <input
              style={{ marginLeft: 50 }}
              type="file"
              className="custom-file-input"
              id="image"
              name="image"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
          <div
            style={{ display: "flex", justifyContent: "space-evenly" }}
            className="mt-3"
          >
            <div>
              <button
                className="btn btn-primary"
                onClick={async () => {
                  await updateCustomerCredit();
                  props.onHide();
                }}
              >
                Update Credit
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setDownloadModal(true);
                }}
              >
                Download CSV File
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setMailModal(true);
                }}
              >
                Mail CSV File
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

      <DownloadModal
        customer={props.customer}
        show={downloadModal}
        onHide={() => setDownloadModal(false)}
      />
      <MailModal
        customer={props.customer}
        show={mailModal}
        onHide={() => setMailModal(false)}
      />
    </>
  );
}

export default MyModal;
