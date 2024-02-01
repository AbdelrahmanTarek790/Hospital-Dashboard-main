import { useState } from "react"
import Header from "./Header"
import Assets from "./Assets"
import Charts from "./Charts"
import OperationCommands from "./OperationCommands"
import { useStoreContext } from "../Context/storeContext"
import { useTranslation } from "react-i18next"
import { updateData } from "../Services/APICalls"

function MainPage() {
    const [institution, setInstitution] = useState("")
    const logout = () => {
        localStorage.clear()
        location.reload()
    }
    const { t } = useTranslation()
    const { userData } = useStoreContext()
    const handleChange = (e) => {
        setInstitution(e.target.value)
    }

    const clickHandler = () => {
        updateData(
            "/users/edit-profile",
            {
                currentInstitutions: institution,
            },
            localStorage.getItem("userToken")
        ).then((res) => {
            window.location.reload()
        })
    }

    return (
        <>
            {userData.currentInstitutions ? (
                <div className="grow bg-[#F8F9FA]">
                    <Header />
                    {/* <Assets /> */}
                    <Charts />
                    <OperationCommands />
                </div>
            ) : (
                <div className="absolute bg-white w-screen h-screen flex flex-col justify-center items-center">
                    <h3 className="text-3xl font-bold mb-6">{t("choose_institution")}</h3>
                    {userData.institutions.length === 0 ? (
                        <h3 className="text-xl mb-6">{t("no_institution")}</h3>
                    ) : (
                        <select onChange={handleChange} className="mb-3 p-2 border-2 focus:outline-none" name="" id="">
                            <option value="">{t("choose_institution")}</option>
                            {userData.institutions.map((item, index) => (
                                <option key={index} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    )}
                    {userData.institutions.length === 0 ? (
                        ""
                    ) : (
                        <button
                            onClick={clickHandler}
                            className="border-[2px] mb-3 text-white hover:text-white bg-[#2B80FF] hover:bg-[#1C48C2]  duration-300 border-[#2B80FF] hover:border-[#1C48C2] py-2 px-12 group rounded-lg"
                        >
                            {t("choose")}
                        </button>
                    )}

                    <button
                        onClick={logout}
                        className="flex items-center space-x-2 border-[2px] hover:bg-[#FF5656] duration-300 border-[#FF5656] p-3 group rounded-lg"
                    >
                        <p className="text-[#737791] group-hover:text-white duration-300 hidden lg:block">{t("logout")}</p>
                        <i className="fa-solid fa-right-from-bracket text-[#FF5656] group-hover:text-white duration-300"></i>
                    </button>
                </div>
            )}
        </>
    )
}
export default MainPage
