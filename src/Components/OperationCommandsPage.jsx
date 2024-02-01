import { useEffect } from "react";
import Header from "./Header";
import { Pagination, Table } from "antd";
import { getData, deleteData, updateData } from "../Services/APICalls";
import { useState } from "react";
import { useStoreContext } from "../Context/storeContext";
import { styled } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Select from "react-select";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const stats = [
  { value: "pending", label: "Pending" },
  { value: "inprogress", label: "Inprogress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid black",
    borderRadius: "8px",
    padding: "6px",
    boxShadow: state.isFocused ? "0 0 0 2px #2868c7" : null,
    outline: "none",
    textAlign: "right",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#2868c7" : null,
    color: state.isSelected ? "#fff" : null,
    textAlign: "right",
  }),
};

function OperationCommandsPage() {
  const { t } = useTranslation();
  const [list, setList] = useState();
  const { userData } = useStoreContext();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [limit, setLimit] = useState(10);
  const [select, setSelect] = useState(false);
  const monthFormat = "YYYY/MM";
  const [date, setDate] = useState(new Date());
  const [monthName, setMonthName] = useState(date.toLocaleString("default", { month: "long" }));
  const token = localStorage.getItem("userToken");
  const [devicesOptions, setDevicesOptions] = useState([]);
  const [operationID, setOperationID] = useState("");
  const [IDCode, setIDCode] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [startedAt, setStartedAt] = useState("");
  const [finishedAt, setFinishedAt] = useState("");
  const [devices, setDevices] = useState(null);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(`/devices/institution/${userData.currentInstitutions._id}`, token);
      res.data.data.devices = res.data.data.devices.map((item) => {
        return { ...item, label: item.IDCode, value: item._id };
      });
      setDevicesOptions(res.data.data.devices);
    };

    fetchData();
  }, []);
  const setDataforTable = (temp)=>{
    setPageSize(temp.data.data.pages * 10);
    let temp2 = temp.data.data.orders.map((item) => {
      const date = new Date(item.startedAt);
      if (item.finishedAt == null) {
        item.finishedAt = "لا يوجد";
      } else {
        const date2 = new Date(item.finishedAt);
        item.finishedAt = `${date2.getDate()}-${date2.getMonth() + 1}-${date2.getFullYear()}`;
      }
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return {
        operationID: item._id,
        id: item.IDCode,
        place: item.location,
        state: item.status,
        description: item.description,
        endDate: item.finishedAt,
        devices: item.devices ? item.devices.map((item) => item.IDCode).join(" - ") : "لا يوجد",
        startDate: `${day}-${month}-${year}`,
      };
    });
    setList(temp2);
  }

  useEffect(() => {
    const fetchData = async () => {
      let temp = await getData(`/orders/institution/${userData.currentInstitutions._id}?page=${page}&limit=${limit}`, localStorage.getItem("userToken"));
      setDataforTable(temp)
    };
    fetchData();
  }, [page, limit]);

  const onChangeSearch = async (e) => {
    

    let temp = await getData(`/orders/institution/${userData.currentInstitutions._id}?page=${page}&limit=${limit}&search=${e}`, localStorage.getItem("userToken"))
    setDataforTable(temp)
  
  };

  const toggleSelect = () => {
    setSelect(!select);
  };

  const onClickHandler = async () => {
    try {
      const response = await axios.get(`https://erpsystem.pildextech.cf/api/v1/orders/export/${userData.currentInstitutions._id}?month=${date.getMonth() + 1}&year=${date.getFullYear()}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "exported_data.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("No file in this Month");
    }
  };

  const deleteHandler = (record) => {
    console.log(record);
    setOpen2(true);
    setOperationID(record.operationID);
  };

  const deleteOperation = async () => {
    setLoading(true);
    let temp = await deleteData(`/orders/${operationID}`, localStorage.getItem("userToken"));
    console.log(temp);
    if (temp.status === 204) {
      toast.success("Deleted Successfully");
      setOpen2(false);
      window.location.reload();
    } else {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  const editHandler = (record) => {
    console.log(record);
    setOpen(true);
    setOperationID(record.operationID);
    setIDCode(record.id);
    setLocation(record.place);
    setDescription(record.description);
  };

  const editOperation = async () => {

    if (IDCode === "") {
      toast.error("ادخل رمز امر التشغيل");
      return;
    }
    if (location === "") {
      toast.error("ادخل المكان في المنشأة");
      return;
    }
    if (startedAt === "") {
      toast.error("ادخل تاريخ البدأ");
      return;
    }
    if (status === "") {
      toast.error("ادخل حالة الامر");
      return;
    }
    if (description === "") {
      toast.error("ادخل الوصف");
      return;
    }
    setLoading(true);
    toast.info("جاري تعديل الامر");
    let temp = await updateData(`/orders/${operationID}`, { description, status, devices, location, startedAt, IDCode, finishedAt }, token);
    console.log(temp);
    if (temp.status === 200) {
      toast.success("تم تعديل الامر بنجاح");
      setOpen(false);
      window.location.reload();
      setLoading(false);
    } else {
      toast.error("حدث خطأ ما");
      setLoading(false);
    }
  };

  return (
    <div className="grow bg-[#F8F9FA]">
      <Header />
      <div className="bg-white m-2 lg:m-6 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center  gap-5 ">
            <div className="bg-[#ffffff]  border-2 p-2 rounded-lg flex justify-between items-center gap-2 cursor-pointer h-[44px] hover:bg-[#e6e6e6] transition-all" onClick={onClickHandler}>
              <span>Download</span>
              <i className="fa-solid fa-download"></i>
            </div>
            <button className="relative flex justify-center items-center bg-white border focus:outline-none shadow text-grey-600 rounded-lg ">
              <p className="px-4 py-3 text-sm" onClick={toggleSelect}>
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
                    let data = dateString.split("/");
                    setDate(new Date(data[0], data[1], 0));
                    setMonthName(new Date(data[0], data[1], 0).toLocaleString("default", { month: "long" }));
                    toggleSelect();
                  }}
                  picker="month"
                />
              </div>
            </button>
            <div className="bg-[#f8f9fa] py-4 px-3 min-w-[250px] flex items-center rounded-xl">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input onChange={(e) => onChangeSearch(e.target.value)} className="bg-[#f8f9fa] focus:outline-none pl-2" type="text" />
            </div>
          </div>

          <h2 className="text-right text-[#05004E] font-bold text-2xl">{t("operations")}</h2>
        </div>
        <Table dataSource={list} pagination={false}>
          <Table.Column
            title={t("edit_or_delete")}
            dataIndex="action"
            key="action"
            render={(_, record) => (
              <div className="flex justify-center gap-2">
                <button onClick={() => editHandler(record)}>
                  <i className="fa-solid fa-pen bg-[#0EB70B] text-white p-2 rounded-lg"></i>
                </button>
                <button onClick={() => deleteHandler(record)}>
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
          <Pagination defaultCurrent={1} showSizeChanger onShowSizeChange={(e, value) => setLimit(value)} total={pageSize} onChange={(e) => setPage(e)} />
        </div>
        <Modal open={open} onClose={handleClose}>
          <div className="w-screen h-screen flex justify-center items-center">
            <div className="p-4 bg-white rounded min-w-[250px] lg:min-w-[450px]">
              <div className="flex justify-end mb-2">
                <i className="fa-solid fa-xmark text-2xl text-[#FF5656] cursor-pointer" onClick={() => handleClose()}></i>
              </div>
              <h3 className="text-center text-2xl mb-3">{t("edit_operation")}</h3>
              <div className="mb-3">
                <p className="text-right mb-2">ID (Code)</p>
                <input value={IDCode} onChange={(e) => setIDCode(e.target.value)} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="text" />
              </div>
              <div className="mb-3">
                <p className="text-right mb-2">{t("devices")}</p>
                <Select
                  styles={customStyles}
                  options={devicesOptions}
                  isMulti
                  onChange={(e) => {
                    setDevices(e.map((item) => item._id));
                  }}
                />
              </div>
              <div className="mb-3">
                <p className="text-right mb-2">{t("description")}</p>
                <input value={description} onChange={(e) => setDescription(e.target.value)} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="text" />
              </div>
              <div className="mb-3">
                <p className="text-right mb-2">{t("location")}</p>
                <input value={location} onChange={(e) => setLocation(e.target.value)} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="text" />
              </div>
              <div className="mb-3">
                <p className="text-right mb-2">{t("status")}</p>
                <Select
                  styles={customStyles}
                  options={stats}
                  onChange={(e) => {
                    setStatus(e.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <p className="text-right mb-2">{t("start_date")}</p>
                <input value={startedAt} onChange={(e) => setStartedAt(e.target.value)} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="date" />
              </div>
              <div className="mb-3">
                <p className="text-right mb-2">{t("end_date")}</p>
                <input value={finishedAt} onChange={(e) => setFinishedAt(e.target.value)} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="date" />
              </div>
              <div className="flex justify-center">
                <button onClick={editOperation} className={loading ? "border-[2px] text-[#cbcfd7] border-[#f0f1f4] py-2 px-12 group rounded-lg" : "border-[2px] text-white hover:text-white bg-[#2B80FF] hover:bg-[#1C48C2]  duration-300 border-[#2B80FF] hover:border-[#1C48C2] py-2 px-12 group rounded-lg"}>
                  {t("edit_operation")}
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <Modal open={open2} onClose={handleClose2}>
          <div className="w-screen h-screen flex justify-center items-center">
            <div className="p-4 bg-white rounded min-w-[250px] lg:min-w-[450px]">
              <div className="flex justify-end mb-2">
                <i className="fa-solid fa-xmark text-2xl text-[#FF5656] cursor-pointer" onClick={() => handleClose2()}></i>
              </div>
              <h3 className="text-center text-2xl mb-3">{t("are_you_sure3")}</h3>
              <div className="flex justify-center">
                <button onClick={deleteOperation} className="flex items-center space-x-2 border-[2px] hover:bg-[#FF5656] duration-300 border-[#FF5656] p-3 group rounded-lg">
                  <p className="text-[#737791] group-hover:text-white duration-300 hidden lg:block">{t("delete_operation")}</p>
                  <i className="fa-solid fa-trash text-[#FF5656] group-hover:text-white duration-300"></i>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default OperationCommandsPage;
