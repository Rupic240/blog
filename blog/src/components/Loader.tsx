import { motion } from "framer-motion"

export default function Loader() {
    return (
        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
            <motion.div
                className="w-14 h-14 rounded-full border-4 border-t-blue-600"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    )
}
