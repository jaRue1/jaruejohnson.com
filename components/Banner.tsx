/* eslint-disable react/no-unescaped-entities */
import React from "react"
import { motion } from "framer-motion"

export default function Banner() {
  const yearIStartedCoding = new Date(2020, 0, 1)
  const yearNow = new Date()
  const yearsOfCoding = yearNow.getFullYear() - yearIStartedCoding.getFullYear()
  
  return (
    <section
      id="home"
      className="max-w-containerSmall mx-auto py-10 lgl:py-32 flex flex-col gap-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-2xl p-8 lgl:p-12 backdrop-blur-sm relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-textOrange/15 to-transparent rounded-full blur-xl" />
          <div className="absolute bottom-6 left-6 w-20 h-20 bg-gradient-to-br from-textOrange/10 to-transparent rounded-full blur-lg" />
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-textOrange/5 to-transparent rounded-full blur-md" />
          
          <div className="relative z-10 flex flex-col gap-6 lgl:gap-8">
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg font-titleFont tracking-wide text-textOrange"
            >
              Hi, my name is
            </motion.h3>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-4xl lgl:text-6xl font-titleFont font-semibold flex flex-col"
            >
              <span className="text-textLight">Jarue Johnson</span>
              <motion.span 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-textDark mt-2 lgl:mt-4 text-3xl lgl:text-5xl"
              >
                I build things for the web
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-base md:max-w-[650px] text-textLight font-medium leading-relaxed"
            >
              I'm a software engineer based in the United States. I have{" "}
              <span className="text-textOrange font-semibold">{yearsOfCoding} years</span> of experience in web development. I have a passion
              for building web applications and learning new technologies.{" "}
              <a
                href="https://www.linkedin.com/in/jarue-johnson-9a08241ab/"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <span className="text-textOrange inline-flex relative cursor-pointer h-7 overflow-x-hidden group-hover:text-orange-300 transition-colors duration-300">
                  Let's Connect
                  <span className="absolute w-full h-[1px] bg-textOrange left-0 bottom-1 -translate-x-[110%] group-hover:translate-x-0 transition-transform duration-500" />
                </span>
              </a>
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="pt-4"
            >
              <a href="https://github.com/jaRue1" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-64 h-14 text-sm font-titleFont border-2 border-textOrange rounded-xl text-textOrange tracking-wide overflow-hidden transition-all duration-300 hover:text-white"
                >
                  {/* Button background animation */}
                  <span className="absolute inset-0 bg-gradient-to-r from-textOrange to-orange-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  
                  {/* Button content */}
                  <span className="relative z-10 flex items-center justify-center h-full">
                    See my latest projects
                    <motion.span
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                    >
                      →
                    </motion.span>
                  </span>
                  
                  {/* Button glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-textOrange/20 to-orange-600/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                </motion.button>
              </a>
            </motion.div>
          </div>
          
          {/* Floating particles */}
          <div className="absolute top-8 left-8 w-2 h-2 bg-textOrange rounded-full opacity-60 animate-ping" />
          <div className="absolute bottom-12 right-12 w-1 h-1 bg-textOrange/80 rounded-full opacity-40 animate-pulse" />
          <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-textOrange/60 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="w-full h-[1px] bg-gradient-to-r from-transparent via-textOrange to-transparent"
      />
    </section>
  )
}
