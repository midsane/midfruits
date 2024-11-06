import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { io } from "socket.io-client";
import { isRoomFullAtom, socketIdAtom } from "../store/atoms";

let socket = null;
const useSocket = () => {
    const setSocketId = useSetRecoilState(socketIdAtom)
    const setIsRoomFull = useSetRecoilState(isRoomFullAtom)
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

    const checkRoomAvailibility = () => {
        
        socket.on("room-is-full", isRoomFull => {
            console.log("seconddasf")
            setIsRoomFull(isRoomFull)
        })
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
                // console.log(roomData)
                // console.log("socket.id=", socket.id);
                // console.log("roomData.playerId=", roomData.playerId)
                
                // if (roomData.playerId === socket.id) return;
                setPlayers(roomData)

                const currentPlayer = roomData.participants.filter(({ playerId }) => {
                    return playerId === socket.id
                })

                setCurrentPlayer(currentPlayer[0])

            })
        }
    }

    const sendRoomData = (players, currentPlayer, roomName) => {
        if (socket) {

            socket.emit("send-room-data", { currentPlayer, roomName })
        }
    }

    return { connectSocket,checkRoomAvailibility, createRoom, getRoomData, sendRoomData, joinRoom }

}

export { useSocket }