import { useEffect } from "react"
import Header from "./Header"
import { Pagination, Table } from "antd"
import { getData } from "../Services/APICalls"
import { useState } from "react"
import { useStoreContext } from "../Context/storeContext"
import { styled } from "@mui/material"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import { useTranslation } from "react-i18next"
import axios from "axios"
import { DatePicker } from "antd"
import dayjs from "dayjs"
import { toast } from "react-toastify"

export const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #dadde9",
    },
}))

function OperationCommandsPage() {
    const { t } = useTranslation()
    const [list, setList] = useState()
    const { userData } = useStoreContext()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(2)
    const [limit, setLimit] = useState(10)

    const [select, setSelect] = useState(false)
    const monthFormat = "YYYY/MM"
    const [date, setDate] = useState(new Date())
    const [monthName, setMonthName] = useState(date.toLocaleString("default", { month: "long" }))

    useEffect(() => {
        const fetchData = async () => {
            let temp = await getData(
                `/orders/institution/${userData.currentInstitutions._id}?page=${page}&limit=${limit}`,
                localStorage.getItem("userToken")
            )
            setPageSize(temp.data.data.pages * 10)
            let temp2 = temp.data.data.orders.map((item) => {
                const date = new Date(item.startedAt)
                if (item.finishedAt == null) {
                    item.finishedAt = "لا يوجد"
                } else {
                    const date2 = new Date(item.finishedAt)
                    item.finishedAt = `${date2.getDate()}-${date2.getMonth() + 1}-${date2.getFullYear()}`
                }
                const month = date.getMonth() + 1
                const day = date.getDate()
                const year = date.getFullYear()
                return {
                    id: item.IDCode,
                    place: item.location,
                    state: item.status,
                    description: item.description,
                    endDate: item.finishedAt,
                    devices: item.devices.map((item) => item.IDCode).join(" - "),
                    startDate: `${day}-${month}-${year}`,
                }
            })
            setList(temp2)
        }
        fetchData()
    }, [page, limit])

    const toggleSelect = () => {
        setSelect(!select)
    }

    const onClickHandler = async () => {
        try {
            const response = await axios.get(
                `https://erpsystem.pildextech.cf/api/v1/orders/export/${userData.currentInstitutions._id}?month=${
                    date.getMonth() + 1
                }&year=${date.getFullYear()}`,
                {
                    responseType: "blob",
                }
            )
            const url = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
            )
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", "exported_data.xlsx")
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            toast.error("No file in this Month")
            // console.error("Error downloading CSV:", error)
        }
    }

    return (
        <div className="grow bg-[#F8F9FA]">
            <Header />
            <div className="bg-white m-2 lg:m-6 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-12">
                    <div className="flex items-center  gap-5 ">
                        <div
                            className="bg-[#ffffff]  border-2 p-2 rounded-lg flex justify-between items-center gap-2 cursor-pointer h-[44px] hover:bg-[#e6e6e6] transition-all"
                            onClick={onClickHandler}
                        >
                            <span>Download</span>
                            <i className="fa-solid fa-download   "></i>
                        </div>
                        <button className="relative flex justify-center items-center bg-white border focus:outline-none shadow text-grey-600 rounded-lg ">
                            <p className="px-4 py-3 text-sm" onClick={toggleSelect}>
                                {monthName}
                            </p>
                            <span className="border-l p-2 text-sm" onClick={toggleSelect}>
                                <i className="fa-solid fa-angle-down"></i>
                            </span>
                            <div
                                className={`absolute top-full min-w-full w-max bg-white shadow-md mt-1 rounded-lg z-[2] ${
                                    select ? "block" : "hidden"
                                }`}
                            >
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
                    <h2 className="text-right text-[#05004E] font-bold text-2xl">{t("operations")}</h2>
                </div>
                <Table dataSource={list} pagination={false}>
                    <Table.Column
                        title={t("edit_or_delete")}
                        dataIndex="action"
                        key="action"
                        render={() => (
                            <div className="flex justify-center gap-2">
                                <button>
                                    <i className="fa-solid fa-pen bg-[#0EB70B] text-white p-2 rounded-lg"></i>
                                </button>
                                <button>
                                    <i className="fa-solid fa-trash bg-[#CC0F1F] text-white p-2 rounded-lg"></i>
                                </button>
                            </div>
                        )}
                    />
                    <Table.Column title={t("description")} dataIndex="description" key="description" />
                    <Table.Column title={t("end_date")} dataIndex="endDate" key="endDate" />
                    <Table.Column title={t("start_date")} dataIndex="startDate" key="startDate" />
                    <Table.Column title={t("status")} dataIndex="state" key="state" />
                    <Table.Column title={t("location")} dataIndex="place" key="action" />
                    <Table.Column title={t("devices")} dataIndex="devices" key="devices" />
                    <Table.Column title="ID (Code)" dataIndex="id" key="id" />
                </Table>
                <div className="flex justify-center mt-12">
                    <Pagination
                        defaultCurrent={1}
                        showSizeChanger
                        onShowSizeChange={(e, value) => setLimit(value)}
                        total={pageSize}
                        onChange={(e) => setPage(e)}
                    />
                </div>
            </div>
        </div>
    )
}

export default OperationCommandsPage
