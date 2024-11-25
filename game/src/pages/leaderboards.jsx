import { Award } from "lucide-react"
import { Background } from "../components/Background"
import { Music } from "../components/Music"
import { Title } from "../components/title"
import { currentPlayerAtom, playersAtom, usernameAtom } from "../store/atoms"
import { createPortal } from "react-dom"
import { useRecoilValue } from "recoil"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { MidFruitLoading } from "../components/Loading"
import { Link } from "react-router-dom"

export const LeaderBoardPage = () => {
    const navigate = useNavigate()
    const players = useRecoilValue(playersAtom)
    useEffect(() => {
        if (!players) {
            console.log("here")
            navigate("/")
        }
    }, [])

    if (!players) {
        return <MidFruitLoading />
    }
    return (<Background>
        <Music
            audioval="game-end"
            volume={0.3}
            initialVal={true}
        />
        <LeaderBoard />
    </Background>
    )
}

const LeaderBoard = () => {

    const players = useRecoilValue(playersAtom)
    const currentPlayer = useRecoilValue(currentPlayerAtom)
    const playersClone = structuredClone(players)
    const playerName = useRecoilValue(usernameAtom)

    const cpInd = playersClone.participants.findIndex(p => p.playerId === currentPlayer.playerId)

    playersClone.participants[cpInd] = currentPlayer;

    const sortAccToPoints = (arr) => {

        return arr.sort((a, b) => b.points - a.points);
    }
    const sortedPoints = sortAccToPoints(playersClone.participants)

    return (createPortal(
        <div className="bg-transparent flex flex-col gap-10 items-center justify-center w-fit 
        h-fit text-xl rounded-lg left-1/2 fixed z-10  top-1/2 translate-x-[-50%] translate-y-[-50%]" >
            <Title />
            <div  className="flex flex-col gap-4 rounded bg-amber-200 text-md">
                {sortedPoints.map((p, i) =>

                    <div
                        key={i}
                        className={`flex justify-between gap-10 w-96 py-2 px-4 ${playerName === p.playerName && "bg-red-200"}`} >
                        <span className="flex gap-2" >
                            <h2>{i + 1}.</h2>
                            <Award size={40} />
                        </span>
                        <h2>{p.playerName.slice(0, 8) + "..."}</h2>
                        <h2>{p.points} points</h2>
                    </div>

                )}
            </div>
           
            <Link to='/' >
                <button className="py-4 px-10 rounded-full bg-amber-200 hover:bg-amber-300 active:scale-95 hover:scale-105 duration-75 " >Go to HomePage</button>
            </Link>
        </div>
        , document.body))
}
