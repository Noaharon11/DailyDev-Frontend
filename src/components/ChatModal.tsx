import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import type { Socket } from "socket.io-client";
import { Message, ChatModalProps } from "../types";

const socket: typeof Socket = io(import.meta.env.VITE_API_BASE_URL);

const ChatModal: React.FC<ChatModalProps> = ({
  currentUserId,
  otherUserId,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

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

  useEffect(() => {
    fetch(`/api/messages/${chatId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));
  }, [chatId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socket.emit("sendMessage", {
      roomId: chatId,
      message: newMessage,
      senderId: currentUserId,
      receiverId: otherUserId,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h3>Chat</h3>

        <div className="messages">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={
                msg.sender === currentUserId ? "my-message" : "other-message"
              }
            >
              <p>{msg.content}</p>
              <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
            </div>
          ))}
        </div>

        <div className="send-box">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
