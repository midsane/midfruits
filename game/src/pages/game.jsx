
import { Player } from "../components/Player"
import { Music } from "../components/Music";
import { MagicItem } from "../components/MagicItem";
import { ObstaclePosition } from "../components/Obstacle";
import { GameArena } from "../components/GameArena";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Enemy } from "../components/Enemy";
import { useSocket } from "../hooks/usesocket";
import { useEffect, useRef, useState } from "react";
import { activeRoomAtom, currentPlayerAtom, isRoomFullAtom, playersAtom, socketIdAtom, usernameAtom } from "../store/atoms";
import { useParams } from "react-router";
import { Modal } from "../components/Modal";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toast } from "../components/Toast";
import { Settings } from "lucide-react";

export default function GamePage() {
    const [players, setPlayers] = useRecoilState(playersAtom)
    const [currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerAtom)
    const [username, setUsername] = useRecoilState(usernameAtom)
    const isRoomFull = useRecoilValue(isRoomFullAtom)
    const {
        getRoomData,
        connectSocket,
        checkRoomAvailibility,
        joinRoom } = useSocket()

    const [askUser, setAskUser] = useState(false)
    const usernameRef = useRef()
    const { gameId } = useParams()
    const socketId = useRecoilValue(socketIdAtom)
    const setActiveRoom = useSetRecoilState(activeRoomAtom)
    const [doesRoomExist, setDoesRoomExist] = useState(true)
    const [showToast, setShowToast] = useState(false)
    const [showSetting, setShowSetting] = useState(false)

    const handleClick = () => {

        if (usernameRef.current.value === "") {
            console.log('username cannot be empty');
            return
        }
        setUsername(usernameRef.current.value)
    }


    useEffect(() => {

        if (username === "") {
            connectSocket()
            setAskUser(true)
        }
        else if (socketId) {

            setAskUser(false)
            setActiveRoom(gameId)
            joinRoom(gameId, username)

            checkRoomAvailibility();
            console.log("calling getroomdata from game.jsx")
            getRoomData(setPlayers, setCurrentPlayer, currentPlayer, doesRoomExist)
            console.log(askUser)

        }
    }, [username, socketId])
    console.log(isRoomFull)
    console.log(askUser)

    if (askUser) {
        return <>
            {!doesRoomExist && <Toast setShowToast={setDoesRoomExist} showToast={doesRoomExist} msg="room does not exist" />}
            <div className="w-screen h-screen relative z-[20] bg-pink-200" ></div>
            <div className="bg-red-200 border-2 border-pink-300  w-fit z-[100] translate-x-[-50%] translate-y-[-50%] fixed top-0 left-1/2 flex flex-col my-96 text-xl p-10 m-auto rounded" ><input ref={usernameRef} placeholder="username" />
                <button onClick={handleClick} className="hover:scale-105 active:scale-95 bg-yellow-200" >ok</button>
            </div></>
    }
    else {
        return (<>
            {!doesRoomExist && <Toast setShowToast={setDoesRoomExist} showToast={doesRoomExist} msg="room does not exist" />}
            <AnimatePresence>{isRoomFull && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-fit flex flex-col gap-4 p-10 h-fit bg-pink-300 rounded fixed z-50 translate-x-[-50%] left-1/2 top-1/2 translate-y-[-50%]" >
                <p>Sorry, This room is completely filled!</p>
                <Link to="/" ><button className="rounded-full hover:scale-105 active:scale-95 duration-75 ease-linear bg-amber-300 p-2 " >Go to Home Page...</button></Link>
            </motion.div>}</AnimatePresence>
            {!players ? <>loading...</> :
                <GameArena>
                    <Player />
                    <Music />
                    <ObstaclePosition />

                    {/* <MagicItem />
            <Enemy /> */}
                    <div onClick={() => setShowSetting(prev => !prev)} className="fixed cursor-pointer z-50 active:scale-95 hover:scale-105 top-0 backdrop-blur-3xl right-0 " ><Settings size={50} color="black" /></div>
                {showSetting && <SettingPanel />}
                </GameArena>

            }</>)
    }

}


const SettingPanel = () => {
    return (<div className="p-10  text-2xl pt-20 rounded-sm fixed z-10 top-0 gap-4 bg-pink-300 right-0 flex flex-col"> 
        <p>{`Room name: ${"lkasdjf"}`}</p>
        <div className="flex flex-col gap-2 " >
           <p className="bg-amber-200" >adi</p>
            <p className="bg-amber-200" >lavneesh</p>
            <p className="bg-amber-200" >yoyo</p>
        </div>
        <button className="bg-amber-300 p-2 active:scale-95 hover:scale-105 " >Leave Room</button>
    </div>)
}

