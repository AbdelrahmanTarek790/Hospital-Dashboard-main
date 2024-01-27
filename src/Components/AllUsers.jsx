import { useEffect, useState } from "react";
import Header from "./Header";
import { Table } from "antd";
import { getData } from "../Services/APICalls";
import { useTranslation } from "react-i18next";

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

function AllUsers() {
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getData("/users/all-users", localStorage.getItem("userToken")).then((res) => {
      let temp2 = res.data.data.map((item) => {
        return { name: item.name, email: item.email, role: item.role, institutions: item.institutions.map((item) => item.name).join(" - ") };
      });
      setUsers(temp2);
    });
  }, []);

  return (
    <div className="grow bg-[#F8F9FA]">
      <Header />
      <div className="bg-white m-6 p-6 rounded-lg">
        <div className="flex flex-row-reverse gap-2 items-center mb-6 pb-6 border-b-2">
          <i className="fa-solid fa-box text-2xl text-[#05004E]"></i>
          <h2 className="text-right text-[#05004E] font-bold text-2xl ">{t("users")}</h2>
        </div>
        <Table dataSource={users}>
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
          <Table.Column title={t("institutions")} dataIndex="institutions" key="institutions" />
          <Table.Column title={t("permissions")} dataIndex="role" key="role" />
          <Table.Column title={t("email")} dataIndex="email" key="email" />
          <Table.Column title={t("name")} dataIndex="name" key="name" />
        </Table>
      </div>
    </div>
  );
}

export default AllUsers;
