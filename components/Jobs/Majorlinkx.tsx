/* eslint-disable react/no-unescaped-entities */
import React from "react"
import { motion } from "framer-motion"
import { TiArrowForward } from "react-icons/ti"

function Majorlinkx() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <h3 className="flex gap-1 font-medium text-xl font-titleFont">
        Software Engineer
        <span className="text-textOrange tracking-wide">
          <a href="https://majorlinkx.com/" target="_blank">
            @Majorlinkx
          </a>
        </span>
      </h3>
      <p className="text-sm mt-1 font-medium text-textDark">
        Jun 2021 - Present{" "}
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textOrange mt-1">
            <TiArrowForward />{" "}
          </span>
          <span>
            Majorlinx in a dev agency that build custom technical solutions to
            small to medium size business. That have implement solutions in
            multiple industries including Music, Beauty Salons, Hospitality,
            Retailers and E-commerce.{" "}
            <span className="text-textOrange">
              <a href="https://majorlinkx.com/" target="_blank">
                Learn More
              </a>
            </span>
          </span>
        </li>
        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textOrange mt-1">
            <TiArrowForward />{" "}
          </span>
          <span className="flex flex-col gap-2 ">
            <p>
              - Overhauled existing websites with no look and feel. Using SASS,
              NextJs,
            </p>
            <p>
              - Implement integrations with third parties such as Stripe and
              Twilio
            </p>
            <p>
              - Migrated Data from csv's to MySql database hosted in AWS and
              implement api to access said data.
            </p>
          </span>
        </li>
        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textOrange mt-1">
            <TiArrowForward />{" "}
          </span>
          <span>
            Some of the technologies I became proficient in while working here
            are{" "}
            <span className="text-textOrange">
              React.js · NextJS · AWS · Git · SASS · Express.js · MySQL
            </span>
          </span>
        </li>
      </ul>
    </motion.div>
  )
}

export default Majorlinkx
