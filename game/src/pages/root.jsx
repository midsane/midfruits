import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useNavigate } from "react-router";
import { useSocket } from "../hooks/usesocket";
import { useEffect, useRef } from "react";
import { Title } from "../components/title";
import { usernameAtom } from "../store/atoms";
import { useRecoilState } from "recoil";
export const Root = ({ children }) => {
    const [username, setUsername] = useRecoilState(usernameAtom)
    const navigate = useNavigate()
    const usernameRef = useRef()
    const variants = {
        initial: {
            backgroundPosition: "0 50%",
        },
        animate: {
            backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
        },
    };

    const { connectSocket } = useSocket()
    useEffect(() => {
        connectSocket();
    }, [])

    const handleClick = () => {
        if (usernameRef.current.value === "") {
            console.log("naam to dalo")
        }
        setUsername(usernameRef.current.value)
        setTimeout(() => {
            painSound.play()
        }, 1000);
        navigate("home")

    }

    const painSound = new Audio("/assets/deadpoolsound.mp3")

    return (<div className="w-screen h-screen min-h-screen" >
        <motion.div
            initial="initial"
            animate="animate"
            variants={variants}
            transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
            }}
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
            style={{
                background:
                    "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
                backgroundSize: "400% 400%",
            }}>
            <Title />
            <AnimatePresence>
                {username === "" && <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, }}
                    transform={{ duration: 1 }}
                    className="fixed z-50 rounded-full flex justify-center items-center bg-pink-300 p-96 left-1/2 top-1/2  translate-x-[-50%] translate-y-[-50%] " ><dialog className="rounded-lg p-20" open>
                        <div className="flex flex-col" >
                            <p className="pixelify-sans m-auto my-4 text-4xl" > Welcome to MidBlade</p>
                            <input ref={usernameRef} className="p-10 rounded-lg bg-slate-100 text-2xl pixelify-sans" placeholder="username" />
                            <button onClick={handleClick} className="cursor-pointer hover:bg-amber-300 px-6 py-2 active:scale-95 bg-amber-200 pixelify-sans" >ok</button>
                        </div>

                    </dialog></motion.div>}
            </AnimatePresence>
            <Outlet>{children}</Outlet>
        </motion.div>
    </div>

    );
}