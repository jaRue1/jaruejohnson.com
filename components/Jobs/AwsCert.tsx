/* eslint-disable react/no-unescaped-entities */
import React from "react"
import { motion } from "framer-motion"
import { TiArrowForward } from "react-icons/ti"
function AwsCert() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <h3 className="flex gap-1 font-medium text-xl font-titleFont">
        AWS Certified Developer{" "}
        <span className="text-textOrange tracking-wide">
          <a
            href="https://www.credly.com/badges/71b8fb33-2255-4c0c-bc47-d62aa2fe1b9b/linked_in_profile"
            target="_blank"
          >
            @AWS Creds
          </a>
        </span>
      </h3>
      <p className="text-sm mt-1 font-medium text-textDark">
        Dec 2022 - Dec 2025{" "}
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textOrange mt-1">
            <TiArrowForward />{" "}
          </span>
          <span>
            AWS Certified Developer – Associate I earned this certification by
            having a comprehensive understanding of application life-cycle
            management. I demonstrated proficiency in writing applications with
            AWS service APIs, AWS CLI, and SDKs; using containers; and deploying
            with a CI/CD pipeline. I am able to develop, deploy, and debug
            cloud-based applications that follow AWS best practices.{" "}
            <span className="text-textOrange">
              <a
                href="https://aws.amazon.com/certification/certified-developer-associate/#:~:text=AWS%20Certified%20Developer%20%2D%20Associate%20showcases,based%20applications%20by%20using%20AWS."
                target="_blank"
              >
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
              - Application Development and Deployment: I can design, build, and
              deploy scalable, secure applications on the AWS platform. They can
              use AWS services and SDKs to write code and set up code pipelines
              for deployment.
            </p>
            <p>
              - Serverless Applications: I can create and manage serverless
              applications using services like AWS Lambda and API Gateway,
              thereby reducing the need for server management.
            </p>
            <p>
              - Database Management: I have the knowledge to work with AWS
              databases such as Amazon RDS, DynamoDB, and Aurora. They can
              design and maintain these databases, ensuring optimal performance,
              and security.
            </p>
            <p>
              - Performance Optimization and Troubleshooting: I am capable of
              optimizing the performance of AWS applications and services. They
              can also diagnose and troubleshoot issues, using services like AWS
              CloudWatch, to ensure smooth operations.
            </p>
          </span>
        </li>
        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textOrange mt-1">
            <TiArrowForward />{" "}
          </span>
          <span>
            Some of the technologies / services I became proficient in while
            working here are{" "}
            <span className="text-textOrange">
              Python · JavaScript · S3 · Route53 · CloudFront · RDS · ECS · ECR
              · EC2 · Lambda · SNS · SQS · API Gateway and more.
            </span>
          </span>
        </li>
      </ul>
    </motion.div>
  )
}

export default AwsCert
