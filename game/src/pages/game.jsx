
import { Player } from "../components/Player"
import { Music } from "../components/Music";
import { Fruits } from "../components/fruit";
import { ObstaclePosition } from "../components/Obstacle";
import { GameArena } from "../components/GameArena";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useSocket } from "../hooks/usesocket";
import { useEffect, useRef, useState } from "react";
import {
    activeRoomAtom,
    currentPlayerAtom,
    gameHasEndedAtom,
    isRoomInvalidAtom,
    playersAtom,
    socketIdAtom,
    startGameAtom,
    timeRemGameAtom,
    usernameAtom
} from "../store/atoms";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toast } from "../components/Toast";
import { Settings } from "lucide-react";
import { Background } from "../components/Background";
import { createPortal } from "react-dom";
import { PlayerBar } from "../components/playerBar";
import { MidFruitLoading } from "../components/Loading";
import { Title } from "../components/title";
import { MobileView } from "./mobile";
import { DoorOpen, Award } from "lucide-react"


export default function GamePage() {
    const [players, setPlayers] = useRecoilState(playersAtom)
    const [currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerAtom)
    const [username, setUsername] = useRecoilState(usernameAtom)
    const isRoomInvalid = useRecoilValue(isRoomInvalidAtom)

    const {
        getRoomData,
        connectSocket,
        checkRoomAvailibility,
        joinRoom } = useSocket()

    const [askUser, setAskUser] = useState(false)
    const usernameRef = useRef()
    const { gameId } = useParams()
    const socketId = useRecoilValue(socketIdAtom)
    const [activeRoom, setActiveRoom] = useRecoilState(activeRoomAtom)
    const [doesRoomExist, setDoesRoomExist] = useState(true)
    const [startGame, setStartGame] = useRecoilState(startGameAtom)
    const [showSetting, setShowSetting] = useState(false)
    const [gameHasEnded, setGameHasEnded] = useRecoilState(gameHasEndedAtom)

    const [isSmallScreen, setIsSmallScreen] = useState(false)

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 1000)
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)

        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])



    const handleClick = () => {

        if (usernameRef.current.value === "") {

            return
        }
        setUsername(usernameRef.current.value)
    }



    useEffect(() => {
        if (players?.gameHasStarted) {

            setStartGame(true)
        }
    }, [players])

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

            getRoomData(setPlayers, setCurrentPlayer, currentPlayer, doesRoomExist)


        }
    }, [username, socketId])


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
            {isSmallScreen ? <MobileView /> :
                <Background>
                    {!doesRoomExist && <Toast setShowToast={setDoesRoomExist} showToast={doesRoomExist} msg="room does not exist" />}
                    <AnimatePresence>{isRoomInvalid && <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-fit flex flex-col text-xl gap-6 p-20 h-fit bg-pink-300 rounded-lg fixed z-10 translate-x-[-50%] left-1/2 top-1/2 translate-y-[-50%]" >
                        <p>{isRoomInvalid}</p>
                        <Link to="/" ><button className="rounded-full hover:scale-105 active:scale-95 duration-75 ease-linear bg-amber-300 p-2 " >Go to Home Page...</button></Link>
                    </motion.div>}</AnimatePresence>
                    {!players ? <MidFruitLoading /> :
                        <GameArena>
                            <AnimatePresence>
                                {!startGame && <StartGamePanel players={players} />}
                            </AnimatePresence>
                            <AnimatePresence>
                                {gameHasEnded && <LeaderBoard />}
                            </AnimatePresence>
                            <Player />
                            <Music />
                            <ObstaclePosition />
                            <Fruits />
                            {startGame && !gameHasEnded && <GameCounter />}
                            <SettingIcons setShowSetting={setShowSetting} />
                            <AnimatePresence>
                                {showSetting && <SettingPanel players={players} />}
                            </AnimatePresence>
                        </GameArena>

                    }</Background>}
        </>)
    }

}

const SettingIcons = ({ setShowSetting }) => {
    return (createPortal(<motion.div onClick={() => setShowSetting(prev => !prev)}
        className="fixed z-50 cursor-pointer active:scale-95 hover:scale-105 top-0 backdrop-blur-3xl right-0 " >
        <Settings size={50} color="black" />
    </motion.div>, document.body))
}

const LeaderBoard = () => {
    const gameEndedsongRef = useRef()
    const players = useRecoilValue(playersAtom)
    const playersClone = structuredClone(players)

    gameEndedsongRef.current = new Audio("/assets/game-end.mp3")
    gameEndedsongRef.current.volume = 0.3

    useEffect(() => {

        gameEndedsongRef.current.play();

        return () => {
            gameEndedsongRef.current.pause();
            gameEndedsongRef.current.currentTime = 0;
        }
    }, [])

    const sortAccToPoints = (arr) => {

        return arr.sort((a, b) => b.points - a.points);
    }
    const sortedPoints = sortAccToPoints(playersClone.participants)

    return (createPortal(
        <div className="bg-green-200 flex flex-col gap-10 items-center justify-center w-fit 
        h-fit px-20 py-10 text-2xl rounded-lg left-1/2 fixed z-10  top-1/2 translate-x-[-50%] translate-y-[-50%]" >
            <Title />
            {sortedPoints.map((p, i) =>

                <div
                    key={i}
                    className="flex justify-between gap-10 w-96" >
                    <span className="flex gap-2" >
                        <h2>{i + 1}.</h2>
                        <Award size={40} />
                    </span>
                    <h2>{p.playerName.slice(0, 8) + "..."}</h2>
                    <h2>{p.points} points</h2>
                </div>

            )}
            <Link to='/' >
                <button className="py-4 px-10 rounded-full bg-amber-200 hover:bg-amber-300 active:scale-95 hover:scale-105 duration-75 " >Go to HomePage</button>
            </Link>
        </div>
        , document.body))
}

