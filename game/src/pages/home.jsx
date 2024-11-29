import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { User, CirclePlus, PackagePlus, PlusCircle, MinusCircle, CrossIcon, Captions, Link } from "lucide-react"
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { activeRoomAtom, usernameAtom } from "../store/atoms";
import { useNavigate } from "react-router";
import { useSocket } from "../hooks/usesocket";
import { PlayerBar } from "../components/playerBar";
import { Toast } from "../components/Toast";
import { v4 as uuidv4 } from 'uuid';

export const HomePage = () => {
    const [scope, animate] = useAnimate();
    const [text, setText] = useState("Play Now!")
    const username = useRecoilValue(usernameAtom)
    const navigate = useNavigate()

    useEffect(() => {
        if (username === "") {
            navigate("../")
        }
    }, [])

    const handleAnimateInput = () => {
        if (text === "") return
        
        setText("")
        animate(".button", { top: "0%", zIndex: "10", width: "200vw", height: "200vh" }, {
            duration: 0.2,
            ease: "linear",
            type: "spring"
        });
    };

    const handleClose = () => {
     
        setText("Play Now!")
        animate(".button", { top: "70%", zIndex: "0", width: "fit-content", height: "fit-content" }, {
            duration: 0.2,
            ease: "linear",
            type: "spring",
        });
    }
  

    return (
        <>
            {text === "" && <motion.div
                initial={{ transform: "rotate(345deg" }}
                animate={{ transform: "rotate(-45deg" }}
                transition={{ duration: 1, type: "spring" }}
                onClick={handleClose}
                className=" z-[200] top-10 right-10 fixed :scale-110 cursor-pointer active:scale-95 " >
                <CrossIcon size={50} />
            </motion.div>}
            <div ref={scope} >

                <div
                    onClick={handleAnimateInput}
                    style={{ position: 'fixed', left: '50%', top: '70%', transform: 'translateX(-50%)' }}
                    className="pixelify-sans button cursor-pointer bg-pink-300 rounded-full py-5 w-fit px-10 hover:scale-105 active:scale-90 backdrop-blur-md transition-all duration-300"
                >
                    {text}

                    {text === "" && <AnimatePresence>
                        <motion.div

                        >
                            <h6 className="fixed text-amber-300 title2 text-8xl top-[5%] left-1/2 translate-x-[-50%]" >MidFruits</h6>
                            <PlayGame />


                        </motion.div></AnimatePresence>}
                </div>
            </div>
        </>

    );
};

const PlayGame = () => {
    return (<div
        className="flex justify-center items-center gap-10 text-md flex-col pixelify-sans  bg-yellow-200 w-fit h-fit px-16 py-14 rounded-lg fixed top-52 left-1/2 translate-x-[-50%]" >

        {["Play Solo","Join a Room", "Create Room"].map((content, ind) => <Button content={content} key={ind} />)}

    </div>)
}

