/* eslint-disable react/no-unescaped-entities */
import React from "react"
import { motion } from "framer-motion"
export default function Banner() {
  return (
    <section
      id="home"
      className="max-w-contentContainer mx-auto py-10 mdl:py-24 flex flex-col gap-4 lgl:gap-8 mdl:px-10 xl:px-4"
    >
      <motion.h3
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-lg font-titleFont tracking-wide text-textOrange"
      >
        Hi, my name is{" "}
      </motion.h3>
      <motion.h1
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="text-4xl lgl:text-6xl font-titleFont font-semibold flex flex-col"
      >
        {" "}
        Jarue Johnson{" "}
        <span className="text-textDark mt-2 lgl:mt-4 ">
          I build things for the web
        </span>
      </motion.h1>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-base md:max-w-[650px] text-textLight font-medium"
      >
        Im a software engineer based in the United States. I have 3 years of
        experience in web development. I have a passion for building web
        applications and learning new technologies.{" "}
        <a
          href="https://www.linkedin.com/in/jarue-johnson-9a08241ab/"
          target="_blank"
        >
          <span className="text-textOrange inline-flex relative cursor-pointer h-7 overflow-x-hidden group">
            Let's Connect
            <span className="absolute w-full h-[1px] bg-textOrange left-0 bottom-1 -translate-x-[110%] group-hover:translate-x-0 transition-transform-500" />
          </span>
        </a>
      </motion.p>
      <a href="https://github.com/jaRue1" target="_blank">
        <motion.button
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="w-52 h-14 text-sm font-titleFont border border-textOrange rounded-md text-textOrange tracking-wide hover:bg-hoverColor duration-300"
        >
          See my latest projects.
        </motion.button>
      </a>
    </section>
  )
}
