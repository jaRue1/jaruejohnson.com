import React, { useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { MdOutlineClose } from "react-icons/md"

import { TbBrandGithub, TbBrandTwitter } from "react-icons/tb"
import { SlSocialLinkedin, SlSocialInstagram } from "react-icons/sl"

const Navbar = () => {
  const ref = useRef<string | any>("")
  const [showMenu, setShowMenu] = useState(false)
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    setShowMenu(false)
    const href = e.currentTarget.href
    const targetId = href.replace(/.*\#/, "")
    const elem = document.getElementById(targetId)
    elem?.scrollIntoView({
      behavior: "smooth",
    })
    // Update the class name of the clicked link
    const links = document.querySelectorAll(".nav-link")
    links.forEach((link) => {
      link.classList.remove("active")
    })
    e.currentTarget.classList.add("active")
  }

  return (
    <div className="w-full h-20 lg:h-[12vh] sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-slate-900/90 via-gray-900/85 to-slate-800/90 border-b border-gray-700/40 shadow-lg shadow-black/10">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-textOrange/5 via-transparent to-textOrange/3 pointer-events-none" />
      
      <div className="max-w-containerSmall h-full mx-auto py-1 font-titleFont flex items-center justify-between px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <motion.span 
            className="text-2xl font-bold text-textOrange relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Rue
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-textOrange to-orange-600 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.span>
        </motion.div>

        <div className="hidden mdl:inline-flex items-center gap-8">
          <ul className="flex text-[13px] gap-8">
            <Link
              onClick={handleScroll}
              href="#home"
              className="group flex items-center font-medium text-textDark hover:text-textOrange cursor-pointer duration-300 nav-link relative"
            >
              <motion.li
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1 }}
                className="relative"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-textOrange group-hover:w-full transition-all duration-300" />
              </motion.li>
            </Link>
            
            <Link
              onClick={handleScroll}
              href="#about"
              className="group flex items-center font-medium text-textDark hover:text-textOrange cursor-pointer duration-300 nav-link relative"
            >
              <motion.li
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.1 }}
                className="relative"
              >
                <span className="text-textOrange">01.</span>About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-textOrange group-hover:w-full transition-all duration-300" />
              </motion.li>
            </Link>
            
            <Link
              onClick={handleScroll}
              href="#experience"
              className="group flex items-center font-medium text-textDark hover:text-textOrange cursor-pointer duration-300 nav-link relative"
            >
              <motion.li
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.2 }}
                className="relative"
              >
                <span className="text-textOrange">02.</span>Experience
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-textOrange group-hover:w-full transition-all duration-300" />
              </motion.li>
            </Link>
            
            <Link
              onClick={handleScroll}
              href="#approach"
              className="group flex items-center font-medium text-textDark hover:text-textOrange cursor-pointer duration-300 nav-link relative"
            >
              <motion.li
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.3 }}
                className="relative"
              >
                <span className="text-textOrange">03.</span>Approach
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-textOrange group-hover:w-full transition-all duration-300" />
              </motion.li>
            </Link>
            
            <Link
              onClick={handleScroll}
              href="#projects"
              className="group flex items-center font-medium text-textDark hover:text-textOrange cursor-pointer duration-300 nav-link relative"
            >
              <motion.li
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.4 }}
                className="relative"
              >
                <span className="text-textOrange">04.</span>Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-textOrange group-hover:w-full transition-all duration-300" />
              </motion.li>
            </Link>
            
            <Link
              onClick={handleScroll}
              href="#contact"
              className="group flex items-center font-medium text-textDark hover:text-textOrange cursor-pointer duration-300 nav-link relative"
            >
              <motion.li
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.5 }}
                className="relative"
              >
                <span className="text-textOrange">05.</span>Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-textOrange group-hover:w-full transition-all duration-300" />
              </motion.li>
            </Link>
          </ul>
        </div>

        {/* Mobile menu hamburger */}
        <div
          onClick={() => setShowMenu(true)}
          className="w-6 h-5 flex flex-col justify-between items-center mdl:hidden text-4xl text-textOrange cursor-pointer overflow-hidden group"
        >
          <span className="w-full h-[2px] bg-textOrange inline-flex transform group-hover:translate-x-2 transition-all ease-in-out duration-300"></span>
          <span className="w-full h-[2px] bg-textOrange inline-flex transform translate-x-3 group-hover:translate-x-0 transition-all ease-in-out duration-300"></span>
          <span className="w-full h-[2px] bg-textOrange inline-flex transform translate-x-1 group-hover:translate-x-3 transition-all ease-in-out duration-300"></span>
        </div>

        {/* Mobile menu */}
        {showMenu && (
          <div
            ref={(node) => (ref.current = node)}
            className="absolute mdl:hidden top-0 right-0 w-full h-screen bg-black bg-opacity-50 flex flex-col items-end"
          >
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.1 }}
              className="w-[80%] h-full overflow-y-scroll scrollbarHide bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border-l border-gray-700/30 flex flex-col items-center px-4 py-10 relative"
            >
              <MdOutlineClose
                onClick={() => setShowMenu(false)}
                className="text-3xl text-textOrange cursor-pointer hover:text-red-500 absolute top-4 right-4 hover:scale-110 transition-all duration-300"
              />
              
              <div className="flex flex-col items-center gap-8 mt-12">
                <ul className="flex flex-col text-base gap-6">
                  <Link
                    onClick={handleScroll}
                    href="#home"
                    className="group flex items-center font-medium text-textDark hover:text-textOrange cursor-pointer duration-300 nav-link"
                  >
                    <motion.li
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.1, ease: "easeIn" }}
                      className="group-hover:translate-x-2 transition-transform duration-300"
                    >
                      Home
                    </motion.li>
                  </Link>
                  
                  <Link
                    onClick={handleScroll}
                    href="#about"
                    className="group flex items-center font-medium text-textDark hover:text-textOrange cursor-pointer duration-300 nav-link"
                  >
                    <motion.li
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.2, ease: "easeIn" }}
                      className="group-hover:translate-x-2 transition-transform duration-300"
                    >
                      <span className="text-textOrange">01.</span>About
                    </motion.li>
                  </Link>
                  
                  <Link
                    onClick={handleScroll}
                    href="#experience"
                    className="group flex items-center font-medium text-textDark hover:text-textOrange cursor-pointer duration-300 nav-link"
                  >
                    <motion.li
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.3, ease: "easeIn" }}
                      className="group-hover:translate-x-2 transition-transform duration-300"
                    >
                      <span className="text-textOrange">02.</span>Experience
                    </motion.li>
                  </Link>
                  
                  <Link
                    onClick={handleScroll}
                    href="#approach"
                    className="group flex items-center font-medium text-textDark hover:text-textOrange cursor-pointer duration-300 nav-link"
                  >
                    <motion.li
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.4, ease: "easeIn" }}
                      className="group-hover:translate-x-2 transition-transform duration-300"
                    >
                      <span className="text-textOrange">03.</span>Approach
                    </motion.li>
                  </Link>
                  
                  <Link
                    onClick={handleScroll}
                    href="#projects"
                    className="group flex items-center font-medium text-textDark hover:text-textOrange cursor-pointer duration-300 nav-link"
                  >
                    <motion.li
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.5, ease: "easeIn" }}
                      className="group-hover:translate-x-2 transition-transform duration-300"
                    >
                      <span className="text-textOrange">04.</span>Projects
                    </motion.li>
                  </Link>
                  
                  <Link
                    onClick={handleScroll}
                    href="#contact"
                    className="group flex items-center font-medium text-textDark hover:text-textOrange cursor-pointer duration-300 nav-link"
                  >
                    <motion.li
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.6, ease: "easeIn" }}
                      className="group-hover:translate-x-2 transition-transform duration-300"
                    >
                      <span className="text-textOrange">05.</span>Contact
                    </motion.li>
                  </Link>
                </ul>

                <div className="flex gap-4 mt-4">
                  <motion.a
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeIn" }}
                    href="https://github.com/jaRue1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="w-12 h-12 text-xl bg-gradient-to-br from-gray-800/50 to-gray-700/30 border border-gray-600/50 hover:border-textOrange text-zinc-200 rounded-full inline-flex items-center justify-center hover:text-textOrange cursor-pointer hover:-translate-y-2 hover:scale-110 transition-all duration-300">
                      <TbBrandGithub />
                    </span>
                  </motion.a>
                  
                  <motion.a
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeIn" }}
                    href="https://twitter.com/Tru_Rue"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="w-12 h-12 text-xl bg-gradient-to-br from-gray-800/50 to-gray-700/30 border border-gray-600/50 hover:border-textOrange text-zinc-200 rounded-full inline-flex items-center justify-center hover:text-textOrange cursor-pointer hover:-translate-y-2 hover:scale-110 transition-all duration-300">
                      <TbBrandTwitter />
                    </span>
                  </motion.a>
                  
                  <motion.a
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, ease: "easeIn" }}
                    href="https://www.linkedin.com/in/jarue-johnson-9a08241ab/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="w-12 h-12 text-xl bg-gradient-to-br from-gray-800/50 to-gray-700/30 border border-gray-600/50 hover:border-textOrange text-zinc-200 rounded-full inline-flex items-center justify-center hover:text-textOrange cursor-pointer hover:-translate-y-2 hover:scale-110 transition-all duration-300">
                      <SlSocialLinkedin />
                    </span>
                  </motion.a>
                  
             
                </div>
                
                <motion.a
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.1, ease: "easeIn" }}
                  href="mailto:jaruejohnson@outlook.com"
                  className="mt-6"
                >
                  <button className="text-center text-sm w-72 font-titleFont tracking-widest duration-300 text-textOrange hover:text-orange-300 transition-colors px-4 py-2 rounded-lg border border-textOrange/30 hover:border-textOrange hover:bg-textOrange/5">
                    jaruejohnson@outlook.com
                  </button>
                </motion.a>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
