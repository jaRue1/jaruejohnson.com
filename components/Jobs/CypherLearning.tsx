/* eslint-disable react/no-unescaped-entities */
import React from "react"
import { motion } from "framer-motion"
import { TiArrowForward } from "react-icons/ti"

function CypherLearning() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <h3 className="flex gap-1 font-medium text-xl font-titleFont xs:text-xs sm:text-lg sm:items-center sml:text-xl">
        Staff Engineer{" "}
        <span className="text-textOrange tracking-wide">
          <a href="https://www.cypherlearning.com/" target="_blank">
            @Cypher Learning
          </a>
        </span>
      </h3>
      <p className="text-sm mt-1 font-medium text-textDark">
        Feb 2025 - Present
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        <li className="text-base flex gap-2 text-textLight">
          <span className="text-textOrange mt-1">
            <TiArrowForward />{" "}
          </span>
          <span>
            Cypher Learning is leading the disruption of learning platforms to unleash human
            potential with modern, AI-powered learning experiences. The platform serves millions
            of learners across 20,000+ organizations globally.{" "}
            <span className="text-textOrange">
              <a href="https://www.cypherlearning.com/" target="_blank">
                Learn More
              </a>
            </span>
          </span>
        </li>

        <li className="text-base flex gap-2 text-textLight">
          <span className="text-textOrange mt-1">
            <TiArrowForward />{" "}
          </span>
          <span className="flex flex-col gap-2">
            <p>
              - Serving as a technical linchpin across the engineering organization, driving
              technical coherence, modernizing systems, and elevating engineering standards at scale.
            </p>
            <p>
              - Defining and owning the platform's architectural roadmap across frontend, backend,
              and mobile, ensuring systems are scalable, secure, and maintainable.
            </p>
            <p>
              - Expanding technical expertise into Ruby on Rails, marking a significant growth
              opportunity beyond the TypeScript/Node ecosystem.
            </p>
          </span>
        </li>
        <li className="text-base flex gap-2 text-textLight">
          <span className="text-textOrange mt-1">
            <TiArrowForward />{" "}
          </span>
          <span>
            Technologies:{" "}
            <span className="text-textOrange">
              Ruby on Rails · MySQL · AWS
            </span>
          </span>
        </li>
      </ul>
    </motion.div>
  )
}

export default CypherLearning
