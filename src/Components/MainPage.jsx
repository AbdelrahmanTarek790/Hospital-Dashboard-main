import Header from "./Header";
import Assets from "./Assets";
import Charts from "./Charts";
import OperationCommands from "./OperationCommands";
import GoogleChart from "./GoogleChart";

function MainPage() {
  return (
    <div className="grow bg-[#F8F9FA]">
      <Header />
      <Assets />
      <Charts />
      <OperationCommands />
      {/* <GoogleChart></GoogleChart> */}
    </div>
  );
}

export default MainPage;
