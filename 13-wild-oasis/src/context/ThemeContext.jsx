/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        } else {
            document.documentElement.classList.add("light-mode");
            document.documentElement.classList.remove("dark-mode");
        }
    }, [isDarkMode]);

    function toggleTheme() {
        setIsDarkMode((curr) => !curr);
    }

    return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>;
}

function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) throw new Error("Context usage prohibited in the current placement");
    return context;
}

export { ThemeProvider, useTheme };
