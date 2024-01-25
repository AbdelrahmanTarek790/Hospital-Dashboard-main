import Header from "./Header";
import Assets from "./Assets";
import Charts from "./Charts";
import OperationCommands from "./OperationCommands";

function MainPage() {
  return (
    <div className="grow bg-[#F8F9FA]">
      <Header />
      <Assets />
      <Charts />
      <OperationCommands />
    </div>
  );
}

export default MainPage;
