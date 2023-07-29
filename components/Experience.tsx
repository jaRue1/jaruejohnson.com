import React, { useState } from "react"
import SectionTitle from "./SectionTitle"

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

  return (
    <section
      id="experience"
      className="max-w-containerxs mx-auto py-10 lgl:py-24 px-4"
    >
      <SectionTitle title="My Experience" titleNum="02." />
      <div className="w-full mt-10 flex flex-col md:flex-row gap-16">
        <ul className="md:w-52 flex flex-col">
          <li
            onClick={handleTorticity}
            className={`${
              jobTorticty
                ? "border-l-textOrange border-l-2 text-textOrange"
                : "border-l-hoverColor border-l-2  text-textDark"
            }  bg-transparent hover:bg-customBg py-3 text-sm cursor-pointer duration-300 px-8 font-medium`}
          >
            Torticity
          </li>
          <li
            onClick={handleAwsCert}
            className={`${
              jobAwsCert
                ? "border-l-textOrange border-l-2 text-textOrange"
                : "border-l-hoverColor border-l-2  text-textDark"
            }  bg-transparent hover:bg-customBg py-3 text-sm cursor-pointer duration-300 px-8 font-medium`}
          >
            AWS Cert
          </li>
          <li
            onClick={handleMajorlinkx}
            className={`${
              jobMajorlinkx
                ? "border-l-textOrange border-l-2 text-textOrange"
                : "border-l-hoverColor border-l-2  text-textDark"
            }  bg-transparent hover:bg-customBg py-3 text-sm cursor-pointer duration-300 px-8 font-medium`}
          >
            Majorlinkx
          </li>
          <li
            onClick={handleWatsco}
            className={`${
              jobWatsco
                ? "border-l-textOrange border-l-2 text-textOrange"
                : "border-l-hoverColor border-l-2  text-textDark"
            }  bg-transparent hover:bg-customBg py-3 text-sm cursor-pointer duration-300 px-8 font-medium`}
          >
            Watsco
          </li>
          <li
            onClick={handleIncapital}
            className={`${
              jobIncapital
                ? "border-l-textOrange border-l-2 text-textOrange"
                : "border-l-hoverColor border-l-2  text-textDark"
            }  bg-transparent hover:bg-customBg py-3 text-sm cursor-pointer duration-300 px-8 font-medium`}
          >
            Incapital
          </li>
        </ul>
        {jobTorticty && <Torticity />}
        {jobAwsCert && <AwsCert />}
        {jobMajorlinkx && <Majorlinkx />}
        {jobWatsco && <Watsco />}
        {jobIncapital && <Incapital />}
      </div>
    </section>
  )
}

export default Experience
