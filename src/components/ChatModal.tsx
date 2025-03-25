// import React, { useEffect, useRef, useState } from "react";
// import io, { Socket } from "socket.io-client";
// import { Message, ChatModalProps } from "../types";
// import "./chat.css";

// const socket: typeof Socket = io(import.meta.env.VITE_API_BASE_URL);

// const ChatModal: React.FC<ChatModalProps> = ({
//   currentUserId,
//   otherUserId,
//   otherUser,
//   onClose,
// }) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const chatId = [currentUserId, otherUserId].sort().join("_");

//   useEffect(() => {
//     socket.emit("joinRoom", { roomId: chatId });

//     socket.on("receiveMessage", (msg: Message) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [chatId]);

//   const fetchMessages = () => {
//     fetch(`${import.meta.env.VITE_API_BASE_URL}/messages/${chatId}`)
//       .then((res) => res.json())
//       .then((data) => setMessages(data.messages))

//       .catch((err) => console.error("Failed to load messages:", err));
//   };

//   useEffect(() => {
//     console.log("Fetching messages for chatId:", chatId);

//     fetchMessages();
//   }, [chatId]);

//   //   useEffect(() => {
//   //     fetch(`/api/messages/${chatId}`)
//   //       .then((res) => res.json())
//   //       .then((data) => setMessages(data))
//   //       .catch((err) => console.error("Failed to load messages:", err));
//   //   }, [chatId]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if (!newMessage.trim()) return;

//     const messageToSend = {
//       roomId: chatId,
//       message: newMessage,
//       senderId: currentUserId,
//       receiverId: otherUserId,
//     };

//     socket.emit("sendMessage", messageToSend);

//     setMessages((prev) => [
//       ...prev,
//       {
//         _id: `${Date.now()}`,
//         content: newMessage,
//         sender: currentUserId,
//         receiver: otherUserId,
//         timestamp: new Date().toISOString(),
//         chatId,
//       },
//     ]);

//     setNewMessage("");
//   };

//   return (
//     <div className="chat-modal-overlay">
//       <div className="chat-modal">
//         <div className="chat-header">
//           <img
//             src={otherUser.profilePicture || "/src/assets/photo.png"}
//             alt="avatar"
//           />
//           <span>{otherUser.username}</span>
//           <button className="close-btn" onClick={onClose}>
//             ✖
//           </button>
//         </div>

//         <div className="messages">
//           {messages.map((msg) => (
//             <div
//               key={msg._id}
//               className={
//                 msg.sender === currentUserId ? "my-message" : "other-message"
//               }
//             >
//               <p>{msg.content}</p>
//               <small>
//                 {new Date(msg.timestamp).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </small>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         <form className="send-box" onSubmit={sendMessage}>
//           <input
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) sendMessage(e);
//             }}
//           />
//           <button type="submit">Send</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatModal;

import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Message, ChatModalProps } from "../types";
import "./chat.css";

const socket: typeof Socket = io(import.meta.env.VITE_API_BASE_URL);

const ChatModal: React.FC<ChatModalProps> = ({
  currentUserId,
  otherUserId,
  otherUser,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatId = [currentUserId, otherUserId].sort().join("_");

  useEffect(() => {
    socket.emit("joinRoom", { roomId: chatId });

    socket.on("receiveMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [chatId]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/messages/${chatId}`
      );
      const data = await res.json();
      // בדיקה שהתקבלה רשימת הודעות אמיתית
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        console.error("Unexpected messages format:", data);
      }
    } catch (err) {
      console.error("❌ Failed to load messages:", err);
    }
  };

  useEffect(() => {
    console.log("📥 Fetching messages for chatId:", chatId);
    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;

    const messageToSend = {
      roomId: chatId,
      message: newMessage,
      senderId: currentUserId,
      receiverId: otherUserId,
    };

    socket.emit("sendMessage", messageToSend);

    setMessages((prev) => [
      ...prev,
      {
        _id: `${Date.now()}`,
        content: newMessage,
        sender: currentUserId,
        receiver: otherUserId,
        timestamp: new Date().toISOString(),
        chatId,
      },
    ]);

    setNewMessage("");
  };

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal">
        <div className="chat-header">
          <img
            src={otherUser.profilePicture || "/src/assets/photo.png"}
            alt="avatar"
          />
          <span>{otherUser.username}</span>
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="messages">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={
                msg.sender === currentUserId ? "my-message" : "other-message"
              }
            >
              <p>{msg.content}</p>
              <small>
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="send-box" onSubmit={sendMessage}>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) sendMessage(e);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
