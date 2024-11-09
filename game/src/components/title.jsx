import { motion } from 'framer-motion';
import { img1, sword1, sword2, deadpoolImg } from '../Data/data';

import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { usernameAtom } from '../store/atoms';
export const Title = ({ items = ["M", "I", "D", "F", "R", "U", "I", "T", "S"] }) => {

    const username = useRecoilValue(usernameAtom)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };



    return (
        <motion.div
            className="flex m-auto pixelify-sans-title relative pl-20 pr-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={username}
        >

            <motion.div

            >
                <motion.p
                    initial={{ opacity: 0, y: 20, rotate: 0 }}
                    animate={{ opacity: [1, 1, 1], zIndex: [0, 0, 0, 10], x: [0, 0, -20, -20, -10], y: [0, 0, -10, -10, 10], rotate: [0, 0, 0, -90, -90] }}
                    transition={{ duration: 1.6, times: [0, 0.6, 0.85, 0.94, 1] }}
                >{username}</motion.p>
                <motion.img
                    initial={{ opacity: 0, y: 20, rotate: 0 }}
                    animate={{ opacity: [1, 1, 1], zIndex: [0, 0, 0, 10], x: [0, 0, -20, -20, -10], y: [0, 0, -10, -10, 10], rotate: [0, 0, 0, -90, -90] }}
                    transition={{ duration: 1.6, times: [0, 0.6, 0.85, 0.94, 1] }}
                    className='absolute left-0 w-20' src={deadpoolImg} />
            </motion.div>

            <motion.img

                initial={{ opacity: 0, rotate: 45, x: 210 }}
                animate={{ opacity: [0, 1, 1, 0], rotate: [-45, -45], left: 0, x: 0, y: -5 }}
                transition={{ duration: 0.7, times: [0, 0.2, 0.99, 1], delay: 0.35 }}
                className='absolute right-0 w-36 z-0 ' src={sword1} />
            {items.map((item, index) => (
                <motion.div
                    className="item z-10 title-text "
                    key={index}
                    variants={childVariants}
                >
                    <span className="text-amber-300 text-9xl " ><h1 className=' hover:backdrop-blur-sm hover:scale-[1.02] duration-75 ease-linear' >{item}</h1></span>
                </motion.div>
            ))}


        </motion.div>
    );
    // return <div className="m-auto pixelify-sans-title text-8xl" >
    //     
    //     <span className="text-amber-200 text-7xl" >I</span>
    //     <span className="text-8xl text-yellow-200" >D</span>
    //     <span className="text-9xl text-amber-200" >B</span>
    //     <span className="text-amber-300 text-9xl" >L</span>
    //     <span className="text-8xl text-yellow-200">A</span>
    //     <span className="text-8xl text-yellow-200">D</span>
    //     <span className="text-amber-300 text-9xl" >E</span>
    // </div>
}



