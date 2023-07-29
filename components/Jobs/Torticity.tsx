import React from "react"
import { motion } from "framer-motion"
import { TiArrowForward } from "react-icons/ti"
function Torticity() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <h3 className="flex gap-1 font-medium text-xl font-titleFont">
        Software Engineer{" "}
        <span className="text-textGreen tracking-wide">
          <a href="https://torticity.com/" target="_blank">
            @Torticity
          </a>
        </span>
      </h3>
      <p className="text-sm mt-1 font-medium text-textDark">
        Jan 2022 - Present{" "}
        {/* implement some way to calculate how long I worked at a company */}
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textGreen mt-1">
            <TiArrowForward />{" "}
          </span>
          <span>
            Torticity is a startup in the legal industry that sells services
            powered by technology. They are strategically position in the mass
            tort and personal injury industries and provide solutions for those
            niches.{" "}
            <span className="text-textGreen">
              <a href="https://torticity.com/" target="_blank">
                Learn More
              </a>
            </span>
          </span>
        </li>

        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textGreen mt-1">
            <TiArrowForward />{" "}
          </span>
          <span className="flex flex-col gap-2 ">
            <p>
              - Assisted in the successful launch of the Claimant Portal, an
              external application that streamlined the intake process and
              provided a secure way for users to upload documents for Personal
              Injury cases.
            </p>
            <p>
              - Implemented core features on the internal Dockit application,
              including the integration of predefined filters using Algolia.
            </p>
            <p>
              {" "}
              - Implemented a pivotal feature on the Brief application, enabling
              users to view documents by leveraging the AWS SDK to interact with
              S3
            </p>
          </span>
        </li>
        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textGreen mt-1">
            <TiArrowForward />{" "}
          </span>
          <span>
            Some of the technologies I became proficient in while working here
            are{" "}
            <span className="text-textGreen">
              Object-Oriented Programming (OOP) · NestJS · Nuxt.js · Vue.js ·
              Cypress.io · Tailwind CSS · PostgresSQL
            </span>
          </span>
        </li>
      </ul>
    </motion.div>
  )
}

export default Torticity
