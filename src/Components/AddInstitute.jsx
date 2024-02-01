import { useState, useEffect } from "react";
import Header from "./Header";
import { useTranslation } from "react-i18next";
import { useStoreContext } from "../Context/storeContext";
import { Table } from "antd";
import { getData, postData, deleteData, updateData } from "../Services/APICalls";
import Modal from "@mui/material/Modal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddInstitute() {
  const { userData } = useStoreContext();
  const { t } = useTranslation();
  const [institutions, setInstitutions] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);

  const [institutionID, setInstitutionID] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const regNumbers = /^\d+$/;
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    const getInstitutions = async () => {
      let temp = await getData("/institutions", localStorage.getItem("userToken"));
      let temp2 = temp.data.data.map((item) => {
        return { id: item._id, name: item.name, address: item.address, phone: item.phone };
      });
      setInstitutions(temp2);
    };
    getInstitutions();
  });

  const addInstitute = async () => {
    if (newName === "") {
      toast.error("ادخل اسم المؤسسة");
      return;
    }
    if (newAddress === "") {
      toast.error("ادخل عنوان المؤسسة");
      return;
    }
    if (newPhone != "" && !regNumbers.test(newPhone)) {
      toast.error("ادخل رقم هاتف صحيح");
      return;
    }
    setLoading(true);
    let temp = await postData("/institutions/create", { name: newName, address: newAddress, phone: newPhone }, localStorage.getItem("userToken"));
    console.log(temp);
    if (temp.status === 201) {
      toast.success("تم اضافة المؤسسة بنجاح");
      window.location.reload();
      setLoading(false);
      setOpen3(false);
    }else{
      toast.error("حدث خطأ ما");
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setOpen(true);
    console.log(record);
    setInstitutionID(record.id);
    setName(record.name);
    setAddress(record.address);
    setPhone(record.phone);
  };

  const editInstitute = async () => {
    if (name === "") {
      toast.error("ادخل اسم المؤسسة");
      return;
    }
    if (address === "") {
      toast.error("ادخل عنوان المؤسسة");
      return;
    }
    if (phone === "") {
      toast.error("ادخل رقم المؤسسة");
      return;
    }
    setLoading(true);
    let temp = await updateData(`/institutions/${institutionID}`, { name, address, phone }, localStorage.getItem("userToken"));
    if (temp.status === 200) {
      toast.success("تم تعديل المؤسسة بنجاح");
      setLoading(false);
      setOpen(false);
    } else {
      toast.error("حدث خطأ ما");
      setLoading(false);
    }
  };

  const handleDelete = (record) => {
    setOpen2(true);
    setInstitutionID(record.id);
  };

  const deleteInstitution = async () => {
    let temp = await deleteData(`/institutions/${institutionID}`, localStorage.getItem("userToken"));
    console.log(temp);
    if (temp.status === 204) {
      toast.success("تم حذف المؤسسة بنجاح");
      window.location.reload();
      setOpen2(false);
    }else{
      toast.error("حدث خطأ ما");
      setLoading(false);
    }
  }

  return (
    <div className="grow bg-[#F8F9FA]">
      <Header />
      {userData.role === "admin" ? (
        <div>
          <div className="bg-white m-6 p-6 rounded-lg">
            <div className="flex justify-between items-center border-b-2">
              <button onClick={() => setOpen3(true)} className="border-[2px] text-white hover:text-white bg-[#2B80FF] hover:bg-[#1C48C2]  duration-300 border-[#2B80FF] hover:border-[#1C48C2] py-2 px-6 group rounded-lg">
                {t("add_institution")}
              </button>
              <div className="flex flex-row-reverse gap-2 items-center mb-6 pb-6 ">
                <i className="fa-solid fa-box text-2xl text-[#05004E]"></i>
                <h2 className="text-right text-[#05004E] font-bold text-2xl ">{t("institutions")}</h2>
              </div>
            </div>
            <Table dataSource={institutions}>
              <Table.Column
                title={t("edit_or_delete")}
                dataIndex="action"
                key="action"
                render={(_, record) => (
                  <div className="flex justify-center gap-2">
                    <button onClick={() => handleEdit(record)} className="focus:outline-none">
                      <i className="fa-solid fa-pen bg-[#0EB70B] text-white p-2 rounded-lg "></i>
                    </button>
                    <button onClick={() => handleDelete(record)} className="focus:outline-none">
                      <i className="fa-solid fa-trash bg-[#CC0F1F] text-white p-2 rounded-lg"></i>
                    </button>
                  </div>
                )}
              />
              <Table.Column title={t("phone_number")} dataIndex="phone" key="phone" />
              <Table.Column title={t("address")} dataIndex="address" key="address" />
              <Table.Column title={t("name")} dataIndex="name" key="name" />
            </Table>
            <Modal open={open} onClose={handleClose}>
              <div className="w-screen h-screen flex justify-center items-center">
                <div className="p-4 bg-white rounded min-w-[250px] lg:min-w-[450px]">
                  <div className="flex justify-end mb-2">
                    <i className="fa-solid fa-xmark text-2xl text-[#FF5656] cursor-pointer" onClick={() => handleClose()}></i>
                  </div>
                  <h3 className="text-center text-2xl mb-3">{t("edit_institution")}</h3>
                  <div className="mb-3">
                    <p className="text-right mb-2">{t("name")}</p>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="text" />
                  </div>
                  <div className="mb-3">
                    <p className="text-right mb-2">{t("address")}</p>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="text" />
                  </div>
                  <div className="mb-3">
                    <p className="text-right mb-2">{t("phone_number")}</p>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="text" />
                  </div>
                  <div className="flex justify-center">
                    <button disabled={loading} onClick={editInstitute} className={loading ? "border-[2px] text-[#cbcfd7] border-[#f0f1f4] py-2 px-12 group rounded-lg" : "border-[2px] text-white hover:text-white bg-[#2B80FF] hover:bg-[#1C48C2]  duration-300 border-[#2B80FF] hover:border-[#1C48C2] py-2 px-12 group rounded-lg"}>
                      {t("edit_institution")}
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
                  <h3 className="text-center text-2xl mb-3">{t("are_you_sure4")}</h3>
                  <div className="flex justify-center">
                    <button onClick={deleteInstitution} className="flex items-center space-x-2 border-[2px] hover:bg-[#FF5656] duration-300 border-[#FF5656] p-3 group rounded-lg">
                      <p className="text-[#737791] group-hover:text-white duration-300 hidden lg:block">{t("delete_institution")}</p>
                      <i className="fa-solid fa-trash text-[#FF5656] group-hover:text-white duration-300"></i>
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
                  <h3 className="text-center text-2xl mb-3">{t("new_institution")}</h3>
                  <div className="mb-3">
                    <p className="text-right mb-2">{t("name")}</p>
                    <input onChange={(e) => setNewName(e.target.value)} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="text" />
                  </div>
                  <div className="mb-3">
                    <p className="text-right mb-2">{t("address")}</p>
                    <input  onChange={(e) => setNewAddress(e.target.value)} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="text" />
                  </div>
                  <div className="mb-3">
                    <p className="text-right mb-2">{t("phone_number")}</p>
                    <input  onChange={(e) => setNewPhone(e.target.value)} className="focus:outline-none border w-full border-black p-2 rounded-lg text-right" type="text" />
                  </div>
                  <div className="flex justify-center">
                    <button disabled={loading} onClick={addInstitute} className={loading ? "border-[2px] text-[#cbcfd7] border-[#f0f1f4] py-2 px-12 group rounded-lg" : "border-[2px] text-white hover:text-white bg-[#2B80FF] hover:bg-[#1C48C2]  duration-300 border-[#2B80FF] hover:border-[#1C48C2] py-2 px-12 group rounded-lg"}>
                      {t("create_institution")}
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      ) : (
        <div className="bg-white m-6 p-6 rounded-lg flex justify-center">
          <p className="text-2xl font-bold">You are not authorized</p>
        </div>
      )}
    </div>
  );
}

export default AddInstitute;
