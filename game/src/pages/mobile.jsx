
import { motion } from 'framer-motion'
import { Background } from '../components/Background'

const MobileView = () => {

    return (
        <Background>
            <div className="relative m-auto z-10 text-center p-6 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-white mb-4 font-minecraft">MidFruits</h1>
                <p className="text-xl text-gray-300 mb-6">Please open this game on a laptop or larger screen for the best experience.</p>
                <motion.div
                    className="text-5xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    🖥️
                </motion.div>
            </div>
        </Background>
    )
}

export { MobileView }