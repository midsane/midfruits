import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CrossIcon, User, CirclePlus, PackagePlus, PlusCircle, MinusCircle } from "lucide-react"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { activeRoomAtom, usernameAtom } from "../store/atoms";
import { useNavigate } from "react-router";
import { useSocket } from "../hooks/usesocket";
import { PlayerBar } from "../components/playerBar";


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
        console.log("button  1 clicked")
        setText("")
        animate(".button", { top: "50%", scale: "20", zIndex: "10" }, {
            duration: 0.3,
            ease: "linear",
            type: "spring"
        });
    };

    const handleClose = () => {
        console.log("button  2 clicked")
        setText("Play Now!")
        animate(".button", { top: "70%", scale: "1", zIndex: "0" }, {
            duration: 0.5,
            ease: "linear",
            type: "spring",
        });
    }
    console.log(text)

    return (<div ref={scope} >
        <div
            onClick={handleAnimateInput}
            style={{ position: 'fixed', left: '50%', top: '70%', transform: 'translateX(-50%)' }}
            className="pixelify-sans button cursor-pointer bg-pink-300 rounded-full py-5 w-fit px-10 hover:scale-105 active:scale-90 backdrop-blur-md transition-all duration-300"
        >
            {text}

            {text === "" && <AnimatePresence>
                <motion.div

                >
                    <h6 className="fixed text-amber-300 title2 text-[0.4rem] top-[5%] left-1/2 translate-x-[-50%]" >MidBlade</h6>
                    <PlayGame />

                    {text === "" && <motion.div
                        initial={{ transform: "rotate(345deg" }}
                        animate={{ transform: "rotate(-45deg" }}
                        transition={{ duration: 1, type: "spring" }}
                        onClick={handleClose}
                        className="absolute top-3 right-6 hover:scale-110 cursor-pointer active:scale-95 " >
                        <CrossIcon size={2} />
                    </motion.div>}
                </motion.div></AnimatePresence>}
        </div>
    </div>

    );
};

const PlayGame = () => {
    return (<div
        className="flex justify-center items-center gap-[0.1rem] text-[0.1rem] flex-col pixelify-sans bg-yellow-200 w-10 h-6 rounded-sm fixed top-1/4 left-1/2 translate-x-[-50%]" >

        {["Play Solo", "Join a Room", "Create Room"].map((content, ind) => <Button content={content} key={ind} />)}

    </div>)
}

const Button = ({ content }) => {
    let ButtonSvg = <></>
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()
    const { createRoom } = useSocket()
    const handleBtn = (content) => {
        switch (content) {
            case "Create Room":
                setShowModal(true)
        }
    }


    switch (content) {
        case "Play Solo":
            ButtonSvg = <User size={2} />
            break;
        case "Join a Room":
            ButtonSvg = <CirclePlus size={2} />
            break;

        case "Create Room":
            ButtonSvg = <PackagePlus size={2} />
    }

    const username = useRecoilValue(usernameAtom)
    const [roomLimit, setRoomLimit] = useState(1)
    const [roomLink, setRoomLink] = useState("")
    const setActiveRoom = useSetRecoilState(activeRoomAtom)
    const changeRoomLimit = (sign) => {
        switch (sign) {
            case "plus":
                if (roomLimit == 4) {
                    console.log("room max val cannot be more than 4");
                    return;
                }
                setRoomLimit(rooml => rooml + 1);
                break;
            case "minus":
                if (roomLimit == 1) {
                    console.log("room max val cannot be less than 1");
                    return;
                }
                setRoomLimit(rooml => rooml - 1);
        }
    }

    const handleClickRoomCreation = () => {


        if (roomnameRef.current && roomnameRef.current.value === "") {
            console.log("room name cannot be empty");
            return;
        }

        createRoom(roomnameRef.current.value, roomLimit, username)
        setRoomLink("room/" + roomnameRef.current.value)
        setActiveRoom(roomnameRef.current.val)

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
    }

    return (<div className="flex gap-[0.125rem] justify-center items-center" >
        {ButtonSvg}
        <button onClick={() => handleBtn(content)} className="bg-pink-300 px-1 active:scale-95 hover:scale-105 w-fit min-w-5 duration-75 ease-linear h-fit py-[1px] rounded-full" >{content}</button>
        <AnimatePresence>
            {showModal && <>
                <div
                    className="flex w-fit h-fit rounded-sm flex-col gap-[2px] fixed z-[100] bg-pink-200 py-[2px] px-[3px] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] " >
                    <h2 >Create a Room!</h2>
                    <label htmlFor="room-name" >Room name:</label>
                    <input ref={roomnameRef} id="room-name" className="py-[1px]
                px-[1px] rounded-[2px]
                outline-none"  placeholder="room-name" />
                    <label htmlFor="room-limit">{`Room limit: ${roomLimit}`} </label>

                    <div className="flex justify-between items-center h-1 w-full" >
                        <PlayerBar type={"roomlimit"} val={(roomLimit) / 4 * 100} />
                        <div onClick={() => changeRoomLimit("minus")} className="cursor-pointer active:scale-95" ><MinusCircle size={2} /></div>
                        <div onClick={() => changeRoomLimit("plus")} className="active:scale-95  cursor-pointer" ><PlusCircle size={2} /></div>

                    </div>
                    {roomLink === "" ? <ModalButton handleClick={handleClickRoomCreation}
                        content={"Create Room"}
                    /> : <div className="flex justify-between" >
                        <ModalButton handleClick={() => navigate("/room/" + roomnameRef.current.value)} content="Join Room" />
                        <ModalButton handleClick={() => copyToClipboard("http://localhost:5173/room/" + roomnameRef.current.value)} content="Invite Friends" />
                    </div>
                    }
                </div>
                <div className="fixed w-screen h-screen backdrop-blur-3xl z-[90]" >
                </div>
            </>}
        </AnimatePresence>
    </div>)
}


const ModalButton = ({ content, handleClick }) => {
    return (<button
        onClick={handleClick}
        className="bg-amber-200 rounded flex justify-center items-center outline-none active:scale-95" ><p className="mt-[1px]" >{content}</p></button>)
}