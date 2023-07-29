import React from "react"
import { motion } from "framer-motion"
import { TiArrowForward } from "react-icons/ti"

function Incapital() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <h3 className="flex gap-1 font-medium text-xl font-titleFont">
        Software Engineer Intern{" "}
        <span className="text-textOrange tracking-wide">
          <a href="https://www.insperex.com/" target="_blank">
            @Incapital
          </a>
        </span>
      </h3>
      <p className="text-sm mt-1 font-medium text-textDark">
        Oct 2019 - Dec 2019{" "}
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        <li className="text-base flex gap-2 text-textLight">
          <span className="text-textOrange mt-1">
            <TiArrowForward />{" "}
          </span>
          <span>
            Incapital aka Insperex is a company that sells financial products
            powered by software.
            <span className="text-textOrange">
              <a href="https://www.insperex.com/" target="_blank">
                Learn More
              </a>
            </span>
          </span>
        </li>
        <li className="text-base flex gap-2 text-textLight">
          <span className="text-textOrange mt-1">
            <TiArrowForward />{" "}
          </span>
          <span className="flex flex-col gap-2 ">
            <p>
              - Troubleshoot and resolved various errors on the Incapnet
              (internal website platform), improving overall system stability.
            </p>
            <p>
              - Leveraged C# object-oriented design to rectify errors and
              generate new logic, preventing recurrence of similar issues within
              the MVC application.
            </p>
          </span>
        </li>
        <li className="text-base flex gap-2 text-textLight">
          <span className="text-textOrange mt-1">
            <TiArrowForward />{" "}
          </span>
          <span>
            Some of the technologies I became proficient in while working here
            are <span className="text-textOrange">C# · JavaScript</span>
          </span>
        </li>
      </ul>
    </motion.div>
  )
}

export default Incapital
