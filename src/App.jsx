import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "./Services/APICalls";
import { useImmerReducer } from "use-immer";
import { ToastContainer } from "react-toastify";
import "./App.css";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";
import Login from "./Components/Login";
import SideMenu from "./Components/SideMenu";
import MainPage from "./Components/MainPage";
import OperationCommandsPage from "./Components/OperationCommandsPage";
import AddOperation from "./Components/AddOperation";
import AsstetsPage from "./Components/AsstesPage";
import AddAsset from "./Components/AddAsset";
import Maintenance from "./Components/Maintenance";
import AddUser from "./Components/AddUser";
import AddPlan from "./Components/AddPlan";
import AllUsers from "./Components/AllUsers";
import AllActivities from "./Components/AllActivities";
import { useStoreContext } from "./Context/storeContext";

import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import enTranslations from "./lang/en.json"
import arTranslations from "./lang/ar.json"

function App() {
  const loggedIn = Boolean(localStorage.getItem("userToken"));
  const { userData, setUserData } = useStoreContext();
  const [isData, setIsData] = useState(true);
  const Language = localStorage.getItem("lang");
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations },
    },
    lng: Language === "ar"||Language===null ? "ar" : "en",
    fallbackLng: "ar",
  })
  useEffect(() => {
    if (loggedIn) {
      getData("/users/me", localStorage.getItem("userToken")).then((res) => {
        setUserData(res.data.data.user);
        setIsData(false);
      });
    }
  }, []);
  return (
    <div className={loggedIn ? "flex flex-row-reverse h-screen overflow-scroll 2xl:overflow-x-hidden md:overflow-y-auto" : ""}>
      <Router>
        {loggedIn ? <SideMenu /> : ""}
        <Routes>
          <Route path="/" exact element={loggedIn && !isData ? <MainPage /> : !loggedIn && isData ? <Login /> : <></>} />
          {!isData && (
            <>
              <Route path="/operations" exact element={<OperationCommandsPage />} />
              <Route path="/add-operation" exact element={<AddOperation />} />
              <Route path="/assets" exact element={<AsstetsPage />} />
              <Route path="/add-asset" exact element={<AddAsset />} />
              <Route path="/maintenance" exact element={<Maintenance />} />
              <Route path="/add-user" exact element={<AddUser />} />
              <Route path="/add-plan" exact element={<AddPlan />} />
              <Route path="/users" exact element={<AllUsers />} />
              <Route path="/all-activities" exact element={<AllActivities />} />
            </>
          )}
        </Routes>
        <ToastContainer autoClose={2500} theme="dark" newestOnTop={true} />
      </Router>
    </div>
  );
}

export default App;
