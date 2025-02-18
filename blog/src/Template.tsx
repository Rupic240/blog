import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { useTheme } from "./contexts/theme-provider";
import Header from "./components/Header";
import { ScrollArea } from "./components/ui/scroll-area";
import { AnimatePresence, motion } from 'framer-motion'
import PageTransition from "./components/PageTransition";
import { Alert, AlertDescription } from "./components/ui/alert";
import { Dialog } from "@radix-ui/react-dialog";

export default function Template() {

    const location = useLocation();
    const { openSidebar, setOpenSidebar, theme, globalMsg, setGlobalMsg } = useTheme();

    useEffect(() => {
        if (globalMsg) {
            const timer = setTimeout(() => {
                setGlobalMsg(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [globalMsg, setGlobalMsg]);

    return (
        <SidebarProvider open={openSidebar} onOpenChange={setOpenSidebar} className="bg-[#d8d8d8] dark:bg-black" >
            <AppSidebar />

            <SidebarTrigger variant={null} className="z-20 mt-3 ml-3 w-14 h-14 dark:text-white" />
            <PageTransition /> 

            <AnimatePresence>
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 1 }}
                    animate={{
                        opacity: 0,
                        transition: {
                            delay: 1,
                            duration: 0.5,
                            ease: "easeInOut"
                        }
                    }}
                    className="fixed top-0 z-20 w-screen h-screen bg-white pointer-events-none dark:bg-black"
                />

                <ScrollArea className={`max-w-screen w-full h-screen ${theme === "dark" ? 'bg-black text-white' : 'bg-[#d8d8d8] text-black'}`}>

                    {/* Dialog */}
                    <Dialog> 
                        <Header />

                        <div className="max-w-[600px] h-auto mx-auto pt-20">
                            <Outlet />
                        </div>
                    </Dialog>

                    <Alert
                        className={`w-96 max-md:w-full absolute bottom-5 right-1/2 translate-x-1/2 ${globalMsg ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <AlertDescription>
                            {globalMsg}
                        </AlertDescription>
                    </Alert>

                </ScrollArea>
            </AnimatePresence>

        </SidebarProvider>
    )
}
