import { useState, useEffect } from "react";
import { getData, postData } from "../Services/APICalls";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Select from "react-select";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddUser() {
  const navigate = useNavigate();
  const regEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [institutions, setInstitutions] = useState([]);
  const [selectList, setSelectList] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchInstitutions = async () => {
      let temp = await getData("/institutions/all", token);
      let temp2 = temp.data.data.map((item) => {
        return { value: item._id, label: item.name };
      })
      setSelectList(temp2);
    };
    fetchInstitutions();
  }, []);


  const options = selectList;

  const handleChange = (selectedOptions) => {
    let values = [];
    values = selectedOptions.map((option) => option.value);
    console.log(values);
    setInstitutions(values);
  };

  const options2 = [
    { value: "admin", label: "ادمن" },
    { value: "manager", label: "مدير" },
    { value: "engeineer", label: "مهندس" },
    { value: "user", label: "مستخدم" },
  ];

  const handleChange2 = (selectedOptions) => {
    console.log(selectedOptions);
    setRole(selectedOptions.value);
    console.log(role);
  };

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

  const sendData = async () => {
    if (name === "") {
      toast.error("ادخل الاسم");
      return;
    }
    if (email === "") {
      toast.error("ادخل البريد الاكتروني");
      return;
    }
    if (!regEmail.test(email)) {
      toast.error("البريد الاكتروني غير صحيح");
      return;
    }
    if (password === "") {
      toast.error("ادخل كلمة المرور");
      return;
    }
    if (confirmPass === "") {
      toast.error("ادخل تأكيد كلمة المرور");
      return;
    }
    if (password !== confirmPass) {
      toast.error("كلمة المرور غير متطابقة");
      return;
    }
    if (institutions.length === 0) {
      toast.error("اختر المؤسسة");
      return;
    }
    if (role === "") {
      toast.error("اختر الصلاحية");
      return;
    }
    setLoading(true);
    let temp = await postData("/auth/signup", { name, email, password, passwordConfirm: confirmPass, role,  institutions }, token);
    console.log(temp);
    if (temp.status === 201) {
      toast.success("تم اضافة المستخدم بنجاح");
      navigate("/users")
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
          <h2 className="text-right text-[#05004E] font-bold text-2xl ">اضافة مستخدم</h2>
        </div>
        <div className="flex flex-col md:items-center gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">الاسم</p>
            <input onChange={(e) => setName(e.target.value)} className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">البريد الاكتروني</p>
            <input onChange={(e) => setEmail(e.target.value)} className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
          </div>
        </div>
        <div className="flex flex-col md:items-center gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">كلمة المرور</p>
            <input onChange={(e) => setPass(e.target.value)} className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="password" />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">تأكيد كلمة المرور</p>
            <input onChange={(e) => setConfirmPass(e.target.value)} className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="password" />
          </div>
        </div>
        <div className="flex flex-col md:items-center gap-6 md:flex-row-reverse mb-6">
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">المؤسسات</p>
            <Select styles={customStyles} options={options} onChange={handleChange} isMulti placeholder="Select multiple options" />
          </div>
          <div className="basis-1/2">
            <p className="text-right text-lg font-semibold mb-4">الصلاحية</p>
            <Select styles={customStyles} options={options2} onChange={handleChange2} placeholder="" />
          </div>
        </div>
        <div className="flex flex-row-reverse gap-6 mb-6">
          <button onClick={sendData} disabled={loading} className={loading ? "border-[2px] text-[#cbcfd7] border-[#f0f1f4] py-2 px-12 group rounded-lg" : "border-[2px] text-white hover:text-white bg-[#2B80FF] hover:bg-[#1C48C2]  duration-300 border-[#2B80FF] hover:border-[#1C48C2] py-2 px-12 group rounded-lg"}>
            اضافة
          </button>
          <Link to={loading ? "#" : "/users"} onClick={(e) => loading && e.preventDefault()} disabled={loading} className={loading ? "border-[2px]  text-[#cbcfd7] border-[#f0f1f4] py-2 px-12 group rounded-lg" : "border-[2px] text-[#FF5656] hover:text-white hover:bg-[#FF5656] duration-300 border-[#FF5656] py-2 px-12 group rounded-lg"}>
            الغاء
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
