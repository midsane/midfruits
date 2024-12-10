import { AnimatePresence, motion } from "framer-motion"
import { useRecoilState } from "recoil"
import { chagneInScoreAtom } from "../store/atoms"
import { useEffect } from "react"
import { createPortal } from "react-dom"

export const ChangeInScore = () => {
    const [changeInScore, setChangeInScore] = useRecoilState(chagneInScoreAtom);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setChangeInScore(0);
        }, 500);

        return () => clearTimeout(timeout)
    }, [changeInScore])
    const displayChange = changeInScore > 0?'+' + changeInScore : changeInScore
    return (createPortal(<AnimatePresence>
        {changeInScore != 0 && <motion.h1
            className={`fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-9xl ${changeInScore > 0 ? "text-amber-300" : "text-red-500"}`}
            initial={{ opacity: 0, scale: 0.9, y:-30 }}
            animate={{ opacity: 1, scale: 1, y:0 }}
            exit={{ opacity: 0, scale: 0.9 , y:30}}
        >
            {displayChange}
        </motion.h1>}
    </AnimatePresence>, document.body))
}