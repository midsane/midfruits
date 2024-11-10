import { useEffect } from "react";
import { constSelector, useSetRecoilState } from "recoil";
import { io } from "socket.io-client";
import { fruitsDataAtom, isRoomInvalidAtom, playersAtom, socketIdAtom } from "../store/atoms";


let socket = null;
const useSocket = () => {
    const setSocketId = useSetRecoilState(socketIdAtom)
    const setIsRoomInvalid = useSetRecoilState(isRoomInvalidAtom)
    const setPlayers = useSetRecoilState(playersAtom)
    const setFruitsData = useSetRecoilState(fruitsDataAtom)

    useEffect(() => {

        if (!socket) {
            socket = io("localhost:3000");
        }
    }, [socket])

    const connectSocket = () => {
        console.log("first")
        if (socket) {
            console.log("second")
            socket.on("connect", () => {
                console.log("connected to ws server successfully", socket)
                setSocketId(socket.id)
            })
        }
    }

    const joinRoom = (roomName, username) => {
        socket.emit("join-room", { roomName, username })
    }

    const generateFruit = (roomName) => {
        if (socket) {
            console.log("emitting for fruit generation")
            socket.emit("fruit-generation", roomName)
            socket.on("fruit-generation-response", data => setFruitsData(data))
        }
    }



    const startGame = (roomName) => {
        socket.emit("start-game", roomName)
        socket.on("start-game-response", data => {
            console.log(data)
            if (data.status === 200) {
                setPlayers(data.players)
                console.log(data.players)
            }
        })
    }

    const checkRoomAvailibility = () => {

        socket.on("join-room-response", response => {
            console.log(response)
            setIsRoomInvalid(response.msg)
        })
    }


    const createRoom = (roomName, roomLimit, username) => {
        if (socket) {
            socket.emit("create-room", { roomName, roomLimit, hostname: username })
        }
    }

    const getRoomData = (setPlayers, setCurrentPlayer, currentPlayer, setDoesRoomExist) => {

        if (socket) {
            socket.on("get-room-data", roomData => {
                console.log("getting room data")
                if (!roomData) {
                    setDoesRoomExist(false);
                    return;
                }
                // console.log(roomData)
                // console.log("socket.id=", socket.id);
                // console.log("roomData.playerId=", roomData.playerId)

                // if (roomData.playerId === socket.id) return;
                setPlayers(roomData)

                if (!currentPlayer) {
                    const currentPlayerInitial = roomData.participants.filter(({ playerId }) => {
                        return playerId === socket.id
                    })

                    setCurrentPlayer(currentPlayerInitial[0])
                }


            })
        }
    }

    const sendRoomData = (players, currentPlayer, roomName) => {
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
        generateFruit
    }

}

export { useSocket }