import React, { useEffect, useRef, useState } from "react";
import {
  BsEmojiSmile,
  BsFillChatLeftTextFill,
  BsFillImageFill,
} from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import "./index.css";

const ChatHome = () => {
  const [sendMsg, setSendMsg] = useState("");
  const [msgData, setMsgData] = useState([]);
  const [imageInput, setImageInput] = useState(false);
  const [image, setImage] = useState("");

  const scroll = useRef(null);
  const toBottom = () => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getMessages();
    toBottom();
  }, []);

  const activeUserUid = JSON.parse(localStorage.getItem("activeUser"));
  const activeName = activeUserUid.email.slice(0, 5).toUpperCase();
  const chatUser = JSON.parse(localStorage.getItem("selectedUser"));

  const activeUserMsg = () => {
    addDoc(collection(db, "messages"), {
      text: sendMsg,
      name: activeName,
      chatId: [chatUser.uid, activeUserUid.uid].sort().join("-"),
      time: serverTimestamp(),
    });
    setSendMsg("");
  };

  const location = useLocation();

  const getMessages = () => {
    try {
      const q = query(
        collection(db, "messages"),
        where(
          "chatId",
          "==",
          [chatUser.uid, activeUserUid.uid].sort().join("-")
        ),
        orderBy("time", "asc")
      );
      onSnapshot(q, (snapshot) => {
        const message = snapshot.docs.map((i) => ({
          id: i.id,
          ...i.data(),
        }));
        setMsgData(message);
      });
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <>
      <div className="chat-div">
        <div className="message-div">
          <div className="per-header">
            <img
              alt="person"
              className="person"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNCDnvFAqGOU6h9DiqacM1L1CKhfRpUN6aBQ&usqp=CAU"
            />
            <div>
              <h5 className="per-name">{location.state.name}</h5>
            </div>
          </div>
          <div className="messages-box">
            <div className="msg-cont">
              <h1
                className="end-text"
                style={{ textAlign: "center", margin: "5px" }}
              >
                We Chat <BsFillChatLeftTextFill />
              </h1>

              {msgData !== []
                ? msgData.map((el, ind) => {
                    let time =
                      el.time?.seconds &&
                      new Date(el.time?.seconds * 1000).toISOString();
                    return (
                      <p
                        key={ind}
                        className={
                          el.name === activeName ? "sender-msg" : "text-msg"
                        }
                      >
                        <span className="user-span">
                          {el.name === activeName ? "You" : el.name}
                        </span>
                        <img
                          alt="person"
                          className="text-person"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNCDnvFAqGOU6h9DiqacM1L1CKhfRpUN6aBQ&usqp=CAU"
                        />
                        {el.text}
                        <span className="time-span">
                          {new Date(time).toLocaleTimeString()}
                        </span>
                      </p>
                    );
                  })
                : null}
            </div>
            <div ref={scroll} />
          </div>

          <div className="send-box">
            <BsEmojiSmile className="emoji" size={27} />
            <div onClick={() => setImageInput(!imageInput)}>
              <BsFillImageFill
                style={{ cursor: "pointer" }}
                className="emoji"
                size={27}
              />
            </div>
            {imageInput ? (
              <>
                <input
                  type="file"
                  className="input-send"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <button
                  style={{
                    cursor: "pointer",
                    color: "white",
                    background: "none",
                    border: "none",
                  }}
                >
                  <AiOutlineSend className="emoji" size={27} />
                </button>
              </>
            ) : (
              <>
                <input
                  placeholder="Type a message..."
                  className="input-send"
                  type="text"
                  onChange={(e) => setSendMsg(e.target.value)}
                />
                <button
                  style={{
                    cursor: "pointer",
                    color: "white",
                    background: "none",
                    border: "none",
                  }}
                  onClick={() => {
                    activeUserMsg();
                  }}
                  disabled={sendMsg === ""}
                >
                  <FiSend className="emoji" size={27} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHome;
