import { useEffect, useState } from "react";
import socket from "./services/socket";

interface Message {
  userId: number;
  msg: string;
}

function App() {
  const [msg, setMsg] = useState<Message[]>([
    { userId: 1, msg: "hello" },
    { userId: 2, msg: "hii" },
  ]);

  const [sendMsg, setSendMsg] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 Connected to server:", socket.id);
    });

    socket.on("message", (data: Message) => {
      console.log("📩 Received:", data);
      setMsg((prev) => [...prev, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, []);

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    if (sendMsg.trim() === "") return;
     const newMsg: Message = { userId: 1, msg: sendMsg };
   //  console.log(newMsg)
   // setMsg((prev) => [...prev, newMsg]);

    socket.emit("message", newMsg);

    setSendMsg("");
  };

  return (
    <div className="bg-black h-screen flex flex-col p-6 gap-3">
      <div className="h-[90%] bg-sky-200 p-2">
        <ul className="flex flex-col gap-2">
          {msg.map((v, i) => {
            return v.userId == 1 ? (
              <div
                key={`${v.msg}` + i}
                className="bg-blue-400 p-1 self-end w-[100px] text-center"
              >
                {v.msg}
              </div>
            ) : (
              <div
                key={`${v.msg}` + i}
                className="bg-gray-400 p-1 self-start w-[100px] text-center"
              >
                {v.msg}
              </div>
            );
          })}
        </ul>
      </div>

      <form
        action=""
        onSubmit={(e) => handleSubmit(e)}
        className="flex w-full gap-1"
      >
        <input
          className="bg-white w-[90%] p-2 rounded outline-none"
          type="text"
          value={sendMsg}
          onChange={(e) => setSendMsg(e.target.value)}
        />
        <button className="text-white bg-sky-600 px-4 py-2 rounded">
          send
        </button>
      </form>
    </div>
  );
}

export default App;
