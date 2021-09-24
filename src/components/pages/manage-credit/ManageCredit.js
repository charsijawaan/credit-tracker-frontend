import { useState, useEffect } from "react";
import {
    getAllCustomers,
    getCustomersByName,
    getCustomersByPhone,
} from "./../../../api-service/api-service";
import MyModal from "../../utils/MyModal";
import LongPressModal from "../../utils/LongPressModal";
import Holdable from "../../utils/holdable";
import "./ManageCredit.css";

function ManageCredit() {
    const [modalVisible, setModalVisible] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [showArchived, setShowArchived] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedSearchType, setSelectedSearchType] = useState("name");
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [longPressModalVisible, setLongPressModalVisible] = useState(false);
    const [foo, setFoo] = useState(false);

    useEffect(async () => {
        const response = await getAllCustomers();
        if (response.status === 200) {
            setCustomers(response.data.customers);
        }
    }, []);

    useEffect(async () => {
        const response = await getAllCustomers();
        if (response.status === 200) {
            setCustomers(response.data.customers);
        }
    }, [modalVisible]);

    useEffect(() => {
        updateTableOnSearch();
    }, [searchText]);

    const updateTableOnSearch = async () => {
        if (searchText !== "") {
            // If search type is Name
            if (selectedSearchType === "name") {
                const response = await getCustomersByName(searchText);
                setCustomers(response.data.customers);
            }
            // If search type is Phone
            else if (selectedSearchType === "phone") {
                const response = await getCustomersByPhone(searchText);
                setCustomers(response.data.customers);
            }
        } else {
            const response = await getAllCustomers(searchText);
            setCustomers(response.data.customers);
        }
    };

    return (
        <div>
            <MyModal
                show={modalVisible}
                onHide={() => {
                    setModalVisible(false);
                }}
                customer={selectedCustomer}
            />

            {foo && (
                <LongPressModal
                    show={longPressModalVisible}
                    onHide={() => {
                        setFoo(false);
                        setLongPressModalVisible(false);
                    }}
                    customer={selectedCustomer}
                />
            )}

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Customer ID</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Credit</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => {
                        return (
                            <>
                                {showArchived && (
                                    <Holdable
                                        style={{
                                            backgroundColor:
                                                customer.is_blocked === "true"
                                                    ? "#dc5a5a"
                                                    : "#ffffff",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            console.log("CLICKED");
                                            setSelectedCustomer(customer);
                                            setModalVisible(true);
                                        }}
                                        onHold={() => {
                                            setSelectedCustomer(customer);
                                            setFoo(true);
                                            setLongPressModalVisible(true);
                                        }}
                                    >
                                        <th scope="row">
                                            {customer.customer_id}
                                        </th>
                                        <td
                                            style={{
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {customer.first_name}{" "}
                                            {customer.last_name}
                                        </td>
                                        <td>{customer.customer_credit}</td>
                                    </Holdable>
                                )}
                                {!showArchived &&
                                    customer.is_archived === "false" && (
                                        <Holdable
                                            style={{
                                                backgroundColor:
                                                    customer.is_blocked ===
                                                    "true"
                                                        ? "#dc5a5a"
                                                        : "#ffffff",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => {
                                                console.log("CLICKED");
                                                setSelectedCustomer(customer);
                                                setModalVisible(true);
                                            }}
                                            onHold={() => {
                                                setSelectedCustomer(customer);
                                                setFoo(true);
                                                setLongPressModalVisible(true);
                                            }}
                                        >
                                            <th scope="row">
                                                {customer.customer_id}
                                            </th>
                                            <td
                                                style={{
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {customer.first_name}{" "}
                                                {customer.last_name}
                                            </td>
                                            <td>{customer.customer_credit}</td>
                                        </Holdable>
                                    )}
                            </>
                        );
                    })}
                </tbody>
            </table>

            {/* Bottom Bar */}
            <div
                style={{
                    display: "flex",
                    position: "absolute",
                    bottom: 100,
                    width: "100%",
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "space-evenly",
                }}
            >
                {/* Search Bar */}
                <div>
                    <input
                        placeholder="Search"
                        style={{ width: "90%" }}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                </div>
                {/* Type Picker */}
                <div>
                    <select
                        className="form-control"
                        style={{
                            width: "90%",
                            backgroundColor: "#f7f7f7",
                            borderRadius: 5,
                        }}
                        value={selectedSearchType}
                        onChange={(e) => {
                            setSelectedSearchType(e.target.value);
                        }}
                    >
                        <option value="name">Name</option>
                        <option value="phone">Phone Number</option>
                    </select>
                </div>
                {/* Archived Toggle */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <p>Show Archived</p>
                    <input
                        type="checkbox"
                        value={showArchived}
                        style={{ marginLeft: 5 }}
                        onChange={() => {
                            setShowArchived(!showArchived);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ManageCredit;
