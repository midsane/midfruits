import { useEffect } from "react";
import { useRecoilBridgeAcrossReactRoots_UNSTABLE, useRecoilValue, useSetRecoilState } from "recoil";
import { io } from "socket.io-client";
import { activeRoomAtom, currentPlayerAtom, fruitsDataAtom, gameHasEndedAtom, isRoomInvalidAtom, playersAtom, socketIdAtom, startGameAtom, timeRemGameAtom } from "../store/atoms";
import { fruitArr } from "../Data/data";


let socket = null;
const useSocket = () => {
    const setSocketId = useSetRecoilState(socketIdAtom)
    const setIsRoomInvalid = useSetRecoilState(isRoomInvalidAtom)
    const setPlayers = useSetRecoilState(playersAtom)
    const setFruitsData = useSetRecoilState(fruitsDataAtom)
    const setActiveRoom = useSetRecoilState(activeRoomAtom)
    const setStartGame = useSetRecoilState(startGameAtom)
    const setTimeRemGame = useSetRecoilState(timeRemGameAtom)
    const setGameHasEnded = useSetRecoilState(gameHasEndedAtom)
    const currentPlayer = useRecoilValue(currentPlayerAtom)

    useEffect(() => {

        if (!socket) {
            socket = io("https://midblade.onrender.com");
        }
    }, [socket])

    const connectSocket = () => {

        if (socket) {

            socket.on("connect", () => {

                setSocketId(socket.id)
                clearAllStates()

            })
        }
    }

    const joinRoom = (roomName, username) => {
        socket.emit("join-room", { roomName, username })
    }

    const startGame = (roomName) => {
        socket.emit("start-game", roomName)
        socket.on("start-game-response", data => {

            if (data.status === 200) {
                setPlayers(data.players)
            }
        })
        socket.on("get-fruit", data => {
            const newFruit = data[data.length - 1];
            if (!newFruit.img)
                newFruit.img = fruitArr[Math.floor(Math.random() * fruitArr.length)];
            setFruitsData(prev => {
                const arr = [...prev];
                const lastInd = arr.length - 1;
                if (arr.length > 0) {
                    if (newFruit.top === arr[lastInd].top && newFruit.left === arr[lastInd].left) {
                        return prev;
                    }
                }
                return [...prev, newFruit]
            })

        })
        socket.on("delete-fruit-index", index => {
            setFruitsData(prev => {
                const newFruitData = prev.filter(f => f.index !== index)
                
                return newFruitData;
            })
        })
    }

    const checkRoomAvailibility = () => {

        socket.on("join-room-response", response => {
            setIsRoomInvalid(response.msg)
        })
    }


    const createRoom = (roomName, roomLimit, username) => {
        if (socket) {
            socket.emit("create-room", { roomName, roomLimit, hostname: username })
        }
    }

    const deleteFruit = (roomName, index) => {
        if (socket) {
            socket.emit("delete-fruit", { roomName, index })
        }
    }

    const clearAllStates = () => {
        setPlayers(null)
        setIsRoomInvalid(null)
        setActiveRoom(null)
        setFruitsData([])
        setStartGame(false)
        setTimeRemGame(3*60*1000)
        setGameHasEnded(false)

    }
    const getRoomData = (setPlayers, setCurrentPlayer, setDoesRoomExist) => {

        if (socket) {
            socket.on("get-room-data", roomData => {

                if (!roomData) {
                    setDoesRoomExist(false);
                    return;
                }

                setPlayers(roomData)

                if (currentPlayer == null) {
                    console.log("updating current player")
                    const currentPlayerInitial = roomData.participants.filter(({ playerId }) => {
                        return playerId === socket.id
                    })
                    setCurrentPlayer(currentPlayerInitial[0])
                }


            })
        }
    }

    const sendRoomData = (currentPlayer, roomName) => {
        if (socket) {

            socket.emit("send-room-data", { currentPlayer, roomName })
        }
    }

    return {
        connectSocket,
        checkRoomAvailibility,
        createRoom,
        getRoomData,
        sendRoomData,
        joinRoom,
        startGame,
        deleteFruit,
        clearAllStates
    }

}

export { useSocket }
