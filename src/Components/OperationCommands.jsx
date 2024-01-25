import SalesChart from "./SalesChart";

function OperationCommands() {
  return (
    <div className="xl:flex gap-6 items-center p-6 bg-white rounded-lg mb-6 mx-2 lg:mx-6">
      <div className="grow flex flex-col items-between">
        <SalesChart />
      </div>
    </div>
  );
}

export default OperationCommands;
