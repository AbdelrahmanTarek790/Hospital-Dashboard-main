import { useEffect, useState } from "react";
import Header from "./Header";
import { Table } from "antd";
import { getData } from "../Services/APICalls";

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
  { title: "المؤسسات", dataIndex: "institutions", key: "institutions" },
  { title: "الصلاحية", dataIndex: "role", key: "role" },
  { title: "البريد الالكتروني", dataIndex: "email", key: "email" },
  { title: "الاسم", dataIndex: "name", key: "age" },
];

const data = [
  { name: "احمد فريد", email: "ahmedfaried@gmail.com", role: "Admin", institutions: "رأس سدر" },
  { name: "احمد فريد", email: "ahmedfaried@gmail.com", role: "Admin", institutions: "رأس سدر" },
];



function AllUsers() {
  const [users, setUsers] = useState([])
  
  useEffect( () => {
    getData("/users/all-users",localStorage.getItem("userToken")).then(res => {

      let temp2 = res.data.data.map((item) => {
        return { name: item.name, email: item.email, role: item.role, institutions: item.institutions.map((item) => item.name).join(" - ") }
    })
      setUsers(temp2)

    })
  }, [])

  return (
    <div className="grow bg-[#F8F9FA]">
      <Header />
      <div className="bg-white m-6 p-6 rounded-lg">
        <div className="flex flex-row-reverse gap-2 items-center mb-6 pb-6 border-b-2">
          <i className="fa-solid fa-box text-2xl text-[#05004E]"></i>
          <h2 className="text-right text-[#05004E] font-bold text-2xl ">جدول المستخدمين</h2>
        </div>
        <Table columns={columns} dataSource={users} pagination={false} />
      </div>
    </div>
  );
}

export default AllUsers;
