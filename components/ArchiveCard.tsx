import React from "react"
import { FaRegFolder } from "react-icons/fa"
import { RxOpenInNewWindow } from "react-icons/rx"
import { motion } from "framer-motion"

interface Props {
  title: string
  link: string
  description: string
  tech: string[]
}

function ArchiveCard(props: Props) {
  const { title, link, description, tech } = props
  return (
    <motion.a 
      href={link} 
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="block"
    >
      <div className="w-full h-80 bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-2xl p-7 flex flex-col justify-center gap-6 backdrop-blur-sm relative overflow-hidden transition-all duration-300 group hover:border-textOrange/50 hover:shadow-lg hover:shadow-textOrange/10">
        {/* Background decorative elements */}
        <div className="absolute top-2 right-2 w-16 h-16 bg-gradient-to-br from-textOrange/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-2 left-2 w-12 h-12 bg-gradient-to-br from-textOrange/5 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <FaRegFolder className="text-4xl text-textOrange group-hover:drop-shadow-lg" />
            </motion.div>
            <motion.div
              whileHover={{ 
                scale: 1.1,
                x: 2,
                y: -2,
                transition: { duration: 0.2 }
              }}
            >
              <RxOpenInNewWindow className="text-4xl text-textDark group-hover:text-textOrange transition-colors duration-300" />
            </motion.div>
          </div>
          
          <div>
            <h2 className="text-xl font-titleFont font-semibold tracking-wide group-hover:text-textOrange transition-colors duration-300 group-hover:translate-x-1 transform">
              {title}
            </h2>
            <p className="text-sm mt-3 text-textDark group-hover:text-textLight transition-colors duration-300 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="mt-4">
            <ul className="text-xs mdl:text-sm text-textDark flex items-center gap-2 flex-wrap">
              {tech.map((t, index) => (
                <motion.li 
                  key={t}
                  initial={{ opacity: 0.7 }}
                  whileHover={{ 
                    opacity: 1,
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="px-2 py-1 bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-md border border-gray-600/30 group-hover:border-textOrange/30 group-hover:text-textOrange transition-all duration-300"
                >
                  {t}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-4 left-4 w-1 h-1 bg-textOrange rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500 group-hover:animate-ping" />
        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-textOrange/60 rounded-full opacity-0 group-hover:opacity-40 transition-all duration-700 delay-200 group-hover:animate-pulse" />
      </div>
    </motion.a>
  )
}

export default ArchiveCard
