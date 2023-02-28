import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();

  const userLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user.user.uid) {
        localStorage.setItem("activeUser", JSON.stringify(user.user));
        navigate("/status");
      }
    } catch (e) {
      console.log(e);
      setErr(true);
    }
  };

  return (
    <div className="formContainerr">
      <div className="formWrapperr">
        <h1 className="logoo">We Chat</h1>
        <p className="titlee">Login</p>
        <input
          className="input-reg"
          required
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-reg"
          required
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={email === "" || password === ""}
          onClick={() => userLogin()}
          className="btn-login"
        >
          Sign in
        </button>
        {err && (
          <p
            style={{
              color: "white",
              fontWeight: "600",
            }}
          >
            Check Your Details
          </p>
        )}
        <p className="login-note">
          You don't have an account?
          <Link
            style={{
              fontSize: "20px",
              color: "yellow",
              textShadow: "1px 1px 1px #000",
            }}
            to="/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
