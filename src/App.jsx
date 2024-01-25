import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("userToken")),
  };

  function myReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        break;
      case "logout":
        draft.loggedIn = false;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(myReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <div className={state.loggedIn ? "flex flex-row-reverse h-screen overflow-scroll 2xl:overflow-x-hidden md:overflow-y-auto" : ""}>
          <Router>
            {state.loggedIn ? <SideMenu /> : ""}
            <Routes>
              <Route path="/" exact element={state.loggedIn ? <MainPage /> : <Login />} />
              <Route path="/operations" exact element={<OperationCommandsPage />} />
              <Route path="/add-operation" exact element={<AddOperation />} />
              <Route path="/assets" exact element={<AsstetsPage />} />
              <Route path="/add-asset" exact element={<AddAsset />} />
              <Route path="/maintenance" exact element={<Maintenance />} />
              <Route path="/add-user" exact element={<AddUser />} />
              <Route path="/add-plan" exact element={<AddPlan />} />
              <Route path="/users" exact element={<AllUsers />} />
              <Route path="/all-activities" exact element={<AllActivities />} />
            </Routes>
            <ToastContainer autoClose={2500} theme="dark" newestOnTop={true} />
          </Router>
        </div>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
