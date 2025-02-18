import { Button } from "./ui/button";
import { useTheme } from "@/contexts/theme-provider";
import { Moon, SearchIcon, Sun, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {

    const { theme, setTheme, showForm, setShowForm, openSidebar, auth } = useTheme();
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <header className="fixed top-0 right-0 w-full h-20 py-4 px-14 max-md:px-8 flex items-center justify-between z-10">

            <Link
                to="/"
                className={`text-3xl ml-20 max-md:ml-8 font-semibold transition-all duration-500 ${openSidebar === true ? "opacity-0" : 'opacity-100'}`}
            >
                Blog
            </Link>

            <div className="w-auto h-full flex justify-end items-center gap-5 max-md:gap-4">

                <>
                    {
                        pathname === "/" && auth && (
                            <Button
                                variant="outline"
                                onClick={() => setShowForm(!showForm)}
                                className={`w-12 h-12 text-4xl rounded-full border-none  ${showForm ? 'bg-[#dc3545] hover:bg-red-700' : 'bg-[#0d6efd] hover:bg-blue-700'} text-white`}
                            >
                                {showForm ? <X className="text-2xl" /> : "+"}
                            </Button>
                        )
                    }
                </>

                <>
                    {
                        <Link to="/search">
                            <SearchIcon />
                        </Link>
                    }
                </>


                <>
                    {
                        theme === "dark" ?
                            <Sun onClick={() => setTheme("light")} className="w-9 h-auto cursor-pointer" /> :
                            <Moon onClick={() => setTheme("dark")} className="w-9 h-auto cursor-pointer" />
                    }
                </>


            </div>

        </header>
    )
}
