import { useEffect, useState } from "react";
import Header from "./Header";
import { Pagination, Table } from "antd";
import { getData, postData, updateData, deleteData } from "../Services/APICalls";
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
  const token = localStorage.getItem("userToken");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deviceName, setDeviceName] = useState("");
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [checked, setChecked] = useState(null);
  const [select, setSelect] = useState(false);
  const [deviceID, setDeviceID] = useState("");
  const [IDCode, setIDCode] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [modelType, setModelType] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("1");

  const monthFormat = "YYYY/M";
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const handleClose2 = () => setOpen2(false);
  const [open3, setOpen3] = useState(false);
  const handleClose3 = () => setOpen3(false);

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

  
  const onChangeSearch = async (e) => {
    let temp = await getData(`/devices/institution/${userData.currentInstitutions._id}?page=${page}&limit=${limit}&search=${e}`, localStorage.getItem("userToken"))
    setPageSize(temp.data.data.pages * 10);
      let temp2 = temp.data.data.devices.map((item) => {
        return { IDCode: item.IDCode, place: item.location, type: item.modelType, description: item.description, notes: item.notes, id: item._id };
      });
      setList2(temp2);
  
  };

  const toggleSelect = () => {
    setSelect(!select);
  };

  const handleClick = (e) => {
    setOpen(true);
    setDeviceName(e.IDCode);
    setDeviceID(e.id);
  };

  const selectChange = (e) => {
    setChecked(e.value);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const list = [
    { value: true, label: "تم الصيانة" },
    { value: false, label: "لم تتم الصيانة" },
  ];

  const sendData = async () => {
    if (year === undefined || month === undefined) {
      toast.error("يجب ادخال جميع البيانات");
      return;
    }
    if (checked === null) {
      toast.error("يجب ادخال جميع البيانات");
      return;
    }
    setLoading(true);
    let date = year + "-" + month + "-" + value;
    let temp = await postData(`/maintenance/${userData.currentInstitutions._id}`, { deviceID, date, checked }, token);
    if (temp.status === 201) {
      toast.success("تم اضافة الصيانة بنجاح");
      handleClose();
      setLoading(false);
      setDeviceID();
      setChecked(null);
      date = "";
    } else {
      toast.error("حدث خطأ ما");
      setLoading(false);
    }
  };

  const handleEdit = (e) => {
    setOpen2(true);
    setDeviceID(e.id);
    setIDCode(e.IDCode);
    setLocation(e.place);
    setModelType(e.type);
    setDescription(e.description);
    if (e.notes === undefined) {
      setNotes("");
    } else {
      setNotes(e.notes);
    }
  };

  const editDevice = async () => {
    if (IDCode === "" || location === "" || modelType === "" || description === "" || notes === "") {
      toast.error("يجب ادخال جميع البيانات");
      return;
    }
    let temp = await updateData(`/devices/${deviceID}`, { IDCode, location, modelType, description, notes }, token);
    if (temp.status === 200) {
      window.location.reload();
      handleClose2();
    } else {
      toast.error("حدث خطأ ما");
    }
  };

  const handleDelete = async (e) => {
    setOpen3(true);
    setDeviceID(e.id);
  };

  const deleteDevice = async () => {
    let temp = await deleteData(`/devices/${deviceID}`, token);
    if (temp.status === 200) {
      window.location.reload();
      handleClose3();
    } else {
      toast.error("حدث خطأ ما");
    }
  };

  return (
    <div className="grow bg-[#F8F9FA]">
      <Header />
      <div className="bg-white lg:m-6 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-12">
          <div className="bg-[#f8f9fa] py-4 px-3 min-w-[250px] flex items-center rounded-xl">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input onChange={(e) => onChangeSearch(e.target.value)} className="bg-[#f8f9fa] focus:outline-none pl-2" type="text" />
          </div>
          <h2 className="text-right text-[#05004E] font-bold text-2xl ">{t("devices")}</h2>
        </div>

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
                <button onClick={() => handleEdit(record)}>
                  <i className="fa-solid fa-pen bg-[#0EB70B] text-white p-2 rounded-lg"></i>
                </button>
                <button onClick={() => handleDelete(record)}>
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
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={"1"}>{t("first_week")}</Radio>
                <Radio value={"9"}>{t("second_week")}</Radio>
                <Radio value={"17"}>{t("third_week")}</Radio>
                <Radio value={"25"}>{t("fourth_week")}</Radio>
              </Radio.Group>
            </div>
            <div className="flex flex-col items-end mb-4">
              <p>الحالة</p>
              <Select styles={customStyles} options={list} onChange={(e) => selectChange(e)} />
            </div>
            <div className="flex justify-center">
              <button disabled={loading} onClick={sendData} className={loading ? "border-[2px] text-[#cbcfd7] border-[#f0f1f4] py-2 px-12 group rounded-lg" : "border-[2px] text-white hover:text-white bg-[#2B80FF] hover:bg-[#1C48C2]  duration-300 border-[#2B80FF] hover:border-[#1C48C2] py-2 px-12 group rounded-lg"}>
                {t("add")}
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
            <h3 className="text-center text-2xl mb-2">تعديل بيانات الاصل</h3>
            <div className="mb-3">
              <p className="text-right mb-2">ID (CODE)</p>
              <input onChange={(e) => setIDCode(e.target.value)} value={IDCode} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="text" />
            </div>
            <div className="mb-3">
              <p className="text-right mb-2">{t("location")}</p>
              <input onChange={(e) => setLocation(e.target.value)} value={location} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="text" />
            </div>
            <div className="mb-3">
              <p className="text-right mb-2">{t("type")}</p>
              <input onChange={(e) => setModelType(e.target.value)} value={modelType} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="text" />
            </div>
            <div className="mb-3">
              <p className="text-right mb-2">{t("description")}</p>
              <input onChange={(e) => setDescription(e.target.value)} value={description} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="text" />
            </div>
            <div className="mb-3">
              <p className="text-right mb-2">{t("notes")}</p>
              <input onChange={(e) => setNotes(e.target.value)} value={notes} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="text" />
            </div>
            <div className="mb-3">
              <p className="text-right mb-2">{t("image")}</p>
              <input className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="file" />
            </div>
            <div className="flex justify-center">
              <button disabled={loading} onClick={editDevice} className={loading ? "border-[2px] text-[#cbcfd7] border-[#f0f1f4] py-2 px-12 group rounded-lg" : "border-[2px] text-white hover:text-white bg-[#2B80FF] hover:bg-[#1C48C2]  duration-300 border-[#2B80FF] hover:border-[#1C48C2] py-2 px-12 group rounded-lg"}>
                {t("edit_device_info")}
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal open={open3} onClose={handleClose3}>
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="p-4 bg-white rounded min-w-[250px] lg:min-w-[450px]">
            <div className="flex justify-end mb-2">
              <i className="fa-solid fa-xmark text-2xl text-[#FF5656] cursor-pointer" onClick={() => handleClose3()}></i>
            </div>
            <h3 className="text-center text-2xl mb-3">{t("are_you_sure2")}</h3>
            <div className="flex justify-center">
              <button onClick={deleteDevice} className="flex items-center space-x-2 border-[2px] hover:bg-[#FF5656] duration-300 border-[#FF5656] p-3 group rounded-lg">
                <p className="text-[#737791] group-hover:text-white duration-300 hidden lg:block">{t("delete_device")}</p>
                <i className="fa-solid fa-trash text-[#FF5656] group-hover:text-white duration-300"></i>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default OperationCommandsPage;
