import { useState, useEffect } from "react";
import { checkLogin } from "./../../../api-service/api-service";
import { userStore } from "./../../../store/store";
import "./Login.css";

function Login({ history }) {
    useEffect(() => {
        if (localStorage.getItem("token")) {
            history.push("/home");
        }
    }, []);

    // local states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // util functions
    function resetForm() {
        setUsername("");
        setPassword("");
    }

    async function onLogin() {
        if (username !== "" && password !== "") {
            try {
                const response = await checkLogin(username, password);
                console.log(response);
                if (response.status !== 200) {
                    resetForm();
                    alert("Login Failed");
                } else {
                    localStorage.setItem("token", response.data.accessToken);
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.user)
                    );
                    userStore.update((s) => {
                        s.user = response.data.user;
                    });
                    history.push("/home");
                }
            } catch (e) {
                alert("Some Problem Occured");
            }
        } else {
            alert("Some fields are empty");
        }
    }

    return (
        <div className="container">
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
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button onClick={onLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;
