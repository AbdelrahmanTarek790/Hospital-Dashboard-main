import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
ChartJS.register(ArcElement, Tooltip, Legend)
import { Doughnut } from "react-chartjs-2"
import { useTranslation } from "react-i18next"
import { getData } from "../Services/APICalls"
import { useStoreContext } from "../Context/storeContext"
import { useEffect, useState } from "react"
import { DatePicker } from "antd";
import dayjs from "dayjs";

function DoughnutChart() {
    const { t } = useTranslation()
    const monthFormat = "YYYY/MM"
    const [select, setSelect] = useState(false);
    const toggleSelect = () => {
        setSelect(!select)
    }
    const { userData } = useStoreContext()
    const [date, setDate] = useState(new Date())
    const [total, setTotal] = useState(0)
    const [done, setDone] = useState(0)
    const [pending, setPending] = useState(0)
    const [notDone, setNotDone] = useState(0)
    const [monthName, setMonthName] = useState(date.toLocaleString("default", { month: "long" }))
    const data = {
        labels: ["تم الصيانة", "في انتظار الصيانة", "الاجمالي", "لم يتم الصيانة"],
        datasets: [
            {
                label: "Poll",
                data: [done, pending, total, notDone],
                backgroundColor: ["#42CC7D", "#1C48C2", "#000000", "#FF0000"],
                borderColor: ["#42CC7D", "#1C48C2", "#000000", "#FF0000"],
            },
        ],
    }
    const options = {
        cutout: 80,
    }

    useEffect(() => {
        const fetchData = async () => {
            let temp = await getData(
                `/maintenance/${userData.currentInstitutions._id}?month=${date.getMonth() + 1}&year=${date.getFullYear()}`,
                localStorage.getItem("userToken")
            )
            setDone(temp.data.trueData * 1)
            setNotDone(temp.data.falseData * 1)
            setPending(temp.data.data.maintenanceArray.length * 4 - temp.data.trueData - temp.data.falseData)

            setTotal(temp.data.data.maintenanceArray.length * 4)
        }

        fetchData()
    }, [date])

    return (
        <div className="bg-white rounded-lg p-8 w-[98%] lg:w-[30%]">
            <div className="flex items-center justify-between mb-3">
            <button className="relative flex justify-center items-center bg-white border focus:outline-none shadow text-grey-600 rounded-lg ">
                    <p className="px-2 py-1 text-sm" onClick={toggleSelect}>
                        {monthName}
                    </p>
                    <span className="border-l p-2 text-sm" onClick={toggleSelect}>
                        <i className="fa-solid fa-angle-down"></i>
                    </span>
                    <div className={`absolute top-full min-w-full w-max bg-white shadow-md mt-1 rounded-lg z-[2] ${select ? "block" : "hidden"}`}>
                        <DatePicker
                            defaultValue={dayjs(`${date.getFullYear()}/${(date.getMonth()+1).toString().padStart(2, "0")}`, monthFormat)}
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
                <h4 className="text-right  font-bold ms-0 me-0">{t("preventive_maintenance")}</h4>
                
            </div>
            <Doughnut
                data={data}
                options={options}
                className="mb-3 w-[100%] sm:w-[50%] lg:w-[250px] lg:max-w-[300px] lg:max-h-[300px]  mx-auto 2xl:w-auto "
            />
            <div className="flex flex-col gap-3">
                <div className="flex flex-row-reverse justify-between items-center">
                    <div className="flex flex-row-reverse items-center gap-1">
                        <span className="block w-[15px] h-[15px] bg-black rounded-full"></span>
                        <p>الاجمالي</p>
                    </div>
                    <p>{total}</p>
                </div>
                <div className="flex flex-row-reverse justify-between items-center">
                    <div className="flex flex-row-reverse items-center gap-1">
                        <span className="block w-[15px] h-[15px] bg-[#42CC7D] rounded-full"></span>
                        <p>تم الصيانة</p>
                    </div>
                    <p>{done}</p>
                </div>
                <div className="flex flex-row-reverse justify-between items-center">
                    <div className="flex flex-row-reverse items-center gap-1">
                        <span className="block w-[15px] h-[15px] bg-[#1C48C2] rounded-full"></span>
                        <p>في انتظار الصيانة</p>
                    </div>
                    <p>{pending}</p>
                </div>
                <div className="flex flex-row-reverse justify-between items-center">
                    <div className="flex flex-row-reverse items-center gap-1">
                        <span className="block w-[15px] h-[15px] bg-[#FF0000] rounded-full"></span>
                        <p>لم يتم الصيانة</p>
                    </div>
                    <p>{notDone}</p>
                </div>
            </div>
        </div>
    )
}

export default DoughnutChart
