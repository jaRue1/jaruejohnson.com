import React, { useState } from "react"
import SectionTitle from "./SectionTitle"
import { motion } from "framer-motion"

import Torticity from "./Jobs/Torticity"
import AwsCert from "./Jobs/AwsCert"
import Majorlinkx from "./Jobs/Majorlinkx"
import Watsco from "./Jobs/Watsco"
import Incapital from "./Jobs/Incapital"

function Experience() {
  const [jobTorticty, setJobTorticity] = useState(true)
  const [jobMajorlinkx, setJobMajorlinkx] = useState(false)
  const [jobWatsco, setJobWatsco] = useState(false)
  const [jobIncapital, setJobIncapital] = useState(false)
  const [jobAwsCert, setJobAwsCert] = useState(false)

  const handleTorticity = () => {
    setJobTorticity(true)
    setJobMajorlinkx(false)
    setJobWatsco(false)
    setJobIncapital(false)
    setJobAwsCert(false)
  }
  const handleMajorlinkx = () => {
    setJobTorticity(false)
    setJobMajorlinkx(true)
    setJobWatsco(false)
    setJobIncapital(false)
    setJobAwsCert(false)
  }
  const handleWatsco = () => {
    setJobTorticity(false)
    setJobMajorlinkx(false)
    setJobWatsco(true)
    setJobIncapital(false)
    setJobAwsCert(false)
  }
  const handleIncapital = () => {
    setJobTorticity(false)
    setJobMajorlinkx(false)
    setJobWatsco(false)
    setJobIncapital(true)
    setJobAwsCert(false)
  }
  const handleAwsCert = () => {
    setJobTorticity(false)
    setJobMajorlinkx(false)
    setJobWatsco(false)
    setJobIncapital(false)
    setJobAwsCert(true)
  }

  const jobs = [
    { name: "Torticity", handler: handleTorticity, active: jobTorticty },
    { name: "AWS Certified", handler: handleAwsCert, active: jobAwsCert },
    { name: "Majorlinkx", handler: handleMajorlinkx, active: jobMajorlinkx },
    { name: "Watsco", handler: handleWatsco, active: jobWatsco },
    { name: "Incapital", handler: handleIncapital, active: jobIncapital },
  ]

  return (
    <section
      id="experience"
      className="max-w-containerSmall mx-auto py-10 lgl:py-32 flex flex-col gap-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <SectionTitle title="My Experience" titleNum="02." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full mt-8 flex flex-col lg:flex-row gap-8"
      >
        {/* Job Navigation */}
        <div className="lg:w-64">
          <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-2xl p-2 backdrop-blur-sm">
            <ul className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scrollbar-none">
              {jobs.map((job, index) => (
                <motion.li
                  key={job.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={job.handler}
                  className={`
                    ${job.active 
                      ? "bg-gradient-to-r from-textOrange/20 to-textOrange/10 border-l-textOrange text-textOrange shadow-lg shadow-textOrange/10" 
                      : "border-l-transparent text-textDark hover:text-textLight hover:bg-gray-800/30"
                    } 
                    relative min-w-[120px] lg:min-w-full border-l-4 lg:border-l-2 py-4 px-6 text-sm font-medium cursor-pointer 
                    transition-all duration-300 rounded-xl lg:rounded-r-xl lg:rounded-l-none 
                    hover:transform hover:translate-x-1 group whitespace-nowrap
                  `}
                >
                  <span className="relative z-10">{job.name}</span>
                  
                  {/* Active indicator */}
                  {job.active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-textOrange/10 to-transparent rounded-xl lg:rounded-r-xl lg:rounded-l-none"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-textOrange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl lg:rounded-r-xl lg:rounded-l-none" />
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Job Content */}
        <motion.div
          key={`${jobTorticty}-${jobAwsCert}-${jobMajorlinkx}-${jobWatsco}-${jobIncapital}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-textOrange/10 to-transparent rounded-full blur-xl" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-textOrange/5 to-transparent rounded-full blur-lg" />
          
          <div className="relative z-10">
            {jobTorticty && <Torticity />}
            {jobAwsCert && <AwsCert />}
            {jobMajorlinkx && <Majorlinkx />}
            {jobWatsco && <Watsco />}
            {jobIncapital && <Incapital />}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-8 w-full h-[1px] bg-gradient-to-r from-transparent via-textOrange to-transparent"
      />
    </section>
  )
}

export default Experience
