import { useEffect, useState } from "react";
import Header from "./Header";
import { Table } from "antd";
import { getData, updateData } from "../Services/APICalls";
import { useTranslation } from "react-i18next";
import Modal from "@mui/material/Modal";
import Select from "react-select";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("userToken");
  const [institutions, setInstitutions] = useState([]);
  const [selectList, setSelectList] = useState([]);
  const [loading, setLoading] = useState(false);
  const regEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    getData("/users/all-users", localStorage.getItem("userToken")).then((res) => {
      let temp2 = res.data.data.map((item) => {
        return {id: item._id, name: item.name, email: item.email, role: item.role, institutions: item.institutions.map((item) => item.name).join(" - ") };
      });
      setUsers(temp2);
    });
  }, []);

  const editUser = (record) => {
    const fetchInstitutions = async () => {
      let temp = await getData("/institutions/all", token);
      let temp2 = temp.data.data.map((item) => {
        return { value: item._id, label: item.name };
      });
      setSelectList(temp2);
    };
    fetchInstitutions();
    setOpen(true);
    setUserID(record.id);
    setName(record.name);
    setEmail(record.email);
    setRole(record.role);
  };

  const options = [
    { value: "manager", label: "Manager" },
    { value: "engeineer", label: "Engeineer" },
    { value: "user", label: "User" },
  ];

  const handleChange = (selectedOptions) => {
    setRole(selectedOptions.value);
  };

  const handleChange2 = (selectedOptions) => {
    let values = [];
    values = selectedOptions.map((option) => option.value);
    setInstitutions(values);
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

    if(name === ""){
      toast.error("ادخل الاسم");
      return;
    }
    if(!regEmail.test(email)){
      toast.error("ادخل البريد الاكتروني بشكل صحيح");
      return;
    }
    if(institutions.length === 0){
      toast.error("اختر المؤسسة");
      return;
    }
    setLoading(true);
    let temp = await updateData(`/users//edit-user/${userID}`, { name, role,  institutions, email}, token);
    if(temp.status === 200){
      handleClose();
      location.reload();
    }else{
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
          <h2 className="text-right text-[#05004E] font-bold text-2xl ">{t("users")}</h2>
        </div>
        <Table dataSource={users}>
          <Table.Column
            title={t("edit_or_delete")}
            dataIndex="action"
            key="action"
            render={(_, record) => (
              <div className="flex justify-center gap-2">
                <button onClick={() => editUser(record)} className="focus:outline-none">
                  <i className="fa-solid fa-pen bg-[#0EB70B] text-white p-2 rounded-lg "></i>
                </button>
                <button className="focus:outline-none">
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
        <Modal open={open} onClose={handleClose}>
          <div className="w-screen h-screen flex justify-center items-center">
            <div className="p-4 bg-white rounded min-w-[250px] lg:min-w-[450px]">
              <div className="flex justify-end mb-2">
                <i className="fa-solid fa-xmark text-2xl text-[#FF5656] cursor-pointer" onClick={() => handleClose()}></i>
              </div>
              <h3 className="text-center text-2xl mb-3">{t("edit_user_info")}</h3>
              <div className="mb-3">
                <p className="text-right mb-2">{t("name")}</p>
                <input value={name} onChange={(e) => setName(e.target.value)} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="text" />
              </div>
              <div className="mb-3">
                <p className="text-right mb-2">{t("email")}</p>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="text" />
              </div>
              <div className="mb-3">
                <p className="text-right mb-2">{t("permissions")}</p>
                <Select styles={customStyles} options={options} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <p className="text-right mb-2">{t("institutions")}</p>
                <Select styles={customStyles} options={selectList} isMulti onChange={handleChange2} />
              </div>
              <div className="flex justify-center">
                <button disabled={loading} onClick={sendData} className={loading ? "border-[2px] text-[#cbcfd7] border-[#f0f1f4] py-2 px-12 group rounded-lg" : "border-[2px] text-white hover:text-white bg-[#2B80FF] hover:bg-[#1C48C2]  duration-300 border-[#2B80FF] hover:border-[#1C48C2] py-2 px-12 group rounded-lg"}>
                  {t("edit_user")}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default AllUsers;