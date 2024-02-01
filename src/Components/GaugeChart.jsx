import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
ChartJS.register(ArcElement, Tooltip, Legend)
import { Doughnut } from "react-chartjs-2"

function DoughnutChart({ title }) {
    const data = {
        labels: ["الفعلي"],
        datasets: [
            {
                label: "",
                data: [17, 83],
                backgroundColor: ["#2B43FF", "#E9ECF1"],
                borderColor: ["#2B43FF", "#E9ECF1"],
                circumference: 180,
                rotation: 270,
            },
        ],
    }
    const options = {
        cutout: 80,
    }

    const textCenter = {
        id: "textCenter",
        beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data } = chart
            ctx.save()
            ctx.font = "bolder 30px sans-serif"
            ctx.fillStyle = "red"
            ctx.fillText("Text", chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y)
        },
    }

    return (
        <div className=" bg-white rounded-lg p-8 w-[98%] lg:w-[30%]">
            <div className="flex items-center justify-between ">
                <button className="flex items-center gap-2 border rounded-lg p-[6px] justify-center hover:bg-[#f0f0f0] transition-all">
                    <p className="text-right font-bold me-0 ms-0">تعديل</p> <i className="fa-solid fa-pen text-sm cursor-pointer"></i>
                </button>
                <h4 className="text-right mb-3 font-bold">{title}</h4>
            </div>

            <Doughnut
                data={data}
                options={options}
                plugins={textCenter}
                className="w-[100%] sm:w-[50%] lg:w-[250px] lg:max-w-[300px] lg:max-h-[300px]  mx-auto 2xl:w-auto "
            />
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
