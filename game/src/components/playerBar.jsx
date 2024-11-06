import { motion } from "framer-motion";

const PlayerBar = ({ val, type }) => {
    let barColor = ""
    switch (type) {
        case "mana":
            barColor = "bg-purple-700"
            break
        case "roomlimit":
            barColor = "bg-amber-300"
            break;
        default:
            barColor = "bg-green-500"
    }
    return (
        <div className={`w-full ${type === "roomlimit" ? "h-8 border border-black" : "h-2"} my-1 bg-gray-300 rounded-full overflow-hidden`}>
            <motion.div
                className={`h-full border  rounded-full ${barColor}`}
                initial={{ width: 0 }}
                animate={{ width: `${val}%` }}
                transition={{ duration: 0.5 }}
            />
        </div>
    );
};

export { PlayerBar };
