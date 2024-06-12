"use client";
import { createContext, useContext, useState } from "react";
const GlobalContext = createContext({});
export const DataProvider = ({ value, children }) => {
    const [isDark, setIsDark] = useState(false);
    const [active, setActive] = useState(null);
    const [token, setToken] = useState(null);
const [isFetching, setIsFetching] = useState(false);
    const [cart, setCart] = useState([]);
    const [toast, setToast] = useState({
        status: "warn",
        state: false,
        value: "welcome"
    });

    const useTheme = {
        background: "#e3e3e3"
    };
    return (
        <GlobalContext.Provider
            value={{
                useTheme,
                isDark,
                setIsDark,
                active,
                setActive,
                toast,
                setToast,
                token,
                setToken,cart,setCart,isFetching, setIsFetching
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
export const useGlobal = () => {
    return useContext(GlobalContext);
};
