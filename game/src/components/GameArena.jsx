import React from 'react'
import { motion } from 'framer-motion'

const GameArena = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-screen bg-gradient-to-br from-green-300 via-green-400 to-emerald-400 overflow-hidden"
    >

      <div className="absolute inset-0 bg-grid opacity-20"></div>


      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-50"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-lime-400 to-transparent opacity-50"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-teal-400 to-transparent opacity-50"></div>
      </div>


      <motion.div
        className="absolute top-10 left-10 w-20 h-20 rounded-full bg-green-400 opacity-20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      ></motion.div>
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-emerald-400 opacity-20 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      ></motion.div>


      <div className="absolute inset-0 bg-hexagon-pattern opacity-5"></div>


      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  )
}


const styles = `
@layer utilities {
  .bg-grid {
    background-image: 
      linear-gradient(to right, rgba(134, 239, 172, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(134, 239, 172, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .bg-hexagon-pattern {
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15L30 0z' fill-rule='evenodd' stroke='%2334d399' stroke-width='2' fill='none'/%3E%3C/svg%3E");
    background-size: 60px 60px;
  }
}
`


const Style = () => <style>{styles}</style>

const GameArenaWithStyle = ({ children }) => (
  <>
    <Style />
    <GameArena>{children}</GameArena>
  </>
)

export { GameArena, GameArenaWithStyle }