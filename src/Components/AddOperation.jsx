import { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { addOperation, getData } from "../Services/APICalls";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useStoreContext } from "../Context/storeContext";

import { useTranslation } from "react-i18next";
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
const stats = [
  { value: "pending", label: "Pending" },
  { value: "inprogress", label: "Inprogress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

function AddOperation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  const [IDCode, setIDCode] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [startedAt, setStartedAt] = useState("");
  const [finishedAt, setFinishedAt] = useState("");
  const [devices, setDevices] = useState(null);
  const [devicesOptions, setDevicesOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const {userData} =useStoreContext()

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

  const sendData = async () => {
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
    if (devices === null) {
      toast.error("ادخل الاصل");
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
    toast.info("جاري اضافة الامر");
    let temp = await addOperation(token, { institutions: userData.currentInstitutions._id, description, status, devices, location, startedAt, IDCode, finishedAt });
    console.log(temp);
    if (temp.status === 201) {
      toast.success("تم اضافة الامر بنجاح");
      navigate("/operations");
      setLoading(false);
    } else {
      toast.error("حدث خطأ ما");
      setLoading(false);
    }
  };

  return (
    <div className="grow bg-[#F8F9FA]">
      <Header />
      <div className="bg-white m-6 p-6 rounded-lg">
        <div className="flex flex-row-reverse gap-2 items-center mb-6 pb-6 border-b-2">
          <i className="fa-solid fa-box text-2xl text-[#05004E]"></i>
          <h2 className="text-right text-[#05004E] font-bold text-2xl ">{t("add_operation")}</h2>
        </div>
        <div className="flex flex-col gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">ID (Code)</p>
            <input onChange={(e) => setIDCode(e.target.value)} className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">{t("location")}</p>
            <input onChange={(e) => setLocation(e.target.value)} className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">{t("start_date")}</p>
            <input onChange={(e) => setStartedAt(e.target.value)} className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="date" />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">{t("end_date")}</p>
            <input onChange={(e) => setFinishedAt(e.target.value)} className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="date" />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">{t("devices")}</p>
            <Select
              styles={customStyles}
              options={devicesOptions}
              onChange={(e) => {
                setDevices(e.map((item) => item._id));
              }}
              isMulti
              placeholder="Select multiple options"
            />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">{t("status")}</p>
            <Select
              styles={customStyles}
              options={stats}
              onChange={(e) => {
                setStatus(e.value);
              }}
              placeholder="Select multiple options"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 md:items-center md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">{t("description")}</p>
            <textarea onChange={(e) => setDescription(e.target.value)} className="focus:outline-none border w-[98%] h-full block ml-auto border-black p-3 rounded-lg text-right" name="" id=""></textarea>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-12 mb-6">
          <button onClick={sendData} disabled={loading} className={loading ? "border-[2px] text-[#cbcfd7] border-[#f0f1f4] py-2 px-12 group rounded-lg" : "border-[2px] text-white hover:text-white bg-[#2B80FF] hover:bg-[#1C48C2]  duration-300 border-[#2B80FF] hover:border-[#1C48C2] py-2 px-12 group rounded-lg"}>
            {t("add")}
          </button>
          <Link to={loading ? "#" : "/operations"} onClick={(e) => loading && e.preventDefault()} disabled={loading} className={loading ? "border-[2px]  text-[#cbcfd7] border-[#f0f1f4] py-2 px-12 group rounded-lg" : "border-[2px] text-[#FF5656] hover:text-white hover:bg-[#FF5656] duration-300 border-[#FF5656] py-2 px-12 group rounded-lg"}>
            {t("cancel")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddOperation;
