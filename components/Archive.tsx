import React, { useState } from "react"
import ArchiveCard from "./ArchiveCard"
import { motion } from "framer-motion"
function Archive() {
  const [showMore, setShowMore] = useState(false)
  return (
    <div className="max-w-contentContainer mx-auto py-24">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-3xl font-titleFont font-semibold">My Projects</h2>
        <p className="text-sm pt-2 font-titleFont text-textOrange">
          view my archive
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10 lgl:px-10">
        <ArchiveCard
          title="Amazon Clone"
          link="https://github.com/jaRue1/amazon-clone"
          description="This an amazon clone built with ReactJS and integrated with stripe ayment
          gateway. It has a fully functional cart and a user
          authentication system deployed on firebase"
          tech={["Material - Ui ", "React Js", "Stripe", "Firebase"]}
        />
        <ArchiveCard
          title="Trello Clone"
          link="https://github.com/jaRue1/trello-clone"
          description="built with NuxtJS and styled with user can
          create boards and add tasks to the board. Also color coordinated
          the boards and even upload images as the background of the
          board."
          tech={["NuxtJS", "Vuetify", "Firebase"]}
        />
        <ArchiveCard
          title="Affirmations App"
          link="https://github.com/jaRue1/affirmations-react-app"
          description="built with ReactJS and integrated with google and login and deployed on firebase"
          tech={["ReactJS", "Node Js", "Firebase"]}
        />

        <ArchiveCard
          title="AWS Node Crud Api"
          link="https://github.com/jaRue1/aws-node-crud-api"
          description="This is a tutorial on how to use aws service EC2 and CICD tools Code pipeline and Code deploy"
          tech={["Node Js", "AWS", "Bash"]}
        />
        <ArchiveCard
          title="AWS 101"
          link="https://github.com/jaRue1/aws-101"
          description="This is a repo I created to become proficient with aws core concepts as well as use their services effectively"
          tech={["Terraform", "Bash", "Python", "JavaScript"]}
        />
        <ArchiveCard
          title="CSV Parser App"
          link="https://github.com/jaRue1/CSV-Parser-App"
          description="This app interacts with a mySQL DB , Express/Node Api and uses React to render the Frontend. I built this to showcase my love for anime."
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
                link="https://github.com/jaRue1/react-s3"
                description="This project is example of using react and the aws-sdk to upload images to S3."
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
                link="https://github.com/jaRue1/typeScript101"
                description="Everything you need to know about the basics of building with typescript. I created this when I was teaching myself the basics of TypeScript"
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
                title="Nest Js Crud Api"
                link="https://github.com/jaRue1/nest-crud-api"
                description="This is a example of a crud api that uses nestjsx/crud dependency to implement crud functionality. 
                This project use an relational database sqlite to store data I also used the swagger ui library to create and interactive ui. "
                tech={["Nest JS", "Sqlite", "Swagger"]}
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
                link="https://github.com/jaRue1/nsestjs-mircoservice-1"
                description="This was a project where I learned how to build microservices with Nest Js. I learn a lot about software architecture from this."
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
                link="https://github.com/jaRue1/tdd"
                description="This a basic starter for any trying to learn how to write test and adopt the test drive development mindset "
                tech={["Jest", "JavaScript"]}
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
                link="https://github.com/jaRue1/dashboard-app"
                description="I built a dashboard so that I could gain a better understanding of UX/UI decisions. It was interesting to switch between dev and user roles to see if what I built made sense."
                tech={["React JS", "Material UI"]}
              />
            </motion.div>
          </>
        )}
      </div>
      <div className="mt-12 flex items-center justify-center">
        <button
          onClick={() => setShowMore(!showMore)}
          className="w-36 h-12 rounded-md text-textOrange text-[13px] border border-textOrange hover:bg-hoverColor duration-300"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  )
}

export default Archive
