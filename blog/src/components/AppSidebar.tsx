import { Home, LogInIcon, LogOutIcon, UserIcon, UserPlus2Icon } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useTheme } from "@/contexts/theme-provider"
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";

export function AppSidebar() {

    const { auth, setAuth, openSidebar } = useTheme();
    const navigate = useNavigate();

    return (
        <Sidebar collapsible="icon" className="z-20">
            <SidebarHeader className={`h-auto items-center py-10 bg-[#404040] dark:bg-[#373737] transition-all duration-500 ${openSidebar === false ? 'h-32': 'h-52'}`}>
                <Avatar className={`w-20 h-20 text-3xl font-semibold transition-all duration-500  ${openSidebar === false ? 'w-12 h-12 rounded-md ' : 'rounded-full'}`}>
                    <AvatarImage src="/" alt="profile" />
                    {
                        !auth ? (
                            <UserIcon className="w-full h-full bg-cyan-500 p-2" />
                        ) : (
                            <AvatarFallback>{auth.name[0]}</AvatarFallback>
                        )
                    }
                </Avatar>
                
                {
                    openSidebar === true && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    delay: 0.3,
                                    duration: 0.5,
                                    ease: "easeInOut"
                                }
                            }}
                            className="text-center"
                        >
                            <h1 className="text-2xl font-semibold text-white">{auth ? auth.name : "Guest"}</h1>
                            <h2 className="text-white/70">@{auth ? auth.username : "guest"}</h2>
                        </motion.div>
                    ) 
                }

            </SidebarHeader>

            <SidebarContent className="dark:bg-[#404040] bg-[#373737] border-none text-white py-3">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild
                                    className="h-10 hover:bg-lime-400 hover:text-black text-lg"
                                >
                                    <Link to="/">
                                        <Home />
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {
                                !auth ? (
                                    <>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild
                                                className="h-10 hover:bg-lime-400 hover:text-black text-lg"
                                            >
                                                <Link to="/register">
                                                    <UserPlus2Icon />
                                                    <span>Register</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild
                                                className="h-10 hover:bg-lime-400 hover:text-black text-lg"
                                            >
                                                <Link to="/login">
                                                    <LogInIcon />
                                                    <span>Login</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </>
                                ) : (
                                    <>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild
                                                className="h-10 hover:bg-lime-400 hover:text-black text-lg"
                                            >
                                                <Link to={`/profile/${auth.id}`}>
                                                    <UserIcon />
                                                    <span>Profile</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                className="h-10 hover:bg-lime-400 hover:text-black text-lg"
                                                onClick={() => {
                                                    localStorage.removeItem('token');
                                                    setAuth(null);
                                                    navigate('/');
                                                }}
                                            >
                                                <LogOutIcon />
                                                <span>Logout</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </>
                                )
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

        </Sidebar >
    )
}