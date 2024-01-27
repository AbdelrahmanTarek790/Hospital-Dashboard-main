import { useEffect}  from "react"
import React from "react"
import Header from "./Header"
import { Pagination, Table } from "antd"
import { getData } from "../Services/APICalls"
import { useState } from "react"
import { useStoreContext } from "../Context/storeContext"
import { Button, Typography, styled } from "@mui/material"
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

const columns = [
    {
        title: "الحذف او التعديل",
        key: "action",
        render: () => (
            <div className="flex justify-center gap-2">
                <button>
                    <i className="fa-solid fa-pen bg-[#0EB70B] text-white p-2 rounded-lg"></i>
                </button>
                <button>
                    <i className="fa-solid fa-trash bg-[#CC0F1F] text-white p-2 rounded-lg"></i>
                </button>
            </div>
        ),
    },
    {
        title: "الوصف",
        dataIndex: "description",
        key: "description",
        render: (description) => (
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <p className="text-base font-semibold">{description}</p>
                    </React.Fragment>
                }
            >
                <i className="fa-solid fa-circle-info text-[#3268FF] text-xl"></i>
            </HtmlTooltip>
        ),
    },
    { title: "تاريخ الانتهاء", dataIndex: "endDate", key: "endDate" },
    { title: "تاريخ البدأ", dataIndex: "startDate", key: "startDate" },
    { title: "الحالة", dataIndex: "state", key: "state" },
    { title: "المكان في المستشفى", dataIndex: "place", key: "place" },
    {
        title: "الاصول",
        dataIndex: "devices",
        key: "devices",
        render: (e) => (
            <div className="w-[100px]">
                {e.split(" - ").map((item, key) => (
                    <div key={key}>{item}</div>
                ))}
            </div>
        ),
    },
    { title: "ID (Code)", dataIndex: "id", key: "id" },
]

function OperationCommandsPage() {
    const [list, setList] = useState()
    const { userData } = useStoreContext()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(2)
    const [limit, setLimit] = useState(10)

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

    return (
        <div className="grow bg-[#F8F9FA]">
            <Header />
            <div className="bg-white m-2 lg:m-6 p-6 rounded-lg">
                <div className="flex flex-row-reverse gap-2 w-[300px] items-center ml-auto bg-[#ECECEC] py-3 px-3 rounded-xl mb-12">
                    <i className="fa-solid fa-magnifying-glass text-[#3268FF]"></i>
                    <input type="text" className="bg-[#ECECEC] w-full focus:outline-none text-right text-[#3268FF]" placeholder="...البحث هنا" />
                </div>
                <h2 className="text-right text-[#05004E] font-bold text-2xl mb-12">اوامر التشغيل</h2>
                <Table columns={columns} dataSource={list} pagination={false}></Table>
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
