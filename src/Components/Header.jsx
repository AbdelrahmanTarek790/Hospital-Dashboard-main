import { useState, useContext } from "react";
import MobileSideMenu from "./MobileSideMenu";
import { useStoreContext } from "../Context/storeContext";
import { updateData } from "../Services/APICalls";

function Header() {
  const [select, setSelect] = useState(false);
  const { userData, setUserData } = useStoreContext();
  const [name, setName] = useState("اسم المؤسسة");
  const toggleSelect = () => {
    setSelect(!select);
  };
  const onChangeHndler = (value) => {
    updateData(
      "/users/edit-profile",
      {
        currentInstitutions: value,
      },
      localStorage.getItem("userToken")
    ).then((res) => {
      setUserData(res.data.data.finalUser);
      window.location.reload();
    });
    toggleSelect();
  };

  return (
    <div className="p-6 flex gap-6 justify-between items-center mb-6 bg-white">
      <button className="relative flex justify-center text-xs text-nowrap md:text-base items-center bg-white border focus:outline-none shadow text-grey-600 rounded-lg ">
        <p className="px-4 py-3" onClick={toggleSelect}>
          {userData.currentInstitutions ? userData.currentInstitutions.name : name}
        </p>
        <span className="border-l p-2" onClick={toggleSelect}>
          <i className="fa-solid fa-angle-down"></i>
        </span>
        <div className={`absolute top-full min-w-full w-max bg-white shadow-md mt-1 rounded-lg z-[2] ${select ? "block" : "hidden"}`}>
          <ul className="text-right border rounded-lg">
            {userData.institutions.map((item, index) => {
              return (
                <li className="px-4 py-3 hover:bg-gray-100 border-b" onClick={() => onChangeHndler(item._id)} key={index}>
                  {item.address}
                </li>
              );
            })}
          </ul>
        </div>
      </button>
      <div className="flex gap-3 items-center flex-row-reverse">
        <div className="p-3  size-[35px] bg-[#f0f0f1] flex justify-center items-center rounded-lg">
          <i className="fa-solid fa-user text-[#3268FF]"></i>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-bold text-sm text-nowrap capitalize">{userData.name}</p>
          <p className="text-sm capitalize">{userData.role}</p>
        </div>
        <MobileSideMenu />
      </div>
    </div>
  );
}

export default Header;
