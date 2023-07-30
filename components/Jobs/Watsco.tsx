/* eslint-disable react/no-unescaped-entities */
import React from "react"
import { motion } from "framer-motion"
import { TiArrowForward } from "react-icons/ti"

function Watsco() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <h3 className="flex gap-1 font-medium text-xl font-titleFont xs:text-xs sm:text-base sm:items-center sml:text-xl">
        Platform Engineer{" "}
        <span className="text-textOrange tracking-wide   ">
          <a href="https://www.watscoventures.com/" target="_blank">
            @Watsco Ventures
          </a>
        </span>
      </h3>
      <p className="text-sm mt-1 font-medium text-textDark">
        Jun 2021 - Jan 2022{" "}
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        <li className="text-base flex gap-2 text-textLight">
          <span className="text-textOrange mt-1">
            <TiArrowForward />{" "}
          </span>
          <span>
            Watsco Ventures is technology company that provides software
            solutions to contractors in the HVAC industry. This company is the
            technical arm of Watsco one of North Americas largest distributors
            of commercial HVAC equipment and supplies over 90,000 contractors.{" "}
            <span className="text-textOrange">
              <a href="https://www.watscoventures.com/" target="_blank">
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
              - Worked closely with a senior engineer to completely overhaul
              three CI/CD pipelines, simplifying their configuration and
              drastically improving the development team's productivity.
            </p>
            <p>
              - Collocated the Infrastructure as Code (IaC) so that each service
              owned its own infrastructure, primarily using Terraform, AWS
              CodePipeline, and AWS CodeDeploy.{" "}
            </p>
            <p>
              - Developed custom bash scripts for setting up the boilerplate
              infrastructure, enabling rapid implementation of new services
              through environment variable configuration and script execution.
            </p>
            <p>
              - Simplified our Kubernetes setup and enabled VPC peering between
              our Kafka cluster and Kubernetes cluster to meet custom business
              requirements.
            </p>
          </span>
        </li>
        <li className="text-base flex gap-2 text-textLight">
          <span className="text-textOrange mt-1">
            <TiArrowForward />{" "}
          </span>
          <span>
            Some of the technologies I became proficient in while working here
            are{" "}
            <span className="text-textOrange">
              Terraform · Docker · Bash · Git · JavaScript · AWS · Kafka ·
              Kubernetes
            </span>
          </span>
        </li>
      </ul>
    </motion.div>
  )
}

export default Watsco
