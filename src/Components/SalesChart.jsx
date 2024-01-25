import { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function SalesChart() {
  const [select, setSelect] = useState(false);

  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "26", "27", "28", "29", "30"],
    datasets: [
      {
        label: "Finished",
        data: [3, 6, 9, 12, 20, 15],
        backgroundColor: "#3366CC",
        borderColor: "#3366CC",
        borderWidth: 1,
      },
      {
        label: "Total",
        data: [3, 6, 9, 12, 20, 15],
        backgroundColor: "#CDD5EB",
        borderColor: "#CDD5EB",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category", // Use 'category' instead of 'CategoryScale'
        title: {
          display: true,
          text: "ايام الشهر",
        },
      },
      y: {
        title: {
          display: true,
          text: "اوامر التشغيل",
        },
      },
    },
  };

  const toggleSelect = () => {
    setSelect(!select);
  };

  return (
    <div className="container">
      <div className="flex flex-row-reverse mb-6 items-center justify-between">
        <h3 className="text-right text-[#05004E] font-semibold text-lg">مؤشر الاداء خلال الشهر</h3>
        <button className="relative flex justify-center items-center bg-white border focus:outline-none shadow text-grey-600 rounded-lg ">
          <p className="px-4 py-3 text-sm" onClick={toggleSelect}>
            شهري
          </p>
          <span className="border-l p-2 text-sm" onClick={toggleSelect}>
            <i className="fa-solid fa-angle-down"></i>
          </span>
          <div className={`absolute top-full min-w-full w-max bg-white shadow-md mt-1 rounded-lg z-[2] ${select ? "block" : "hidden"}`}>
            <ul className="text-right border rounded-lg">
              <li className="px-4 py-3 hover:bg-gray-100 border-b text-center ">شهري</li>
            </ul>
          </div>
        </button>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default SalesChart;
