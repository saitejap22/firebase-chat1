import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

import "./index.css";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const auth = getAuth();

  const createNewUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        displayName
      );
      if (user.user.uid) {
        console.log(user);
        const res = await addDoc(collection(db, "/users"), {
          name: displayName,
          uid: user.user.uid,
          email: email,
          online: false,
        });
        setSuccess(true);
        setEmail("");
        setPassword("");
        setDisplayName("");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="reg-div">
      <div className="formWrapper">
        <h1 className="logo">We Chat</h1>
        <p className="title">Register</p>
        <div className="form-reg">
          <input
            className="input-reg"
            required
            type="email"
            placeholder="Display Name"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
          <input
            className="input-reg"
            required
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="input-reg"
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={displayName === "" || email === "" || password === ""}
            onClick={() => createNewUser()}
            className="regg-btn"
          >
            Sign Up
          </button>
          {success && (
            <h4 style={{ color: "white" }}>User Created Successfully</h4>
          )}
        </div>
        <p className="reg-note">
          You do have an account?
          <Link className="reg-note" to="/">
            <span style={{ fontSize: "22px", color: "yellow" }}>Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
