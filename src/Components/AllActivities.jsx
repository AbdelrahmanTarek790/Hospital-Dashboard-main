import { useEffect, useState } from "react"
import Header from "./Header"
import { Pagination, Table } from "antd"
import { getData } from "../Services/APICalls"
import { useStoreContext } from "../Context/storeContext"
import { useTranslation } from "react-i18next"

function AllActivities() {
    const { userData } = useStoreContext()
    const { t } = useTranslation()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState()
    const [limit, setLimit] = useState(10)

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await getData(`/history/${userData.currentInstitutions._id}?page=${page}&limit=${limit}`)
            setPageSize(res.data.pages * 10)
            let temp2 = res.data.histories.map((item) => {
                const date = new Date(item.createdAt)
                const month = date.getMonth() + 1
                const day = date.getDate()
                const year = date.getFullYear()
                return {
                    name: item.user.name,
                    role: item.user.role,
                    place: item.category === "Device" ? "اصل" : "امر تشغيل",
                    type: item.status === "Created" ? "اضافه" : item.status === "Deleted" ? "حذف" : "تعديل",
                    time: `${day}-${month}-${year}`,
                }
            })
            setData(temp2.reverse())
        }
        fetchData()
    }, [page, limit])

    return (
        <div className="grow bg-[#F8F9FA]">
            <Header />
            <div className="bg-white m-6 p-6 rounded-lg">
                <div className="flex flex-row-reverse gap-2 items-center mb-6 pb-6 border-b-2">
                    <i className="fa-solid fa-box text-2xl text-[#05004E]"></i>
                    <h2 className="text-right text-[#05004E] font-bold text-2xl">{t("activities")}</h2>
                </div>
                <Table dataSource={data} pagination={false}>
                    <Table.Column title={t("operation_date")} dataIndex="time" key="time" />
                    <Table.Column title={t("operation_type")} dataIndex="type" key="type" />
                    <Table.Column title={t("operation_place")} dataIndex="place" key="place" />
                    <Table.Column title={t("permissions")} dataIndex="role" key="role" />
                    <Table.Column title={t("name")} dataIndex="name" key="name" />
                </Table>
                <div className="flex justify-center mt-12">
                    <Pagination defaultCurrent={page} total={pageSize} onChange={(e) => setPage(e)} />
                </div>
            </div>
        </div>
    )
}

export default AllActivities
