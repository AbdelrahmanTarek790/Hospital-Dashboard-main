import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { postData } from "../Services/APICalls";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../Context/storeContext";
import { useTranslation } from "react-i18next";

function AddOperation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [id, setID] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [image, setImage] = useState("");
  const token = localStorage.getItem("userToken");
  const { userData } = useStoreContext();
  const [loading, setLoading] = useState(false);

  const sendData = async () => {
    if (id === "") {
      toast.error("ادخل رمز الاصل");
      return;
    }
    if (location === "") {
      toast.error("ادخل مكان الاصل");
      return;
    }
    if (type === "") {
      toast.error("ادخل نوع الاصل");
      return;
    }
    if (description === "") {
      toast.error("ادخل الوصف");
      return;
    }
    setLoading(true);
    let temp = await postData("/devices/create", { IDCode: id, location, modelType: type, description, notes: additionalInfo, institutions: userData.currentInstitutions._id }, token);
    console.log(temp);
    if (temp.status === 201) {
      toast.success("تم اضافة الاصل بنجاح");
      navigate("/assets");
    } else {
      toast.error("حدث خطأ ما");
    }
  };

  return (
    <div className="grow bg-[#F8F9FA]">
      <Header />
      <div className="bg-white m-6 p-6 rounded-lg">
        <div className="flex flex-row-reverse gap-2 items-center mb-6 pb-6 border-b-2">
          <i className="fa-solid fa-box text-2xl text-[#05004E]"></i>
          <h2 className="text-right text-[#05004E] font-bold text-2xl ">اضافة اصل</h2>
        </div>
        <div className="flex flex-col md:items-center gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">ID (CODE)</p>
            <input onChange={(e) => setID(e.target.value)} className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">{t("location")}</p>
            <input onChange={(e) => setLocation(e.target.value)} className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
        </div>
        <div className="flex flex-col md:items-center gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">{t("type")}</p>
            <input onChange={(e) => setType(e.target.value)} className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">{t("notes")}</p>
            <input onChange={(e) => setAdditionalInfo(e.target.value)} className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
        </div>
        <div className="flex flex-col-reverse md:items-start gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">{t("description")}</p>
            <textarea onChange={(e) => setDescription(e.target.value)} className="focus:outline-none border w-[98%] h-full block ml-auto border-black p-3 rounded-lg text-right" name="" id=""></textarea>
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">{t("image")}</p>
            <input onChange={(e) => setImage(e.target.value)} className="cursor-pointer focus:outline-none border w-[98%] ml-auto block  border-black p-3 rounded-lg text-right" type="file" />
          </div>
        </div>
        <div className="flex flex-row-reverse gap-6 mb-6">
          <button onClick={sendData} disabled={loading} className={loading ? "border-[2px] text-[#cbcfd7] border-[#f0f1f4] py-2 px-12 group rounded-lg" : "border-[2px] text-white hover:text-white bg-[#2B80FF] hover:bg-[#1C48C2]  duration-300 border-[#2B80FF] hover:border-[#1C48C2] py-2 px-12 group rounded-lg"}>
            اضافة
          </button>
          <Link to={loading ? "#" : "/assets"} onClick={(e) => loading && e.preventDefault()} disabled={loading} className={loading ? "border-[2px]  text-[#cbcfd7] border-[#f0f1f4] py-2 px-12 group rounded-lg" : "border-[2px] text-[#FF5656] hover:text-white hover:bg-[#FF5656] duration-300 border-[#FF5656] py-2 px-12 group rounded-lg"}>
            الغاء
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddOperation;