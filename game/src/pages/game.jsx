
import { Player } from "../components/Player"
import { Music } from "../components/Music";
import { MagicItem } from "../components/MagicItem";
import { ObstaclePosition } from "../components/Obstacle";
import { GameArena } from "../components/GameArena";
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Enemy } from "../components/Enemy";
import { useSocket } from "../hooks/usesocket";
import { useEffect, useRef, useState } from "react";
import { activeRoomAtom, currentPlayerAtom, playersAtom, socketIdAtom, usernameAtom } from "../store/atoms";
import { useParams } from "react-router";

export default function GamePage() {
    const [players, setPlayers] = useRecoilState(playersAtom)
    const setCurrentPlayer = useSetRecoilState(currentPlayerAtom)
    const [username, setUsername] = useRecoilState(usernameAtom)
    
    const { getRoomData, connectSocket,  joinRoom } = useSocket()
    const [askUser, setAskUser] = useState(false)
    const usernameRef = useRef()
    const {gameId} = useParams()
    const socketId = useRecoilValue(socketIdAtom)
    const setActiveRoom = useSetRecoilState(activeRoomAtom)


    const handleClick = () => {
        
        if(usernameRef.current.value === "") {
            console.log('username cannot be empty');
            return
        }
        setUsername(usernameRef.current.value)
    }

    
    useEffect(() => {
        if(username === ""){
            connectSocket()
            setAskUser(true)
        }
        else if(socketId){
          
            setAskUser(false)
            setActiveRoom(gameId)
            joinRoom(gameId, username)
            console.log("calling getroomdata from game.jsx")
            getRoomData(setPlayers, setCurrentPlayer)

        }
    }, [username, socketId])

    if(askUser){
        return<div className="bg-red-200 w-fit flex flex-col my-96 text-xl p-10 m-auto rounded" ><input ref={usernameRef} placeholder="username" /> 
        <button onClick={handleClick} className="hover:scale-105 active:scale-95 bg-yellow-200" >ok</button>
        </div>
    }
    else{
        return (<>{!players ? <>loading...</> :
            <GameArena>
                <Player />
                <Music />
                <ObstaclePosition />
                {/* <MagicItem />
            <Enemy /> */}
            </GameArena>
        }</>)
    }   
    
}




