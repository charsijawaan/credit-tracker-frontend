import axios from "axios";
import { API_URL } from "../config";

export async function checkLogin(username, password) {
    const url = `${API_URL}check_login`;
    try {
        return await axios.post(url, {
            username: username,
            password: password,
        });
    } catch (e) {
        console.log(e);
        return e.response;
    }
}

export async function createCustomer(
    firstName,
    lastName,
    contactNumber,
    addressOne,
    addressTwo,
    townCity,
    customerDetails,
    isBlocked
) {
    const token = localStorage.getItem("token");
    const url = `${API_URL}add_customer`;
    try {
        return await axios.post(
            url,
            {
                firstName: firstName,
                lastName: lastName,
                contactNumber: contactNumber,
                addressOne: addressOne,
                addressTwo: addressTwo,
                townCity: townCity,
                customerDetails: customerDetails,
                isBlocked: isBlocked,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    } catch (e) {
        return e.response;
    }
}

export async function createEmployee(
    firstName,
    lastName,
    contactNumber,
    townCity,
    username,
    password
) {
    const token = localStorage.getItem("token");
    const url = `${API_URL}create_employee`;
    try {
        return await axios.post(
            url,
            {
                firstName: firstName,
                lastName: lastName,
                contactNumber: contactNumber,
                townCity: townCity,
                username: username,
                password: password,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    } catch (e) {
        return e.response;
    }
}

export async function getAllCustomers() {
    const token = localStorage.getItem("token");
    const url = `${API_URL}get_all_customers`;
    try {
        return await axios.post(
            url,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    } catch (e) {
        return e.response;
    }
}

export async function getCustomersByName(name) {
    const token = localStorage.getItem("token");
    const url = `${API_URL}search_customer_by_name`;
    try {
        return await axios.post(
            url,
            { name: name },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (e) {
        return e.response;
    }
}

export async function getCustomersByPhone(phone) {
    const token = localStorage.getItem("token");
    const url = `${API_URL}search_customer_by_phone`;
    try {
        return await axios.post(
            url,
            { phone: phone },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (e) {
        return e.response;
    }
}

export async function increaseCustomerCredit(
    customerID,
    increaseCreditAmount,
    authName,
    image
) {
    const token = localStorage.getItem("token");
    const url = `${API_URL}increase_customer_credit`;
    try {
        const formdata = new FormData();
        var date = new Date();
        formdata.append("customer_id", customerID);
        formdata.append("increase_amount", increaseCreditAmount);
        formdata.append("decrease_amount", null);
        formdata.append(
            "changed_by_id",
            JSON.parse(localStorage.getItem("user")).user_id
        );
        formdata.append(
            "date",
            date.toISOString().split("T")[0] +
                " " +
                date.toTimeString().split(" ")[0]
        );
        formdata.append("auth_name", authName);
        formdata.append("image", image);

        return await axios.post(url, formdata, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (e) {
        return e.response;
    }
}

export async function decreaseCustomerCredit(
    customerID,
    decreaseCreditAmount,
    authName,
    image
) {
    const token = localStorage.getItem("token");
    const url = `${API_URL}decrease_customer_credit`;
    try {
        const formdata = new FormData();
        var date = new Date();
        formdata.append("customer_id", customerID);
        formdata.append("increase_amount", null);
        formdata.append("decrease_amount", decreaseCreditAmount);
        formdata.append(
            "changed_by_id",
            JSON.parse(localStorage.getItem("user")).user_id
        );
        formdata.append(
            "date",
            date.toISOString().split("T")[0] +
                " " +
                date.toTimeString().split(" ")[0]
        );
        formdata.append("auth_name", authName);
        formdata.append("image", image);

        return await axios.post(url, formdata, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (e) {
        return e.response;
    }
}

export async function updateBlockedAndArchived(
    customerID,
    isBlocked,
    isArchived
) {
    const token = localStorage.getItem("token");
    const url = `${API_URL}update_blocked_and_archived`;
    try {
        return await axios.post(
            url,
            {
                customer_id: customerID,
                is_blocked: isBlocked,
                is_archived: isArchived,
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (e) {
        return e.response;
    }
}

export async function downloadCSV(customerID, sd, ed) {
    const token = localStorage.getItem("token");
    const url = `${API_URL}generate_csv_file`;
    try {
        return await axios.post(
            url,
            {
                customer_id: customerID,
                startDate: sd,
                endDate: ed,
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (e) {
        return e.response;
    }
}

export async function mailCSV(customerID, sd, ed, email) {
    const token = localStorage.getItem("token");
    const url = `${API_URL}send_csv_file`;
    try {
        return await axios.post(
            url,
            {
                customer_id: customerID,
                email: email,
                startDate: sd,
                endDate: ed,
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (e) {
        return e.response;
    }
}
