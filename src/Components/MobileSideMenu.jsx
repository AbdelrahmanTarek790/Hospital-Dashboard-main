import { useState, useContext } from "react";
import DispatchContext from "../DispatchContext";
import { Link, useNavigate } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Drawer from "@mui/material/SwipeableDrawer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MobileSideMenu() {
  const appDispatch = useContext(DispatchContext);
  const [openMenu, setOpen] = useState(false);
  const toggleMenu = (openStatus) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpen(openStatus);
  };

  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const [open, setOpen0] = useState();

  const logout = () => {
    toast.info("تم تسجيل الخروج");
    appDispatch({ type: "logout" });
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div onClick={toggleMenu(true)} className="p-3 size-[30px] bg-[#f0f0f1] flex justify-center items-center rounded-lg lg:hidden">
        <i className="fa-solid fa-bars text-[#3268FF]"></i>
      </div>
      <Drawer anchor="right" open={openMenu} onClose={toggleMenu(false)} onOpen={toggleMenu(true)}>
        <div className="w-screen h-full md:max-w-screen-sm flex flex-col p-3 relative bg-white">
          <div className="text-2xl text-[#3268FF] mb-6">
            <i className="fa-solid fa-x" onClick={toggleMenu(false)}></i>
          </div>
          <div className="grow flex flex-col justify-between">
            <ul className="flex flex-col  space-y-2">
              <Link
                onClick={() => {
                  setSelected("main");
                  setOpen0(0);
                }}
                to="/"
              >
                <li onClick={toggleMenu(false)} className={`flex p-3 cursor-pointer rounded-lg flex-row-reverse justify-start items-center gap-2 text-[#737791] hover:bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] hover:text-white duration-300 ${selected == "main" ? "bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] text-white" : ""}`}>
                  <i className="fa-solid fa-chart-pie"></i>
                  <p className="text-right">الصفحة الرئيسية</p>
                </li>
              </Link>
              <div
                onClick={() => {
                  setSelected("operations");
                  setOpen0(1);
                }}
              >
                <li className={`flex p-3 cursor-pointer rounded-lg flex-row-reverse justify-between items-center gap-2 text-[#737791] hover:bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] hover:text-white duration-300 ${selected == "operations" ? "bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] text-white" : ""}`}>
                  <div className="flex flex-row-reverse items-center gap-2">
                    <i className="fa-solid fa-hammer"></i>
                    <p className="text-right">اوامر التشغيل</p>
                  </div>
                  {open == 1 ? <ExpandLess /> : <ExpandMore />}
                </li>
              </div>
              <Collapse in={open == 1} timeout="auto" unmountOnExit>
                <ul className="bg-[#EAEEF899] rounded-lg text-right">
                  <Link to="/operations">
                    <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                      <i className="fa-solid fa-plus"></i>
                      <p className="text-xs lg:text-base">اوامر التشغيل</p>
                    </li>
                  </Link>
                  <Link to="/add-operation">
                    <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                      <i className="fa-solid fa-plus"></i>
                      <p className="text-xs lg:text-base">اضافة امر تشغيل</p>
                    </li>
                  </Link>

                  <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                    <i className="fa-solid fa-plus"></i>
                    <p className="text-xs lg:text-base">سجلات اوامر التشغيل</p>
                  </li>
                </ul>
              </Collapse>
              <div
                onClick={() => {
                  setSelected("asstes");
                  setOpen0(2);
                }}
              >
                <li className={`flex p-3 cursor-pointer rounded-lg flex-row-reverse justify-between items-center gap-2 text-[#737791] hover:bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] hover:text-white duration-300 ${selected == "asstes" ? "bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] text-white" : ""}`}>
                  <div className="flex flex-row-reverse items-center gap-2">
                    <i className="fa-solid fa-boxes-stacked"></i>
                    <p className="text-right">الاصول</p>
                  </div>
                  {open == 2 ? <ExpandLess /> : <ExpandMore />}
                </li>
              </div>
              <Collapse in={open == 2} timeout="auto" unmountOnExit>
                <ul className="bg-[#EAEEF899] rounded-lg text-right">
                  <Link to="/assets">
                    <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                      <i className="fa-solid fa-plus"></i>
                      <p className="text-xs lg:text-base">جميع الاصول</p>
                    </li>
                  </Link>
                  <Link to="/add-asset">
                    <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                      <i className="fa-solid fa-plus"></i>
                      <p className="text-xs lg:text-base">اضافة اصل</p>
                    </li>
                  </Link>
                </ul>
              </Collapse>
              <div
                onClick={() => {
                  setSelected("maintenance");
                  setOpen0(3);
                }}
              >
                <li className={`flex p-3 cursor-pointer rounded-lg flex-row-reverse justify-between items-center gap-2 text-[#737791] hover:bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] hover:text-white duration-300 ${selected == "maintenance" ? "bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] text-white" : ""}`}>
                  <div className="flex flex-row-reverse items-center gap-2">
                    <i className="fa-solid fa-toolbox"></i>
                    <p className="text-right text-nowrap">صيانة وقائية</p>
                  </div>

                  {open == 3 ? <ExpandLess /> : <ExpandMore />}
                </li>
              </div>
              <Collapse in={open == 3} timeout="auto" unmountOnExit>
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
              </Collapse>
              <div
                onClick={() => {
                  setSelected("plans");
                  setOpen0(4);
                }}
              >
                <li className={`flex p-3 cursor-pointer rounded-lg flex-row-reverse justify-between items-center gap-2 text-[#737791] hover:bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] hover:text-white duration-300 ${selected == "plans" ? "bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] text-white" : ""}`}>
                  <div className="flex flex-row-reverse gap-2 items-center">
                    <i className="fa-solid fa-person-digging"></i>
                    <p className="text-right ">خطط العمل</p>
                  </div>
                  {open == 4 ? <ExpandLess /> : <ExpandMore />}
                </li>
              </div>
              <Collapse in={open == 4} timeout="auto" unmountOnExit>
                <ul className="bg-[#EAEEF899] rounded-lg text-right">
                  <Link to="/add-plan">
                    <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                      <i className="fa-solid fa-plus"></i>
                      <p className="text-xs lg:text-base">اضافة خطة عمل</p>
                    </li>
                  </Link>

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
              <div
                onClick={() => {
                  setSelected("users");
                  setOpen0(5);
                }}
              >
                <li className={`flex p-3 cursor-pointer rounded-lg flex-row-reverse justify-between items-center gap-2 text-[#737791] hover:bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] hover:text-white duration-300 ${selected == "users" ? "bg-gradient-to-l from-[#4D7DFF] to-[#1C48C2] text-white" : ""}`}>
                  <div className="flex flex-row-reverse items-center gap-2">
                    <i className="fa-solid fa-user"></i>
                    <p className="text-right ">المستخدمين</p>
                  </div>
                  {open == 5 ? <ExpandLess /> : <ExpandMore />}
                </li>
              </div>
              <Collapse in={open == 5} timeout="auto" unmountOnExit>
                <ul className="bg-[#EAEEF899] rounded-lg text-right">
                  <Link to="/add-user">
                    <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                      <i className="fa-solid fa-plus"></i>
                      <p className="text-xs lg:text-base">اضافة مستخدم</p>
                    </li>
                  </Link>
                  <Link to="/users">
                    <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                      <i className="fa-solid fa-plus"></i>
                      <p className="text-xs lg:text-base">جميع المستخدمين</p>
                    </li>
                  </Link>

                  <Link to="/all-activities">
                    <li className="flex flex-row-reverse items-center p-3 gap-2 text-[#737791] cursor-pointer hover:text-[#000000] duration-300">
                      <i className="fa-solid fa-plus"></i>
                      <p className="text-xs lg:text-base">عرض جميع الانشطة</p>
                    </li>
                  </Link>
                </ul>
              </Collapse>
            </ul>
            <button onClick={logout} className="flex justify-end w-fit mx-auto items-center space-x-2 border-[2px] hover:bg-[#FF5656] duration-300 border-[#FF5656] p-3 group rounded-lg">
              <p className="text-[#737791] group-hover:text-white duration-300 ">تسجيل الخروج</p>
              <i className="fa-solid fa-right-from-bracket text-[#FF5656] group-hover:text-white duration-300"></i>
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default MobileSideMenu;
