import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

function SideMenu() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState("main");
  const navigate = useNavigate();
  const [open, setOpen0] = useState();

  const logout = () => {
    toast.info("تم تسجيل الخروج");
    localStorage.clear();
    navigate("/");
    location.reload();
  };

  return (
    <div className="hidden  h-screen w-fit sticky right-0 top-0 shadow-lg lg:max-w-[240px] p-2 lg:p-6 lg:flex flex-col justify-between items-center">
      <div className=" lg:w-[167px]">
        <h2 className="text-[#151D48] text-right font-bold lg:text-4xl mb-6">{t("dashboard")}</h2>
        <ul className="flex flex-col space-y-2">
          <Link
            onClick={() => {
              setSelected("main");
              setOpen0(0);
            }}
            to="/"
          >
            <li className={`flex p-3 cursor-pointer rounded-lg flex-row-reverse justify-center lg:justify-start items-center gap-2 text-[#737791] hover:bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] hover:text-white duration-300 ${selected == "main" ? "bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] text-white" : ""}`}>
              <i className="fa-solid fa-chart-pie"></i>
              <p className="text-right hidden lg:block">{t("home")}</p>
            </li>
          </Link>
          <Link
            onClick={() => {
              setSelected("operations");
              setOpen0(1);
            }}
            to="/operations"
          >
            <li className={`flex p-3 cursor-pointer rounded-lg flex-row-reverse justify-between items-center gap-2 text-[#737791] hover:bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] hover:text-white duration-300 ${selected == "operations" ? "bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] text-white" : ""}`}>
              <div className="flex flex-row-reverse items-center gap-2">
                <i className="fa-solid fa-hammer"></i>
                <p className="text-right hidden lg:block">{t("operations")}</p>
              </div>
              {open == 1 ? <ExpandLess /> : <ExpandMore />}
            </li>
          </Link>
          <Collapse in={open == 1} timeout="auto" unmountOnExit>
            <ul className="bg-[#EAEEF899] rounded-lg text-right">
              <Link to="/operations">
                <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                  <i className="fa-solid fa-plus"></i>
                  <p className="text-xs lg:text-base">{t("operations")}</p>
                </li>
              </Link>
              <Link to="/add-operation">
                <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                  <i className="fa-solid fa-plus"></i>
                  <p className="text-xs lg:text-base">{t("add_operation")}</p>
                </li>
              </Link>

              <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                <i className="fa-solid fa-plus"></i>
                <p className="text-xs lg:text-base">{t("history_operation")}</p>
              </li>
            </ul>
          </Collapse>
          <Link
            onClick={() => {
              setSelected("asstes");
              setOpen0(2);
            }}
            to="/assets"
          >
            <li className={`flex p-3 cursor-pointer rounded-lg flex-row-reverse justify-between items-center gap-2 text-[#737791] hover:bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] hover:text-white duration-300 ${selected == "asstes" ? "bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] text-white" : ""}`}>
              <div className="flex flex-row-reverse items-center gap-2">
                <i className="fa-solid fa-boxes-stacked"></i>
                <p className="text-right hidden lg:block">{t("devices")}</p>
              </div>
              {open == 2 ? <ExpandLess /> : <ExpandMore />}
            </li>
          </Link>
          <Collapse in={open == 2} timeout="auto" unmountOnExit>
            <ul className="bg-[#EAEEF899] rounded-lg text-right">
              <Link to="/assets">
                <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                  <i className="fa-solid fa-plus"></i>
                  <p className="text-xs lg:text-base">{t("all_devices")}</p>
                </li>
              </Link>
              <Link to="/add-asset">
                <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                  <i className="fa-solid fa-plus"></i>
                  <p className="text-xs lg:text-base">{t("add_device")}</p>
                </li>
              </Link>
            </ul>
          </Collapse>
          <Link
            onClick={() => {
              setSelected("maintenance");
              setOpen0(3);
            }}
            to="/maintenance"
          >
            <li className={`flex p-3 cursor-pointer rounded-lg flex-row-reverse justify-between items-center gap-2 text-[#737791] hover:bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] hover:text-white duration-300 ${selected == "maintenance" ? "bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] text-white" : ""}`}>
              <div className="flex flex-row-reverse items-center gap-2">
                <i className="fa-solid fa-toolbox"></i>
                <p className="text-right hidden lg:block">{t("preventive_maintenance")}</p>
              </div>
              {/* {open == 3 ? <ExpandLess /> : <ExpandMore />} */}
            </li>
          </Link>
          {/* <Collapse in={open == 3} timeout="auto" unmountOnExit>
            <ul className="bg-[#EAEEF899] rounded-lg text-right">
              <Link to="/maintenance">
                <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                  <i className="fa-solid fa-plus"></i>
                  <p className="text-xs lg:text-base">اضافة صيانة وقائية</p>
                </li>
              </Link>

              <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                <i className="fa-solid fa-plus"></i>
                <p className="text-xs lg:text-base">بيان الشهر</p>
              </li>
              <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                <i className="fa-solid fa-plus"></i>
                <p className="text-xs lg:text-base">تقارير</p>
              </li>
            </ul>
          </Collapse> */}
          <Link
            onClick={() => {
              setSelected("plans");
              setOpen0(4);
            }}
            to="/add-plan"
          >
            <li className={`flex p-3 cursor-pointer rounded-lg flex-row-reverse justify-between items-center gap-2 text-[#737791] hover:bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] hover:text-white duration-300 ${selected == "plans" ? "bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] text-white" : ""}`}>
              <div className="flex flex-row-reverse gap-2 items-center">
                <i className="fa-solid fa-person-digging"></i>
                <p className="text-right hidden lg:block">{t("work_plans")}</p>
              </div>
              {open == 4 ? <ExpandLess /> : <ExpandMore />}
            </li>
          </Link>
          <Collapse in={open == 4} timeout="auto" unmountOnExit>
            <ul className="bg-[#EAEEF899] rounded-lg text-right">
              <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                <i className="fa-solid fa-plus"></i>
                <p className="text-xs lg:text-base">اضافة خطة عمل</p>
              </li>
              <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                <i className="fa-solid fa-plus"></i>
                <p className="text-xs lg:text-base">اضافة خطة اليوم</p>
              </li>
              <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                <i className="fa-solid fa-plus"></i>
                <p className="text-xs lg:text-base">خطط خلال اليوم</p>
              </li>
              <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                <i className="fa-solid fa-plus"></i>
                <p className="text-xs lg:text-base">خطط خلال الشهر</p>
              </li>
              <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                <i className="fa-solid fa-plus"></i>
                <p className="text-xs lg:text-base">جميع السجلات</p>
              </li>
            </ul>
          </Collapse>
          <Link
            onClick={() => {
              setSelected("users");
              setOpen0(5);
            }}
            to="/add-user"
          >
            <li className={`flex p-3 cursor-pointer rounded-lg flex-row-reverse justify-between items-center gap-2 text-[#737791] hover:bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] hover:text-white duration-300 ${selected == "users" ? "bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] text-white" : ""}`}>
              <div className="flex flex-row-reverse items-center gap-2">
                <i className="fa-solid fa-user"></i>
                <p className="text-right hidden lg:block">{t("control_panel")}</p>
              </div>
              {open == 5 ? <ExpandLess /> : <ExpandMore />}
            </li>
          </Link>
          <Collapse in={open == 5} timeout="auto" unmountOnExit>
            <ul className="bg-[#EAEEF899] rounded-lg text-right">
              <Link to="/add-user">
                <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                  <i className="fa-solid fa-plus"></i>
                  <p className="text-xs lg:text-base">{t("add_user")}</p>
                </li>
              </Link>
              <Link to="/users">
                <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                  <i className="fa-solid fa-plus"></i>
                  <p className="text-xs lg:text-base">{t("all_users")}</p>
                </li>
              </Link>
              <Link to="/all-activities">
                <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                  <i className="fa-solid fa-plus"></i>
                  <p className="text-xs lg:text-base">{t("all_activites")}</p>
                </li>
              </Link>
            </ul>
          </Collapse>
        </ul>
      </div>
      <button onClick={logout} className="flex items-center space-x-2 border-[2px] hover:bg-[#FF5656] duration-300 border-[#FF5656] p-3 group rounded-lg">
        <p className="text-[#737791] group-hover:text-white duration-300 hidden lg:block">{t("logout")}</p>
        <i className="fa-solid fa-right-from-bracket text-[#FF5656] group-hover:text-white duration-300"></i>
      </button>
    </div>
  );
}

export default SideMenu;