const Button = ({ content }) => {
  
    let ButtonSvg = <></>
    const [showModal, setShowModal] = useState("")
    const navigate = useNavigate()
    const {createRoom} = useSocket()
    const [showToast, setShowToast] = useState(false)
    const [toastVal, setToastVal] = useState("")
    
    const handleBtnBro = (content) => {
        
        switch (content) {
            case "Create Room":
                setShowModal("create")
                break;
            case "Join a Room":
                setShowModal("join")
                break;
            case "Play Solo":
                playSolo();
                setShowLoading(true);
                break;
        }
    }


    switch (content) {
        case "Play Solo":
            ButtonSvg = <User size={30} />
            break;
        case "Join a Room":
            ButtonSvg = <CirclePlus size={30} />
            break;

        case "Create Room":
            ButtonSvg = <PackagePlus size={30} />
    }

    const username = useRecoilValue(usernameAtom)
    const [roomLimit, setRoomLimit] = useState(1)
    const [roomLink, setRoomLink] = useState("")
    const setActiveRoom = useSetRecoilState(activeRoomAtom)
    

    const changeRoomLimit = (sign) => {
        switch (sign) {
            case "plus":
                if (roomLimit == 4) {
                   
                    return;
                }
                setRoomLimit(rooml => rooml + 1);
                break;
            case "minus":
                if (roomLimit == 1) {
                  
                    return;
                }
                setRoomLimit(rooml => rooml - 1);
        }
    }

    const handleClickRoomCreation = (type="multi") => {


        if (roomnameRef.current && roomnameRef.current.value === "") { 
            setToastVal("Room name cannot be empty!")
            setShowToast(true)
            return;
        }
        
        createRoom(roomnameRef.current.value, roomLimit, username)
        setRoomLink("room/" + roomnameRef.current.value)
        setActiveRoom(roomnameRef.current.val)
        if(type === "solo"){
            navigate(`../room/${roomnameRef.current.value}`)
        }

    }

    const [showLoading, setShowLoading] = useState(false)

    const playSolo = () => {
        setShowLoading(true)
        const randomString = uuidv4();
        roomnameRef.current = {value: randomString}
        
        handleClickRoomCreation("solo")
    }

    const roomnameRef = useRef()

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log("Text copied to clipboard");
            })
            .catch((error) => {
                console.error("Failed to copy text: ", error);
            });
        setShowToast(true)
        setToastVal("Invite link copied to clipboard")
    }

    const joinRoomRef = useRef()

    const handleRoomjoin = () => {
        
        if(joinRoomRef.current.value.trim() !== "")
        navigate(`../room/${joinRoomRef.current.value}`)
        else {
            setShowToast(true)
            setToastVal("invalid Room Name")
        }

    }

    return (<div className="flex gap-10 justify-center items-center" >
        {ButtonSvg}
        <button onClick={() => { handleBtnBro(content) }} className="bg-pink-300 px-10 active:scale-95 hover:scale-105 w-52 duration-75 ease-linear h-fit py-3 rounded-full" >{content==="Play Solo" && showLoading ? "starting game..." : content}</button>
    
        {showToast && <Toast showToast={showToast} setShowToast={setShowToast} msg={toastVal} />}
        <AnimatePresence>
            {showModal == "create" ? <ModalMid>
                <h2 >Create a Room!</h2>
                <label htmlFor="room-name" >Room name:</label>
                <input ref={roomnameRef} id="room-name" className="py-2
                px-4 rounded-lg
                outline-none"  placeholder="room-name" />
                <label htmlFor="room-limit">{`Room limit: ${roomLimit}`} </label>

                <div className="flex flex-col justify-center items-start gap-4" >
                    <PlayerBar type={"roomlimit"} val={(roomLimit) / 4 * 100} />
                    <div className="flex gap-2" >
                        <div onClick={() => changeRoomLimit("minus")} className="cursor-pointer active:scale-95" ><MinusCircle size={30} /></div>
                        <div onClick={() => changeRoomLimit("plus")} className="active:scale-95  cursor-pointer" ><PlusCircle size={30} /></div>
                    </div>

                </div>
                {
                    roomLink === "" ? <ModalButton handleClick={handleClickRoomCreation}
                        content={"Create Room"}
                    /> : <div className="flex justify-between" >
                        <ModalButton handleClick={() => navigate("/room/" + roomnameRef.current.value)} content="Join Room" />
                        <ModalButton handleClick={() => copyToClipboard("https://midfruits.vercel.app/room/" + roomnameRef.current.value)} content="Invite Friends" />
                    </div>
                }</ModalMid> :
                (showModal === "join" ? <ModalMid>
                    <h2 >Join Room!</h2>
                    <label htmlFor="room-name" >Room name:</label>
                    <input ref={joinRoomRef} id="room-name" className="py-2
                px-4 rounded-lg
                outline-none"  placeholder="room-name" />

                    <ModalButton content="Join Room" handleClick={handleRoomjoin} />

                </ModalMid> : <></>)
            }
        </AnimatePresence>
    </div>)
}


const ModalButton = ({ content, handleClick }) => {
    return (<button
        onClick={handleClick}
        className="bg-amber-200 p-2  hover:scale-105 rounded flex justify-center items-center outline-none active:scale-95" ><p className="mt-1" >{content}</p></button>)
}



const ModalMid = ({ children }) => {
    return (<>
        <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-fit h-fit rounded-lg flex-col  fixed z-[100] text-lg gap-6 bg-pink-200 py-6 px-14 top-24 left-1/2 translate-x-[-50%] translate-y-[-50%] " >
            {children}
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed w-screen h-[200vh] backdrop-blur-3xl z-[90]" >
        </motion.div>
    </>)
}
