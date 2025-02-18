import { fetchVerify } from "@/lib/fetcher"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

type ThemeProviderState = {
    theme: Theme,
    setTheme: (theme: Theme) => void,
    showForm: boolean,
    setShowForm: (showForm: boolean) => void,
    openSidebar: boolean,
    setOpenSidebar: (open: boolean) => void,
    auth: any,
    setAuth: (auth: any) => void,
    globalMsg: null | boolean | string,
    setGlobalMsg: (msg: null | boolean | string) => void,
}


const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
    showForm: false,
    setShowForm: () => null,
    openSidebar: false,
    setOpenSidebar: () => null,
    auth: null,
    setAuth: () => null,
    globalMsg: null,
    setGlobalMsg: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    )

    const [showForm, setShowForm] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [auth, setAuth] = useState<any>(null);
    const [globalMsg, setGlobalMsg] = useState<null | boolean | string>(null);

    // verify
    useEffect(() => {
        fetchVerify().then(user => {
            if (user) { setAuth(user) }
        });
    }, []);

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light"

            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        },
        showForm,
        setShowForm,
        openSidebar,
        setOpenSidebar,
        auth,
        setAuth,
        globalMsg,
        setGlobalMsg,
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}
