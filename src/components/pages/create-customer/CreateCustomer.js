import { useState } from "react";
import { createCustomer } from "../../../api-service/api-service";
import { FIELDS_MISSIING_ERROR } from "../../../config";
import "./CreateCustomer.css";

function CreateCustomer() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [townCity, setTownCity] = useState("");
  const [customerDetails, setCustomerDetails] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);

  function resetForm() {
    setFirstName("");
    setLastName("");
    setContactNumber("");
    setAddressOne("");
    setAddressTwo("");
    setTownCity("");
    setCustomerDetails("");
    setIsBlocked(false);
  }

  async function onCustomerCreate() {
    if (
      firstName !== "" &&
      lastName !== "" &&
      contactNumber !== "" &&
      addressOne !== "" &&
      addressTwo !== "" &&
      townCity !== "" &&
      customerDetails !== ""
    ) {
      const response = await createCustomer(
        firstName,
        lastName,
        contactNumber,
        addressOne,
        addressTwo,
        townCity,
        customerDetails,
        isBlocked
      );
      if (response.status !== 200) {
        alert("Some Problem Occuered");
      } else {
        alert("Customer Created");
        resetForm();
      }
    } else {
      alert(FIELDS_MISSIING_ERROR);
    }
  }

  return (
    <div className="container">
      <div>
        <p>First Name</p>
        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <p>Last Name</p>
        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <p>Contact Number</p>
        <input
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </div>
      <div>
        <p>First Line of Address</p>
        <input
          placeholder="First Line of Address"
          value={addressOne}
          onChange={(e) => setAddressOne(e.target.value)}
        />
      </div>

      <div>
        <p>Second Line of Address</p>
        <input
          placeholder="Second Line of Address"
          value={addressTwo}
          onChange={(e) => setAddressTwo(e.target.value)}
        />
      </div>
      <div>
        <p>Town / City</p>
        <input
          placeholder="Town / City"
          value={townCity}
          onChange={(e) => setTownCity(e.target.value)}
        />
      </div>
      <div>
        <p>Customer Details</p>
        <input
          placeholder="Customer Details"
          value={customerDetails}
          onChange={(e) => setCustomerDetails(e.target.value)}
        />
      </div>
      <div className="checkboxWrapper">
        <p>Also Add To Block List</p>
        <input
          type="checkbox"
          value={isBlocked}
          onChange={(e) => setIsBlocked(!isBlocked)}
        />
      </div>
      <div>
        <button onClick={onCustomerCreate}>Add Customer</button>
      </div>
    </div>
  );
}

export default CreateCustomer;
