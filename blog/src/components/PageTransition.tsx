import { AnimatePresence, motion } from "framer-motion"
import { useLocation } from "react-router-dom";

const pageAnimation = {
    initial: {
        x: "100%",
        width: "100%"
    },
    animate: {
        x: "0%",
        width: "0%"
    },
    exit: {
        x: ["0%", "100%"],
        width: ["0%", "100%"]
    },
}

export default function PageTransition() {

    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                className="absolute top-0 left-0 w-full h-full"
            >
                <motion.div
                    className="fixed w-screen h-screen top-0 right-full z-50 bg-neutral-800"
                    variants={pageAnimation}
                    initial="initial"
                    animate="animate" exit="exit"
                    transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
                />
                <motion.div
                    className="fixed w-screen h-screen top-0 right-full z-40 bg-neutral-700"
                    variants={pageAnimation}
                    initial="initial"
                    animate="animate" exit="exit"
                    transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
                />
                <motion.div
                    className="fixed w-screen h-screen top-0 right-full z-30 bg-neutral-600"
                    variants={pageAnimation}
                    initial="initial"
                    animate="animate" exit="exit"
                    transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
                />
            </motion.div>
        </AnimatePresence>
    )
}
