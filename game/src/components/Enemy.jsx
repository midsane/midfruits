import { useEffect, useState } from "react"
import { enemyMoves } from "../Data/data"
import { ENEMY_COORDINATES } from "../Data/data"
import { useRecoilState } from "recoil"
import { enemiesAtom } from "../store/atoms"

export const Enemy = () => {
   
    const [enemies, setEnemies] = useRecoilState(enemiesAtom)

    const generateEnemy = () => {
        
        const ArrToChooseFrom = ENEMY_COORDINATES.filter(e => !enemies.includes(e))

        if (ArrToChooseFrom == 0 || enemies.length > 3) return

        const randomInd = Math.floor(Math.random() * ArrToChooseFrom.length)
        
        setEnemies(enemies => [...enemies, ArrToChooseFrom[randomInd]])

    }

    useEffect(() => {
        const interval = setInterval(() => {
            generateEnemy()
        }, 2000);

        return () => clearInterval(interval)
    }, [enemies])

    
    return (<>
        {enemies.map((enemy, ind) => <OneEnemy key={ind} num={ind} enemy={enemy} />)}
    </>
    )
}


const OneEnemy = ({enemy, num}) => {
    const [enemyFrame, setEnemyFrame] = useState(enemyMoves[0])
    
    const moveEnemy = () => {
        const dTop = Math.floor(Math.random() * Math.abs(90 - enemy.top));
        const dLeft = Math.floor(Math.random()* Math.abs(90 - enemy.left));
        
    }

    const enemyAttack = () => {
        const timeout = setTimeout(() => {
            let index = enemyMoves.findIndex(em => em === enemyFrame)
            index = (index+1)%(enemyMoves.length)
            
            
            setEnemyFrame(enemyMoves[index])
        }, 10);

    }

    useEffect(() => {
        const interval = setTimeout(() => {
            enemyAttack()
        }, 1000);

        return () => clearInterval(interval)
    })

   
    return (<div
        style={{ top: enemy.top + "%", left: enemy.left + "%" }}
        className="image-enemy">
        <img src={enemyFrame} />
    </div>)
}