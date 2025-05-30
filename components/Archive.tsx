import React, { useState } from "react"
import ArchiveCard from "./ArchiveCard"
import { motion } from "framer-motion"
import SectionTitle from "./SectionTitle"

function Archive() {
  const [showMore, setShowMore] = useState(false)
  
  return (
    <section
      id="projects"
      className="max-w-containerSmall mx-auto py-10 lgl:py-32 flex flex-col gap-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <SectionTitle title="My Projects" titleNum="04." />
        <div className="mt-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-textDark max-w-2xl mx-auto"
          >
            A collection of projects I&apos;ve worked on, from web applications to learning experiments
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-textOrange/10 to-transparent rounded-full blur-xl" />
          <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-textOrange/5 to-transparent rounded-full blur-lg" />
          
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <ArchiveCard
                  title="Amazon Clone"
                  link="https://github.com/jaRue1/amazon-clone"
                  description="This an amazon clone built with ReactJS and integrated with stripe payment gateway. It has a fully functional cart and a user authentication system deployed on firebase"
                  tech={["Material - Ui ", "React Js", "Stripe", "Firebase"]}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <ArchiveCard
                  title="Trello Clone"
                  link="https://github.com/jaRue1/trello-clone"
                  description="built with NuxtJS and styled with user can create boards and add tasks to the board. Also color coordinated the boards and even upload images as the background of the board."
                  tech={["NuxtJS", "Vuetify", "Firebase"]}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <ArchiveCard
                  title="Affirmations App"
                  link="https://github.com/jaRue1/affirmations-react-app"
                  description="built with ReactJS and integrated with google and login and deployed on firebase"
                  tech={["ReactJS", "Node Js", "Firebase"]}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <ArchiveCard
                  title="AWS Node Crud Api"
                  link="https://github.com/jaRue1/aws-node-crud-api"
                  description="This is a tutorial on how to use aws service EC2 and CICD tools Code pipeline and Code deploy"
                  tech={["Node Js", "AWS", "Bash"]}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <ArchiveCard
                  title="AWS 101"
                  link="https://github.com/jaRue1/aws-101"
                  description="This is a repo I created to become proficient with aws core concepts as well as use their services effectively"
                  tech={["Terraform", "Bash", "Python", "JavaScript"]}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <ArchiveCard
                  title="CSV Parser App"
                  link="https://github.com/jaRue1/CSV-Parser-App"
                  description="This app interacts with a mySQL DB , Express/Node Api and uses React to render the Frontend. I built this to showcase my love for anime."
                  tech={["ReactJS", "Node Js", "Express", "SQL"]}
                />
              </motion.div>

              {showMore && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <ArchiveCard
                      title="React S3"
                      link="https://github.com/jaRue1/react-s3"
                      description="This project is example of using react and the aws-sdk to upload images to S3."
                      tech={["React Js", "s3", "aws-sdk"]}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <ArchiveCard
                      title="TypeScript 101"
                      link="https://github.com/jaRue1/typeScript101"
                      description="Everything you need to know about the basics of building with typescript. I created this when I was teaching myself the basics of TypeScript"
                      tech={["TypeScript"]}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <ArchiveCard
                      title="Nest Js Crud Api"
                      link="https://github.com/jaRue1/nest-crud-api"
                      description="This is a example of a crud api that uses nestjsx/crud dependency to implement crud functionality. This project use an relational database sqlite to store data I also used the swagger ui library to create and interactive ui."
                      tech={["Nest JS", "Sqlite", "Swagger"]}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <ArchiveCard
                      title="Nest Js Microservice"
                      link="https://github.com/jaRue1/nsestjs-mircoservice-1"
                      description="This was a project where I learned how to build microservices with Nest Js. I learn a lot about software architecture from this."
                      tech={["Nest JS", "Mongo DB", "MySQL", "Rabbit MQ"]}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <ArchiveCard
                      title="TDD Starter"
                      link="https://github.com/jaRue1/tdd"
                      description="This a basic starter for any trying to learn how to write test and adopt the test drive development mindset"
                      tech={["Jest", "JavaScript"]}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <ArchiveCard
                      title="Dashboard App"
                      link="https://github.com/jaRue1/dashboard-app"
                      description="I built a dashboard so that I could gain a better understanding of UX/UI decisions. It was interesting to switch between dev and user roles to see if what I built made sense."
                      tech={["React JS", "Material UI"]}
                    />
                  </motion.div>
                </>
              )}
            </div>

            {/* Show More/Less Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: showMore ? 0.8 : 0.7 }}
              viewport={{ once: true }}
              className="mt-12 flex items-center justify-center"
            >
              <motion.button
                onClick={() => setShowMore(!showMore)}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-44 h-12 text-sm font-titleFont border-2 border-textOrange rounded-xl text-textOrange tracking-wide overflow-hidden transition-all duration-300 hover:text-white"
              >
                {/* Button background animation */}
                <span className="absolute inset-0 bg-gradient-to-r from-textOrange to-orange-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                
                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center h-full">
                  {showMore ? "Show Less" : "Show More"}
                  <motion.span
                    className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    initial={{ x: 0 }}
                    animate={{ rotate: showMore ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ↓
                  </motion.span>
                </span>
                
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-textOrange/20 to-orange-600/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
              </motion.button>
            </motion.div>
          </div>

          {/* Floating particles */}
          <div className="absolute top-8 left-8 w-2 h-2 bg-textOrange rounded-full opacity-60 animate-ping" />
          <div className="absolute bottom-12 right-12 w-1 h-1 bg-textOrange/80 rounded-full opacity-40 animate-pulse" />
        </div>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: true }}
        className="w-full h-[1px] bg-gradient-to-r from-transparent via-textOrange to-transparent"
      />
    </section>
  )
}

export default Archive
