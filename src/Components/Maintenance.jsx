import Header from "./Header";
import { useTranslation } from "react-i18next";
import { Table } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getData } from "../Services/APICalls";
import { useStoreContext } from "../Context/storeContext";

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

function Maintenance() {
  const { t } = useTranslation();
  const [select, setSelect] = useState(false);
  const [list, setList] = useState([]);
  const monthFormat = "YYYY/MM";
  const { userData } = useStoreContext();
  const [date, setDate] = useState(new Date());
  const [monthName, setMonthName] = useState(date.toLocaleString("default", { month: "long" }));

  const toggleSelect = () => {
    setSelect(!select);
  };
  useEffect(() => {
    const fetchData = async () => {
      let temp = await getData(`/maintenance/${userData.currentInstitutions._id}?month=${date.getMonth() + 1}&year=${date.getFullYear()}`, localStorage.getItem("userToken"));
      let temp2 = temp.data.data.maintenanceArray.map((item) => {
        let weekOne;
        let weekTwo;
        let weekThree;
        let weekFour;
        item.data.map((item) => {
          if (item.weekNumber === 1) weekOne = item.checked;
          if (item.weekNumber === 2) weekTwo = item.checked;
          if (item.weekNumber === 3) weekThree = item.checked;
          if (item.weekNumber === 4) weekFour = item.checked;
        });
        if (weekOne === undefined) weekOne = null;
        if (weekTwo === undefined) weekTwo = null;
        if (weekThree === undefined) weekThree = null;
        if (weekFour === undefined) weekFour = null;
        return {
          institutions: item.institutions,
          location: item.location,
          modelType: item.modelType,
          IDCode: item.modelType,
          weekOne: weekOne,
          weekTwo,
          weekThree,
          weekFour,
        };
      });
      setList(temp2);
    };

    fetchData();
  }, [date]);

  return (
    <div className="grow bg-[#F8F9FA]">
      <Header />
      <div className="bg-white m-2 lg:m-6 p-6 rounded-lg">
        <div className=" flex  justify-between items-start">
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
                  let data = dateString.split("/");
                  setDate(new Date(data[0], data[1], 0));
                  setMonthName(new Date(data[0], data[1], 0).toLocaleString("default", { month: "long" }));
                  toggleSelect();
                }}
                picker="month"
              />
            </div>
          </button>
          <div className="flex flex-row-reverse gap-2 items-center mb-6 pb-6 border-b-2">
            <i className="fa-solid fa-box text-2xl text-[#05004E]"></i>
            <h2 className="text-right text-[#05004E] font-bold text-2xl ">{t("preventive_maintenance")}</h2>
          </div>
        </div>
        <Table dataSource={list} pagination={false}>
          <Table.Column title={t("fourth_week")} dataIndex="weekFour" key="weekFour" render={(e) => <div className="flex justify-center gap-2">{e ? <i className="fa-solid fa-check text-[#2ebb2e] text-base"></i> : e === false ? <i className="fa-solid fa-xmark text-[#c42f2f] text-base"></i> : <i className="fa-solid fa-minus text-[#05004E] text-base"></i>}</div>} />
          <Table.Column title={t("third_week")} dataIndex="weekThree" key="weekThree" render={(e) => <div className="flex justify-center gap-2">{e ? <i className="fa-solid fa-check text-[#2ebb2e] text-base"></i> : e === false ? <i className="fa-solid fa-xmark text-[#c42f2f] text-base"></i> : <i className="fa-solid fa-minus text-[#05004E] text-base"></i>}</div>} />
          <Table.Column title={t("second_week")} dataIndex="weekTwo" key="weekTwo" render={(e) => <div className="flex justify-center gap-2">{e ? <i className="fa-solid fa-check text-[#2ebb2e] text-base"></i> : e === false ? <i className="fa-solid fa-xmark text-[#c42f2f] text-base"></i> : <i className="fa-solid fa-minus text-[#05004E] text-base"></i>}</div>} />
          <Table.Column title={t("first_week")} dataIndex="weekOne" key="weekOne" render={(e) => <div className="flex justify-center gap-2">{e ? <i className="fa-solid fa-check text-[#2ebb2e] text-base"></i> : e === false ? <i className="fa-solid fa-xmark text-[#c42f2f] text-base"></i> : <i className="fa-solid fa-minus text-[#05004E] text-base"></i>}</div>} />
          <Table.Column title={t("location")} dataIndex="location" key="location" />
          <Table.Column title={t("device")} dataIndex="modelType" key="modelType" />
          <Table.Column title={t("code")} dataIndex="IDCode" key="IDCode" />
        </Table>
      </div>
    </div>
  );
}

export default Maintenance;
