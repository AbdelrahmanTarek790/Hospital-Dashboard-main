import { useState } from "react";
import { updateData } from "../Services/APICalls";
import { useStoreContext } from "../Context/storeContext";
import Header from "./Header";
import { Modal } from "@mui/material";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function Plan() {
  const { userData } = useStoreContext();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const submitHandler = () => {
    //check  working plan is link
    if (workingplan == "" || !workingplan.includes("https://docs.google.com/spreadsheets")) {
      toast.error("Please enter the link");

      return;
    }
    updateData(
      `/institutions/${userData.currentInstitutions._id}`,
      {
        workingplan: workingplan,
      },
      localStorage.getItem("userToken")
    ).then((res) => {
      location.reload();
    });
  };
  const [workingplan, setLink] = useState("");

  return (
    <div className="grow bg-[#F8F9FA] ">
      <Header />
      <div className="bg-white m-2 lg:m-6 p-6 min-h-[720px]  rounded-lg">
        <div className=" flex justify-between items-start">
          {userData.role === "admin" || userData.role === "manager" ? (
            <button onClick={() => setOpen(true)} className="border  px-4 py-2 rounded-lg hover:bg-[#ececec] transition-all">
              Edit the URL
            </button>
          ) : (
            null
          )}
          <div className="flex flex-row-reverse gap-2 items-center mb-6 pb-6 border-b-2">
            <i className="fa-solid fa-box text-2xl text-[#05004E]"></i>
            <h2 className="text-right text-[#05004E] font-bold text-2xl ">Plan</h2>
          </div>
        </div>
        {userData.currentInstitutions.workingplan === null || userData.currentInstitutions.workingplan === "" ? <div>No link is set yet</div> : <iframe className="w-full h-[600px]" src={userData.currentInstitutions.workingplan}></iframe>}
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="p-4 bg-white rounded min-w-[250px] lg:min-w-[450px]">
            <div className="flex justify-end mb-2">
              <i className="fa-solid fa-xmark text-2xl text-[#FF5656] cursor-pointer" onClick={() => handleClose()}></i>
            </div>

            <div className="">
              <p className="text-right text-lg font-semibold mb-4">Link</p>
              <input onChange={(e) => setLink(e.target.value)} className="focus:outline-none border w-full border-black p-3 rounded-lg text-right" type="text" />
            </div>
            <div className="flex justify-center mt-5">
              <button onClick={submitHandler} className="flex items-center space-x-2 border-[2px] hover:bg-[#4f60ff] duration-300 border-[#4f60ff] p-3 group rounded-lg">
                <p className="text-[#737791] group-hover:text-white duration-300 hidden lg:block">Import the Link</p>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Plan;
