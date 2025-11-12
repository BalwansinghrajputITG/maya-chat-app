import { useEffect, useState } from "react";
import socket from "./services/socket";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "./actions/addMessage";
import type { Message } from "./types/msgTypes";
//import { messages } from "./selectors/messages";

function App() {
  const dispatch = useDispatch();

  const messages = useSelector((state: any) => state.messages);
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
    <div className="bg-black h-screen flex flex-col p-6 gap-3">
      <div className="h-[90%] bg-sky-200 p-2">
        <ul className="flex flex-col gap-2">
          {messages.map((v: Message, i: number) =>
            v.userId === 1 ? (
              <div
                key={`${v.msg}${i}`}
                className="bg-blue-400 p-1 self-end w-[100px] text-center"
              >
                {v.msg}
              </div>
            ) : (
              <div
                key={`${v.msg}${i}`}
                className="bg-gray-400 p-1 self-start w-[100px] text-center"
              >
                {v.msg}
              </div>
            )
          )}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full gap-1">
        <input
          className="bg-white w-[90%] p-2 rounded outline-none"
          type="text"
          value={sendMsg}
          onChange={(e) => setSendMsg(e.target.value)}
        />
        <button className="text-white w-[10%] cursor-pointer bg-sky-600 px-4 py-2 rounded">
          send
        </button>
      </form>
    </div>
  );
}

export default App;
