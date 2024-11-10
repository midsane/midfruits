import { grassImg, stoneImg, mushroomImg, treeImg, fruitArr } from "../Data/data"
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
        case "tree":
            imgToRender = treeImg;
            break;
        case "mushroom":
            imgToRender = mushroomImg;
            break;
        default:
            imgToRender = null
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
            {imgToRender ? <img 
            
            src={imgToRender} /> : <div className=" w-full h-full relative" >
                <img 
                className="absolute w-full h-full"
                src={obstaclesData.img}></img >
                <p className="absolute text-2xl font-bold left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%]" >{obstaclesData.val}</p>
            </div>
            }
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