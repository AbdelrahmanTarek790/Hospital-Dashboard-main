import { useEffect, useState } from "react";
import Header from "./Header";
import { Pagination, Table } from "antd";
import { getData, postData } from "../Services/APICalls";
import { useStoreContext } from "../Context/storeContext";
import { useTranslation } from "react-i18next";
import Modal from "@mui/material/Modal";
import { DatePicker } from "antd";
import { Radio } from "antd";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid black",
    borderRadius: "8px",
    padding: "6px",
    boxShadow: state.isFocused ? "0 0 0 2px #2868c7" : null,
    outline: "none",
    textAlign: "right",
    width: "200px",
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
  const [list2, setList2] = useState();
  const { userData } = useStoreContext();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deviceName, setDeviceName] = useState("");
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [checked, setChecked] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      let temp = await getData(`/devices/institution/${userData.currentInstitutions._id}?page=${page}&limit=${limit}`);
      setPageSize(temp.data.data.pages * 10);
      let temp2 = temp.data.data.devices.map((item) => {
        return { IDCode: item.IDCode, place: item.location, type: item.modelType, description: item.description, notes: item.notes, id: item._id };
      });
      setList2(temp2);
    };
    fetchData();
  }, [page, limit]);

  const monthFormat = "YYYY/M";
  const [select, setSelect] = useState(false);

  const toggleSelect = () => {
    setSelect(!select);
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleClick = (e) => {
    setOpen(true);
    console.log(e);
    setDeviceName(e.IDCode);
    setDeviceID(e.id);
  };
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("1");

  const selectChange = (e) => {
    setChecked(e.value);
  }

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const list = [
    { value: true, label: "تم الصيانة" },
    { value: false, label: "لم تتم الصيانة" },
  ];
  const [deviceID, setDeviceID] = useState();

  const sendData = async () => {
    
    if (year === undefined || month === undefined) {
      toast.error("يجب ادخال جميع البيانات");
      return;
    }
    if(checked === null){
      toast.error("يجب ادخال جميع البيانات");
      return;
    }
    setLoading(true);
    let date = year + "-" + month + "-" + value;
    let temp = await postData(`/maintenance/${userData.currentInstitutions._id}`, {deviceID, date, checked}, userData.token);
    console.log(temp);
    if(temp.status === 201){
      toast.success("تم اضافة الصيانة بنجاح");
      handleClose();
      setLoading(false);
      setDeviceID();
      setChecked(null);
      date = "";
    }else{
      toast.error("حدث خطأ ما");
      setLoading(false);
    }
  };

  return (
    <div className="grow bg-[#F8F9FA]">
      <Header />
      <div className="bg-white lg:m-6 p-6 rounded-lg">
        <h2 className="text-right text-[#05004E] font-bold text-2xl mb-12">{t("devices")}</h2>
        <Table dataSource={list2} pagination={false}>
          <Table.Column
            title={t("edit_or_delete_or_maintenance")}
            dataIndex="action"
            key="action"
            render={(_, record) => (
              <div className="flex justify-center gap-2">
                <button onClick={() => handleClick(record)}>
                  <i className="fa-solid fa-gear bg-[#1C48C2] text-white p-2 rounded-lg"></i>
                </button>
                <button>
                  <i className="fa-solid fa-pen bg-[#0EB70B] text-white p-2 rounded-lg"></i>
                </button>
                <button>
                  <i className="fa-solid fa-trash bg-[#CC0F1F] text-white p-2 rounded-lg"></i>
                </button>
              </div>
            )}
          />
          <Table.Column title={t("notes")} dataIndex="notes" key="notes" />
          <Table.Column title={t("image")} dataIndex="image" key="image" />
          <Table.Column title={t("description")} dataIndex="description" key="description" />
          <Table.Column title={t("type")} dataIndex="type" key="type" />
          <Table.Column title={t("location")} dataIndex="place" key="action" />
          <Table.Column title="ID (Code)" dataIndex="IDCode" key="IDCode" />
        </Table>
        <div className="flex justify-center mt-12">
          <Pagination defaultCurrent={1} showSizeChanger onShowSizeChange={(e, value) => setLimit(value)} total={pageSize} onChange={(e) => setPage(e)} />
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="bg-white p-3 rounded min-w-[250px]">
            <div className="flex justify-end mb-2">
              <i className="fa-solid fa-xmark text-2xl text-[#FF5656] cursor-pointer" onClick={() => handleClose()}></i>
            </div>
            <h3 className="text-center text-2xl mb-2">ادخل بيانات الصيانة</h3>
            <div className="flex flex-row-reverse items-center gap-2 mb-4">
              <p className="text-right">:اسم الاصل</p>
              <p>{deviceName}</p>
            </div>
            <div className="flex flex-col mb-4">
              <p className="text-right mb-2">:تاريخ الصيانة</p>
              <DatePicker
                format={monthFormat}
                onChange={(date, dateString) => {
                  let data = dateString.split("/");
                  setYear(data[0]);
                  setMonth(data[1]);
                  console.log(year);
                  console.log(month);
                  toggleSelect();
                }}
                picker="month"
              />
            </div>
            <div className="flex flex-col items-end mb-4">
              <p className="text-right mb-2">:حدد اسبوع الصيانة</p>
              <Radio.Group onChange={onChange} value={value} >
                <Radio value={"1"}>{t("first_week")}</Radio>
                <Radio value={"9"}>{t("second_week")}</Radio>
                <Radio value={"17"}>{t("third_week")}</Radio>
                <Radio value={"25"}>{t("fourth_week")}</Radio>
              </Radio.Group>
            </div>
            <div className="flex flex-col items-end mb-4">
              <p>الحالة</p>
              <Select
                styles={customStyles}
                options={list}
                onChange={(e) => selectChange(e)}
              />
            </div>
            <div className="flex justify-center">
              <button disabled={loading} onClick={sendData} className={loading ? "border-[2px] text-[#cbcfd7] border-[#f0f1f4] py-2 px-12 group rounded-lg" : "border-[2px] text-white hover:text-white bg-[#2B80FF] hover:bg-[#1C48C2]  duration-300 border-[#2B80FF] hover:border-[#1C48C2] py-2 px-12 group rounded-lg"}>
                {t("add")}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default OperationCommandsPage;
