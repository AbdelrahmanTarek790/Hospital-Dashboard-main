import { useState, useEffect } from "react"
import { getData } from "../Services/APICalls"
import { useStoreContext } from "../Context/storeContext"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import { DatePicker } from "antd"
import dayjs from "dayjs"
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

function SalesChart() {
    const [select, setSelect] = useState(false)
    const token = localStorage.getItem("userToken")
    const { userData } = useStoreContext()
    const monthFormat = "YYYY/MM"
    const [date, setDate] = useState(new Date(2024, 1, 0))
    const [monthName, setMonthName] = useState(date.toLocaleString("default", { month: "long" }))

    const monthDays = Array.from({ length: date.getDate() }, (_, i) => (i + 1).toString())

    const [chartData, setChartData] = useState({
        labels: monthDays,
        datasets: [
            {
                label: "Total",
                data: [],
                backgroundColor: "#3366CC",
                borderColor: "#3366CC",
                borderWidth: 1,
            },
            {
                label: "Finished",
                data: [],
                backgroundColor: "#42cc7d",
                borderColor: "#42cc7d",
                borderWidth: 1,
            },
        ],
    })

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
                suggestedMax: 6,
            },
        },
    }
    // userData.currentInstitutions._id

    useEffect(() => {
        const fetchData = async () => {
            let res = await getData(`/orders/date/${userData.currentInstitutions._id}?month=${date.getMonth() + 1}&year=${date.getFullYear()}`, token)

            const ordersByDay = res.data.data.ordersByDay
            const finishedData = Array.from({ length: date.getDate() }, (_, item) => (ordersByDay[item + 1] ? ordersByDay[item + 1].completed : 0))
            const totalData = Array.from({ length: date.getDate() }, (_, item) => (ordersByDay[item + 1] ? ordersByDay[item + 1].total : 0))

            setChartData({
                ...chartData,
                datasets: [
                    {
                        ...chartData.datasets[0],
                        data: totalData,
                    },
                    {
                        ...chartData.datasets[1],
                        data: finishedData,
                    },
                ],
            })
        }
        fetchData()
    }, [date])

    const toggleSelect = () => {
        setSelect(!select)
    }

    return (
        <div className="container">
            <div className="flex flex-row-reverse mb-6 items-center justify-between">
                <h3 className="text-right text-[#05004E] font-semibold text-lg">مؤشر الاداء خلال الشهر</h3>
                <button className="relative flex justify-center items-center bg-white border focus:outline-none shadow text-grey-600 rounded-lg ">
                    <p className="px-4 py-3 text-sm" onClick={toggleSelect}>
                        {monthName}
                    </p>
                    <span className="border-l p-2 text-sm" onClick={toggleSelect}>
                        <i className="fa-solid fa-angle-down"></i>
                    </span>
                    <div className={`absolute top-full min-w-full w-max bg-white shadow-md mt-1 rounded-lg z-[2] ${select ? "block" : "hidden"}`}>
                        <DatePicker
                            defaultValue={dayjs(`${date.getFullYear()}/${date.getMonth().toString().padStart(2, "0")}`, monthFormat)}
                            format={monthFormat}
                            onChange={(date, dateString) => {
                                let data = dateString.split("/")
                                setDate(new Date(data[0], data[1], 0))
                                setMonthName(new Date(data[0], data[1], 0).toLocaleString("default", { month: "long" }))
                                toggleSelect()
                            }}
                            picker="month"
                        />
                    </div>
                </button>
            </div>
            <Bar data={chartData} options={options} />
        </div>
    )
}

export default SalesChart
