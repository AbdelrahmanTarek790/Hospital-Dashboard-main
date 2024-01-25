import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { Doughnut } from "react-chartjs-2";


function DoughnutChart({title}) {
  const data = {
    labels: ["الفعلي"],
    datasets: [{
      label: "",
      data: [17,83],
      backgroundColor: ["#2B43FF", "#E9ECF1"],
      borderColor: ["#2B43FF", "#E9ECF1"],
      circumference: 180,
      rotation: 270
    },
  ]
  }
  const options = {
    cutout: 80
  }

  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const {ctx , data} = chart;
      ctx.save();
      ctx.font = "bolder 30px sans-serif";
      ctx.fillStyle = "red";
      ctx.fillText("Text", chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
    }
  }

  return (
    <div className=" bg-white rounded-lg p-8">
      <h4 className="text-right mb-3 font-bold">{title}</h4>
      <Doughnut data={data} options={options} plugins={textCenter} />
      <div className="flex flex-row-reverse justify-between">
        <div className="text-center">
          <h4 className="font-bold mb-1">المستهدف</h4>
          <span className="text-[#6174A5] font-semibold text-lg">40%</span>
        </div>
        <div className="text-center">
          <h4 className="font-bold mb-1">الفعلي</h4>
          <span className="text-[#6174A5] font-semibold text-lg">40%</span>
        </div>
        <div className="text-center">
          <h4 className="font-bold mb-1">التباين</h4>
          <span className="text-[#6174A5] font-semibold text-lg">40%</span>
        </div>
      </div>
    </div>
  )
}

export default DoughnutChart