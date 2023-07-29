import React, { useState } from "react"
import ArchiveCard from "./ArchiveCard"
import { motion } from "framer-motion"
function Archive() {
  const [showMore, setShowMore] = useState(false)
  return (
    <div className="max-w-contentContainer mx-auto py-24">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-3xl font-titleFont font-semibold">
          Other Projects
        </h2>
        <p className="text-sm font-titleFont text-textGreen">view my archive</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10 lgl:px-10">
        <ArchiveCard
          title="AWS Node Crud Api"
          link=""
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, corrupti officiis dolore ducimus recusandae iure animi harum. Inventore quas esse sed ipsum molestiae atque, hic ipsa minus enim fugiat quis?"
          tech={["Node Js", "AWS", "Bash"]}
        />
        <ArchiveCard
          title="AWS 101"
          link=""
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, corrupti officiis dolore ducimus recusandae iure animi harum. Inventore quas esse sed ipsum molestiae atque, hic ipsa minus enim fugiat quis?"
          tech={["Terraform", "Bash", "Python", "JavaScript"]}
        />
        <ArchiveCard
          title="CSV Parser App"
          link=""
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, corrupti officiis dolore ducimus recusandae iure animi harum. Inventore quas esse sed ipsum molestiae atque, hic ipsa minus enim fugiat quis?"
          tech={["ReactJS", "Node Js", "Express", "SQL"]}
        />
        {showMore && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {" "}
              <ArchiveCard
                title="React S3"
                link=""
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, corrupti officiis dolore ducimus recusandae iure animi harum. Inventore quas esse sed ipsum molestiae atque, hic ipsa minus enim fugiat quis?"
                tech={["React Js", "s3", "aws-sdk"]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ArchiveCard
                title="TypeScript 101"
                link=""
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, corrupti officiis dolore ducimus recusandae iure animi harum. Inventore quas esse sed ipsum molestiae atque, hic ipsa minus enim fugiat quis?"
                tech={["Typecript"]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {" "}
              <ArchiveCard
                title="Nest Js Task Api"
                link=""
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, corrupti officiis dolore ducimus recusandae iure animi harum. Inventore quas esse sed ipsum molestiae atque, hic ipsa minus enim fugiat quis?"
                tech={["Nest JS", "Postgres", "Jest"]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {" "}
              <ArchiveCard
                title="Nest Js Mircoservice"
                link=""
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, corrupti officiis dolore ducimus recusandae iure animi harum. Inventore quas esse sed ipsum molestiae atque, hic ipsa minus enim fugiat quis?"
                tech={["Nest JS", "Mongo DB", "MySQL", "Rabbit MQ"]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {" "}
              <ArchiveCard
                title="TDD Starter"
                link=""
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, corrupti officiis dolore ducimus recusandae iure animi harum. Inventore quas esse sed ipsum molestiae atque, hic ipsa minus enim fugiat quis?"
                tech={["Jest"]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {" "}
              <ArchiveCard
                title="dashboard app"
                link=""
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, corrupti officiis dolore ducimus recusandae iure animi harum. Inventore quas esse sed ipsum molestiae atque, hic ipsa minus enim fugiat quis?"
                tech={["React JS", "Material UI"]}
              />
            </motion.div>
          </>
        )}
      </div>
      <div className="mt-12 flex items-center justify-center">
        <button
          onClick={() => setShowMore(!showMore)}
          className="w-36 h-12 rounded-md text-textGreen text-[13px] border border-textGreen hover:bg-hoverColor duration-300"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  )
}

export default Archive
