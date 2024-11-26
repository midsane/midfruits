import { useEffect, useState } from "react"
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CircularProgressBar } from "./circularProgressBar";
const Toast = ({ msg, showToast, setShowToast, time = 3000 }) => {
    const [timeRem, setTimeRem] = useState(time)
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRem(prev => prev - 1000)
        }, 1000);

        const timeout = setTimeout(() => {
            setShowToast(false)
        }, time+800);

        return () => {
            clearTimeout(timeout) 
            clearInterval(interval)
        }
    }, [])


    return createPortal(<AnimatePresence>
        {showToast && <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-pink-300 border border-pink-200  bg-gradient-to-r from-pink-200 to-fuchsia-200 shadow-inner shadow-pink-100 backdrop-hue-rotate-90 fixed z-[300] top-0 right-0 rounded p-10 " >
            <p className="text-center" >{msg}</p>
            <div className="absolute bottom-1 right-1" >
                <CircularProgressBar progress={Math.floor((timeRem/time)*100)} size={35}/> 
            </div>
        </motion.div>}
    </AnimatePresence>,
        document.getElementById("root"))
}

export {
    Toast
}