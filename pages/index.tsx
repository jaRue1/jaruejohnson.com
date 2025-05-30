import Head from "next/head"
import Navbar from "../components/Navbar"
import About from "../components/About"
import Banner from "../components/Banner"
import LeftSide from "../components/LeftSide"
import RightSide from "../components/RightSide"
import Experience from "../components/Experience"
import Approach from "../components/Approach"
import Showcase from "../components/Showcase"
import Archive from "../components/Archive"
import Contact from "../components/Contact"
import Footer from "../components/Footer"

import { motion } from "framer-motion"
export default function Home() {
  return (
    <>
      <Head>
        <title>Jarue Johnson</title>
        <meta name="description" content="Jarue Johnson Portfolio" />

        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="font-bodyFont w-full min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-textLight overflow-x-hidden overflow-y-scroll scrollbar scrollbar-track-textDark/20 scrollbar-thumb-textDark/60 relative">
        {/* Subtle background pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-textOrange/5 via-transparent to-textOrange/3 pointer-events-none" />
        
        {/* Floating background elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-textOrange/10 rounded-full blur-3xl animate-pulse opacity-30" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse opacity-20" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse opacity-15" style={{ animationDelay: '4s' }} />
        
        <div className="relative z-10">
          <Navbar />
          <div className="w-full xl:flex items-center gap-20 justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="hidden xl:inline-flex w-32 h-full fixed left-0 bottom-0 z-20"
            >
              <LeftSide />
            </motion.div>

            <div className="w-full mx-auto p-4">
              <Banner />
              <About />
              <Experience />
              <Approach />
              <Showcase />
              <Contact />
              <Footer />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="hidden xl:inline-flex w-32 h-full fixed right-0 bottom-0 z-20"
            >
              <RightSide />
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}
