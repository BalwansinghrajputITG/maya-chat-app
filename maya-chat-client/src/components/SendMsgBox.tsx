import React, { memo, useEffect, useState } from "react";
import Button from "../shared/Button";
import Input from "../shared/Input";
import { useDispatch } from "react-redux";
import socket from "../services/socket";
import type { Message } from "../types/msgTypes";
import { addMessage } from "../actions/addMessage";

interface SendMsgBoxProps {}

const SendMsgBox: React.FC<SendMsgBoxProps> = () => {
  const dispatch = useDispatch();

  const [sendMsg, setSendMsg] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("message", (data: Message) => {
      console.log(" Received:", data);
      dispatch(addMessage(data));
    });

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, [dispatch]);

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    if (sendMsg.trim() === "") return;

    const newMsg: Message = { userId: 1, msg: sendMsg };

    socket.emit("message", newMsg);

    dispatch(addMessage(newMsg));

    setSendMsg("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-1 w-full h-[10%] ">
      <Input
        type="file"
        className="bg-gray-600 w-12 cursor-pointer rounded-full my-1 mx-2 text-gray-500"
      />

      <Input
        type="text"
        value={sendMsg}
        className="bg-gray-400 rounded-l w-[85%]"
        onChange={(e) => setSendMsg(e.target.value)}
      />
      <Button type="primary">send</Button>
    </form>
  );
};

export default memo(SendMsgBox);