const GameCounter = () => {
    const [timeRemGame, setTimeRemGame] = useRecoilState(timeRemGameAtom)
    const [gameHasEnded, setGameHasEnded] = useRecoilState(gameHasEndedAtom)

    useEffect(() => {
        const gameClockInterval = setInterval(() => {

            if (timeRemGame <= 0) {

                setGameHasEnded(true)
            }
            else
                setTimeRemGame(prev => prev - 1000)
        }, 1000);

        return () => clearInterval(gameClockInterval)
    }, [timeRemGame])

    const timeFormatter = (time) => {
        const seconds = time / 1000;

        const minutes = seconds / 60;
        const remSeconds = seconds % 60;

        return { minutes, remSeconds }
    }

    const formattedTime = timeFormatter(timeRemGame)
    const minutes = Math.floor(formattedTime.minutes);
    const seconds = formattedTime.remSeconds;



    return (createPortal(<div className="rounded text-3xl bg-white text-emerald-500 p-2 w-fit z-50 fixed top-4 left-1/2 translate-x-[-50%]" >
        {minutes + " : " + seconds}
    </div>, document.body))

}


const StartGamePanel = ({ players }) => {
    const [startGame, setStartGame] = useState(false)
    const audioRef = useRef()
    useEffect(() => {
        audioRef.current = new Audio("/assets/dattebayo.mp3")
    }, [])
    let playersJoined = 0;
    for (let player of players.participants) {
        if (player.startGame) playersJoined++;
    }
    const val = (playersJoined / players.roomLimit) * 100;
    return (createPortal(<motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-screen h-screen z-10 fixed flex justify-center items-center "
    >
        <div className="p-10 rounded-md flex flex-col gap-2  fixed top-40  border-2  border-black
         bg-emerald-400 justify-center items-center text-xl z-50" >

            <h1 className="text-3xl text-amber-300 " >Game Rules:</h1>
            <p>fruits with prime numbers are worth +5 points</p>
            <p>fruits with even numbers except 2 are worth -5 points</p>
            <p>fruits with odd numbers are worth -3 points</p>
            <GameRoomBtn startGame={startGame} content="Start Game!"
                onClick={() => {
                    audioRef.current.play()
                    setStartGame(true)
                }}
            />
            <p>{`${playersJoined} /${players.roomLimit} players have started the game`}</p>
            <PlayerBar val={val} />
        </div>


    </motion.div>, document.body))
}

const SettingPanel = ({ players }) => {
    const currentPlayer = useRecoilValue(currentPlayerAtom)
    const activeRoom = useRecoilValue(activeRoomAtom)

    const remParticipants = players.participants.filter(p => {
        return p.playerId !== currentPlayer.playerId
    })



    return (createPortal(<motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="p-10 text-2xl pt-12 rounded-md fixed z-10 top-0 gap-3  bg-gradient-to-tr border border-black from-green-300 via-green-400 to-emerald-400 right-0 flex flex-col">
        <p >{`Room name: ${activeRoom}`}</p>
        <div className="flex flex-col gap-2 text-lg " >
            {<LivePoints p={currentPlayer} />}
            {remParticipants.map((p, ind) => <LivePoints key={ind} p={p} />)}
        </div>
        <Link to='../../' >
            <GameRoomBtn
                onClick={() => { }}
                svg={true}
                content="Leave room" />

        </Link>
    </motion.div>, document.body))
}

const LivePoints = ({ p }) => {
    return (
        <div className="flex bg-amber-300  font-bold justify-between ">
            <p className="rounded-full p-1" >{p.playerName}</p>
            <p className="text-red-500 " >{p.points} pts</p>
        </div>
    )
}

const GameRoomBtn = ({ content, onClick, startGame = false, svg = false }) => {
    const { startGame: startGm } = useSocket()
    const setPlayers = useSetRecoilState(playersAtom)
    const activeRoom = useRecoilValue(activeRoomAtom)
    useEffect(() => {
        if (startGame)
            startGm(activeRoom, setPlayers)
    }, [activeRoom, startGame])
    return (<div
        disabled={startGame}
        onClick={onClick}
        className={`bg-amber-300 p-2 cursor-pointer flex justify-between
            ${!startGame ? "active:scale-95 hover:scale-105" : "opacity-70"} w-full `} ><div className="flex items-center justify-center" >
            <p className="text-center" >{content}</p>
            {svg && <DoorOpen size={40} />}
        </div>
    </div>)
}