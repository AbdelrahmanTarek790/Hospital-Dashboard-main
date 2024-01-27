import { useEffect, useState } from "react"
import Header from "./Header"
import { Table } from "antd"
import { getData } from "../Services/APICalls"
import { useStoreContext } from "../Context/storeContext"

const columns = [
    { title: "وقت العملية", dataIndex: "time", key: "time" },
    { title: "نوع العملية", dataIndex: "type", key: "type" },
    { title: "مكان العملية", dataIndex: "place", key: "place" },
    { title: "الصلاحية", dataIndex: "role", key: "role" },
    { title: "الاسم", dataIndex: "name", key: "name" },
]

// const data = [
//   { name: "احمد فريد", place: "اصول", role: "Admin", type: "اضافة اصل", time: "24/1/2024"},
//   { name: "احمد فريد", place: "اصول", role: "Admin", type: "اضافة اصل", time: "24/1/2024"},
// ];

function AllActivities() {
    const { userData } = useStoreContext()

    const [data, setData] = useState([])
    useEffect(() => {
        getData(`/history/${userData.currentInstitutions._id}`).then((res) => {
            console.log(res.data.histories)
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
            // setData(res.data);
        })
    }, [])

    return (
        <div className="grow bg-[#F8F9FA]">
            <Header />
            <div className="bg-white m-6 p-6 rounded-lg">
                <div className="flex flex-row-reverse gap-2 items-center mb-6 pb-6 border-b-2">
                    <i className="fa-solid fa-box text-2xl text-[#05004E]"></i>
                    <h2 className="text-right text-[#05004E] font-bold text-2xl ">جدول الانشطة</h2>
                </div>
                <Table columns={columns} dataSource={data} pagination={false} />
            </div>
        </div>
    )
}

export default AllActivities
