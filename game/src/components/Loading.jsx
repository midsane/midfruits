
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Background } from './Background'

export const MidFruitLoading = () => {
    const [progress, setProgress] = useState(0)
    const [loadingText, setLoadingText] = useState('MidFruits')

    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgress(prev => (prev < 100 ? prev + 1 : prev))
        }, 50)

        const textIntervalId = setInterval(() => {
            setLoadingText(prev =>
                prev === 'MidFruits...' ? 'MidFruits' : prev + '.'
            )
        }, 500)

        return () => {
            clearInterval(intervalId)
            clearInterval(textIntervalId)
        }
    }, [])

    const runes = ['L', 'O', 'A', 'D', 'I', 'N', 'G']

    return (
       
        <Background>
            <div className="relative z-0 flex flex-col items-center justify-center h-screen">
                <div className="w-64 h-64 bg-emerald-300 bg-contain bg-center bg-no-repeat relative">
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-blue-400 bg-opacity-50"
                        initial={{ height: 0 }}
                        animate={{ height: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                <div className="text-white text-2xl font-fantasy mt-8 text-center">
                    {loadingText}
                </div>
                <div className="mt-4 flex space-x-2">
                    {runes.map((rune, index) => (
                        <motion.div
                            key={index}
                            className="text-3xl text-yellow-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, repeat: Infinity, repeatType: 'reverse', duration: 1 }}
                        >
                            {rune}
                        </motion.div>
                    ))}
                </div>
            </div></Background>
        
    )
}