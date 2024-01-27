import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { Doughnut } from "react-chartjs-2";

function DoughnutChart() {
  const data = {
    labels: ["تم الصيانة", "في انتظار الصيانة"],
    datasets: [
      {
        label: "Poll",
        data: [3, 6],
        backgroundColor: ["#42CC7D", "#1C48C2"],
        borderColor: ["#42CC7D", "#1C48C2"],
      },
    ],
  };
  const options = {
    cutout: 80,
  };

  return (
    <div className="bg-white rounded-lg p-8">
      <h4 className="text-right mb-3 font-bold">الصيانة الوقائية</h4>
      <Doughnut data={data} options={options} className="mb-3 w-[250px] 2xl:w-auto " />
      <div className="flex flex-col gap-3">
        <div className="flex flex-row-reverse justify-between items-center">
          <div className="flex flex-row-reverse items-center gap-1">
            <span className="block w-[15px] h-[15px] bg-black rounded-full"></span>
            <p>الاجمالي</p>
          </div>
          <p>400</p>
        </div>
        <div className="flex flex-row-reverse justify-between items-center">
          <div className="flex flex-row-reverse items-center gap-1">
            <span className="block w-[15px] h-[15px] bg-[#42CC7D] rounded-full"></span>
            <p>تم الصيانة</p>
          </div>
          <p>400</p>
        </div>
        <div className="flex flex-row-reverse justify-between items-center">
          <div className="flex flex-row-reverse items-center gap-1">
            <span className="block w-[15px] h-[15px] bg-[#1C48C2] rounded-full"></span>
            <p>في انتظار الصيانة</p>
          </div>
          <p>400</p>
        </div>
      </div>
    </div>
  );
}

export default DoughnutChart;
