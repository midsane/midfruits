import { useEffect } from "react"
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
const Toast = ({ msg, showToast, setShowToast, time = 2000 }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowToast(false)
        }, time);

        return () => clearTimeout(timeout)
    })

    return createPortal(<AnimatePresence>
        {showToast && <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-pink-300 border border-pink-200  bg-gradient-to-r from-pink-200 to-fuchsia-200 shadow-inner shadow-pink-100 backdrop-hue-rotate-90 fixed z-[300] top-0 right-0 rounded p-10 " >
            <p className="text-center" >{msg}</p>
        </motion.div>}
    </AnimatePresence>,
        document.getElementById("root"))
}

export {
    Toast
}