import { useState } from "react";
import { createEmployee } from "../../../api-service/api-service";
import { FIELDS_MISSIING_ERROR } from "./../../../config";

function CreateEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [townCity, setTownCity] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function resetForm() {
    setFirstName("");
    setLastName("");
    setContactNumber("");
    setTownCity("");
    setUsername("");
    setPassword("");
  }

  async function onEmployeeCreate() {
    if (
      firstName !== "" &&
      lastName !== "" &&
      contactNumber !== "" &&
      townCity !== "" &&
      username !== "" &&
      password !== ""
    ) {
      const response = await createEmployee(
        firstName,
        lastName,
        contactNumber,
        townCity,
        username,
        password
      );
      if (response.status !== 200) {
        alert("Some Problem Occuered");
      } else {
        alert("Employee Created");
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
        <p>Town / City</p>
        <input
          placeholder="Town / City"
          value={townCity}
          onChange={(e) => setTownCity(e.target.value)}
        />
      </div>

      <div>
        <p>Username</p>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <p>Password</p>
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={onEmployeeCreate}>Create Employee</button>
      </div>
    </div>
  );
}

export default CreateEmployee;
