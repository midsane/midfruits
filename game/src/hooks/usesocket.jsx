import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { io } from "socket.io-client";
import { socketIdAtom } from "../store/atoms";

let socket = null;
const useSocket = () => {
    const setSocketId = useSetRecoilState(socketIdAtom)
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
        socket.emit("join-room", {roomName, username})
    }

    const createRoom = (roomName, roomLimit, username) => {
        if (socket) {
            socket.emit("create-room", { roomName, roomLimit, hostname: username })
        }
    }

    const getRoomData = (setPlayers, setCurrentPlayer) => {
 

        if (socket) {
           
            socket.on("get-room-data", roomData => {

                console.log("getting room data")

                setPlayers(roomData)

                const currentPlayer = roomData.participants.filter(({ playerId }) => {
                    return playerId === socket.id
                })

                setCurrentPlayer(currentPlayer[0])

            })
        }
    }

    const sendRoomData = (players, roomName) => {
        if (socket) {
            console.log("sending to server,", JSON.stringify(players))
            socket.emit("send-room-data", { roomData: players, roomName })
        }
    }

    return { connectSocket, createRoom, getRoomData, sendRoomData, joinRoom }

}

export { useSocket }