import { grassImg, stoneImg, magicItemImg, healthPotionImg, mushroomImg, treeImg } from "../Data/data"
import { OBSTACLE_POSITION } from "../Data/data"
import { motion } from "framer-motion"
const Obstacle = ({ obstaclesData }) => {
    let imgToRender;
    
    switch (obstaclesData.type) {
        case "stone":
            imgToRender = stoneImg;
            break;
        case 'grass':
            imgToRender = grassImg;
            break;
        case "health":
            imgToRender = healthPotionImg;
            break;
        case "mana":
            imgToRender = magicItemImg;
            break;
        case "tree":
            imgToRender = treeImg;
            break;
        case "mushroom":
            imgToRender = mushroomImg;
            break;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
                top: obstaclesData.top + "%",
                left: obstaclesData.left + "%",
            }}
            className={` w-20 h-20 absolute z-0`} >
            <img src={imgToRender} />
        </motion.div>

    )
}

const ObstaclePosition = () => {
    return (<>{
        OBSTACLE_POSITION.map((p, i) =>
            <Obstacle key={i} obstaclesData={p} />)
    }</>)
}

export { ObstaclePosition, Obstacle }