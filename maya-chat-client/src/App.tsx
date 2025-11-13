import ChataBox from "./components/ChataBox";
import Header from "./components/Header";
import PanenList from "./components/PanenList";
import SendMsgBox from "./components/SendMsgBox";

function App() {
  return (
    <>
      <Header />
      <div className="h-[calc(100vh-60px)] grid grid-cols-[30%_70%]">
        <div className=" bg-gray-700 h-full">
          <PanenList />
        </div>
        <div className="flex flex-col border-l-2 border-gray-700">
          <ChataBox />
          <SendMsgBox />
        </div>
      </div>
    </>
  );
}

export default App;
