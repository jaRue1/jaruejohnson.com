import Head from "next/head"
import Navbar from "../components/Navbar"
import About from "../components/About"
import Banner from "../components/Banner"
import LeftSide from "../components/LeftSide"
import RightSide from "../components/RightSide"
import Experience from "../components/Experience"

import { motion } from "framer-motion"
import Projects from "../components/Projects"

export default function Home() {
  return (
    <>
      <Head>
        <title>Jarue Johnson</title>
        <meta name="description" content="Jarue Johnson Portfolio" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-bodyFont w-full h-screen bg-bodyColor text-textLight overflow-x-hidden overflow-y-scroll">
        <Navbar />
        <div className="w-full h-[88vh] xl:flex items-center gap-20 justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="hidden xl:inline-flex w-32 h-full fixed left-0 bottom-0"
          >
            <LeftSide />
          </motion.div>

          <div className=" h-[88vh] w-full mx-auto p-4">
            <Banner />
            <About />
            <Experience />
            <Projects />
            {/* Archive */}
            {/* Contact */}
            {/* Footer */}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="hidden xl:inline-flex w-32 h-full fixed right-0 bottom-0"
          >
            <RightSide />
          </motion.div>
        </div>
      </main>
    </>
  )
}
