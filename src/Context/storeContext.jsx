import { createContext, useContext, useState } from "react"

const StoreContext = createContext()

export const StoreProvider = ({ children }) => {
    const [userData, setUserData] = useState({ name: "", email: "", role: "", institutions: [], _id: "",currentInstitutions:{} })

    return <StoreContext.Provider value={{ userData, setUserData }}>{children}</StoreContext.Provider>
}

export const useStoreContext = () => useContext(StoreContext)
