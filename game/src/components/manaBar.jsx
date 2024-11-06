import { motion } from "framer-motion";

const ManaBar = ({ mana }) => {
    return (
        <div className="w-full h-2 my-1 bg-gray-300 rounded-full overflow-hidden">
            <motion.div
                className="h-full bg-purple-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${mana}%` }}
                transition={{ duration: 0.2 }}
            />
        </div>
    );
};

export { ManaBar };
