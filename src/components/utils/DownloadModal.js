import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { downloadCSV } from "../../api-service/api-service";
import { API_URL } from "./../../config";

function DownloadModal(props) {
    const [startDate, setStartDate] = useState(new Date(new Date().getTime()));
    const [endDate, setEndDate] = useState(new Date(new Date().getTime()));
    async function download() {
        const response = await downloadCSV(
            props.customer.customer_id,
            startDate,
            endDate
        );
        if (response.status !== 200) {
            alert("Some Error Occured");
        } else {
            console.log(response.data.fileName);
            console.log(response.data.fileName.split("https://")[2]);
            window.open(
                response.data.fileName,
                "_blank",
                "noopener,noreferrer"
            );
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
                <button
                    style={{ marginTop: 10 }}
                    className="btn btn-primary"
                    onClick={() => {
                        download();
                    }}
                >
                    Download
                </button>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DownloadModal;
