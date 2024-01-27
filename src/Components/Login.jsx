import { useState } from "react"
import { postData } from "../Services/APICalls"
import Logo from "../assets/Logo.png"

import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useTranslation } from "react-i18next"

function Login() {
    const { t } = useTranslation()
    const url = "/auth/login"
    const regEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async () => {
        if (email === "") {
            toast.error("ادخل الايميل")
            return
        }
        if (!regEmail.test(email)) {
            toast.error("ادخل ايميل صحيح")
            return
        }
        if (password === "") {
            toast.error("ادخل كلمة المرور")
            return
        }
        toast.info("جاري تسجيل الدخول")
        const result = await postData(url, { email, password })
        if (result.status == 401) {
            toast.error("تأكد من صحة بياناتك")
            return
        }
        if (result.status == 200) {
            localStorage.setItem("userToken", result.data.token)
            toast.success("تم تسجيل الدخول بنجاح");
            location.reload();
        }
    }

    return (
        <div className="h-screen bg-[#F8F8F8] flex justify-center items-center px-3">
            <div className="bg-[#FFFFFF9C] px-6 py-12 border border-[#00000033] text-right w-[400px] rounded-lg">
                <img className="w-[250px] mx-auto" src={Logo} alt="" />
                <p className="font-bold text-black text-3xl mb-12">{/* <span>! </span>مرحبا بعودتك */}</p>
                <div className="mb-6">
                    <p className="mb-3 font-bold text-lg">: {t("email")}</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-[#000000] focus:outline-none text-right px-3 py-2 rounded-lg block w-full"
                        type="email"
                    />
                </div>
                <div className="mb-6">
                    <p className="mb-3 font-bold text-lg">: {t("password")}</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-[#000000] focus:outline-none text-right px-3 py-2 rounded-lg block w-full"
                        type="password"
                    />
                </div>
                <div className="flex flex-row-reverse justify-between items-center mb-12 ">
                    <div className="flex flex-row-reverse gap-3 items-center">
                        <p className="font-bold text-lg">: {t("rememberMe")}</p>
                        <input type="checkbox" />
                    </div>
                    <div>
                        <select
                            onChange={(e) => {
                                localStorage.setItem("lang", e.target.value)
                                location.reload()
                            }}
                            className="text-right"
                            value={localStorage.getItem("lang")}
                        >
                            <option value="ar">العربية</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-center mt-[50px]">
                    <button
                        onClick={login}
                        to=""
                        className="px-12 py-2 bg-[#2B80FF] text-[#ffffff] text-lg font-bold rounded-lg hover:bg-[#1C48C2] duration-300"
                    >
                        {t("login")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login
