import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";
function App() {
  // const [token, setToken] = useState(null);
  const [tokenOk, setTokenOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    password: null,
    repassword: null,
  });
  useEffect(() => {
    // setToken(window.location.pathname.substring(1));
    try {
      axios
        .post("https://localhost:44324/api/token/decodeForgotPassword", {
          token: window.location.pathname.substring(1),
        })
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          if (res.data === true) setTokenOk(true);
          else setTokenOk(false);
        });
    } catch (e) {
      console.log("error => " + e);
    }
  }, []);

  const onClickChangePassword = async () => {
    if (
      data.password !== null &&
      data.password.trim() !== "" &&
      data.password !== undefined &&
      data.repassword !== null &&
      data.repassword.trim() !== "" &&
      data.repassword !== undefined &&
      data.repassword === data.password
    ) {
      await axios
        .post(
          "https://localhost:44324/api/user/changePasswordVerify",
          {
            token: window.location.pathname.substring(1),
            password: data.password,
          },
          {
            headers: {
              Authorization: `Bearer ${window.location.pathname.substring(1)}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data === true) {
            setDone(res.data);
            setTokenOk(false);
          } else {
            setTokenOk(false);
          }
        });
    } else {
      alert("email address is incorrect or unvalid");
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {loading ? (
          <img
            alt="gifimg"
            src="https://cdn.websitebox.com/js-wsbx-common/v4.1.9/images/websitebox-loader.gif"
          />
        ) : (
          <div>
            {tokenOk ? (
              <div>
                <input
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  type="password"
                  style={{
                    width: "90%",
                    height: 30,
                    margin: 5,
                    borderRadius: 10,
                  }}
                  placeholder="Enter Password"
                />
                <input
                  onChange={(e) =>
                    setData({ ...data, repassword: e.target.value })
                  }
                  type="password"
                  style={{
                    width: "90%",
                    height: 30,
                    margin: 5,
                    borderRadius: 10,
                  }}
                  placeholder="Re Enter Password"
                />
                {/*     width: 40%;
    height: 50px;
    border-radius: 10px;
    font-size: 90%; */}
                <button
                  style={{
                    width: "40%",
                    height: 50,
                    borderRadius: 10,
                    fontSize: "60%",
                  }}
                  onClick={() => onClickChangePassword()}
                >
                  change password
                </button>
              </div>
            ) : (
              <p>{done ? "successfully password changed" : "token expires"}</p>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
