import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";

import "./index.css";

const OnlineStatus = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("activeUser"));
  localStorage.setItem("allUsers", JSON.stringify(users));

  const getUsersCollection = async () => {
    try {
      const usersList = [];
      const usersData = await getDocs(collection(db, "/users"));
      usersData.forEach((doc) => {
        usersList.push({ ...doc.data(), id: doc.id });
      });
      setUsers(usersList);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsersCollection();
  }, []);

  const handleUserClick = (userData) => {
    navigate(
      "/chat",
      { state: userData },
      localStorage.setItem("selectedUser", JSON.stringify(userData))
    );
  };

  return (
    <>
      <div className="chat-status">
        <h1>Click on User to Chat</h1>
        <div className="users-list">
          {users
            .filter((item) => item.uid !== loggedInUser.uid)
            .map((el) => {
              return (
                <h3
                  key={el.id}
                  onClick={() => handleUserClick(el)}
                  className="user-name"
                >
                  {el.name}
                </h3>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default OnlineStatus;
