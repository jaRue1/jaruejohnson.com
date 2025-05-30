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
      <h3 className="flex gap-1 font-medium text-xl font-titleFont xs:text-xs sm:text-lg sm:items-center sml:text-xl">
        Founding Engineer
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
        <li className="text-base flex gap-2 text-textLight">
          <span className="text-textOrange mt-1">
            <TiArrowForward />{" "}
          </span>
          <span>
            Majorlinkx is a dev agency that builds custom technical solutions
            for small to medium size businesses. We have implemented solutions
            in multiple industries including Music, Beauty Salons, Hospitality,
            Retailers and E-commerce.{" "}
            <span className="text-textOrange">
              <a href="https://majorlinkx.com/" target="_blank">
                Learn More
              </a>
            </span>
          </span>
        </li>
        <li className="text-base flex gap-2 text-textLight">
          <span className="text-textOrange mt-1">
            <TiArrowForward />{" "}
          </span>
          <span>
            As Founding Engineer, I lead multiple projects from conception to completion, consistently delivering ahead of schedule while maintaining high code quality and client satisfaction.
          </span>
        </li>
        <li className="text-base flex gap-2 text-textLight">
          <span className="text-textOrange mt-1">
            <TiArrowForward />{" "}
          </span>
          <span className="flex flex-col gap-2 ">
            <p>
              - Architect and develop full-stack applications using modern frameworks and cloud infrastructure
            </p>
            <p>
              - Implement integrations with third parties such as Stripe, Twilio, and various APIs
            </p>
            <p>
              - Design and manage database migrations, API development, and cloud deployments using infrastructure as code
            </p>
          </span>
        </li>
        <li className="text-base flex gap-2 text-textLight">
          <span className="text-textOrange mt-1">
            <TiArrowForward />{" "}
          </span>
          <span>
            Technologies I work with include{" "}
            <span className="text-textOrange">
              React.js · NextJS · NuxtJS · NestJS · AWS · SST · Terraform · Git · SASS · Express.js · PostgreSQL · MySQL
            </span>
          </span>
        </li>
      </ul>
    </motion.div>
  )
}

export default Majorlinkx
