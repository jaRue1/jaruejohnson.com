/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from "react"
import SectionTitle from "./SectionTitle"
import { motion } from "framer-motion"

import { AiFillThunderbolt } from "react-icons/ai"

function About() {
  const technologies = [
    { name: "Tailwind", url: "https://tailwindcss.com/" },
    { name: "TypeScript", url: "https://www.typescriptlang.org/" },
    { name: "Python", url: "https://www.python.org/" },
    { name: "C#", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
    { name: "React", url: "https://react.dev/" },
    { name: "NextJs", url: "https://nextjs.org/" },
    { name: "NuxtJs", url: "https://nuxt.com/" },
    { name: "NestJs", url: "https://nestjs.com/" },
    { name: "ExpressJs", url: "https://expressjs.com/" },
    { name: "AWS", url: "https://aws.amazon.com/" },
    { name: "GCP", url: "https://cloud.google.com/gcp" },
    { name: "Jest", url: "https://jestjs.io/" },
    { name: "MySQL", url: "https://www.mysql.com/" },
    { name: "PostgreSQL", url: "https://www.postgresql.org/" },
    { name: "MongoDB", url: "https://www.mongodb.com/" },
    { name: "Redis", url: "https://redis.io/" },
    { name: "Bash", url: "https://www.gnu.org/software/bash/manual/bash.html" },
    { name: "Docker", url: "https://www.docker.com/" },
    { name: "Terraform", url: "https://developer.hashicorp.com/terraform?ajs_aid=bdf16eee-8a78-446d-ae45-a94dc4206ea1&product_intent=terraform" },
    { name: "Git", url: "https://git-scm.com/" },
  ]

  return (
    <section
      id="about"
      className="max-w-containerSmall mx-auto py-10 lgl:py-32 flex flex-col gap-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <SectionTitle title="About Me" titleNum="01." />
      </motion.div>

      <div className="flex flex-col lgl:flex-row gap-8">
        {/* Image Section - appears first on mobile, second on desktop */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="w-full lgl:w-1/3 order-1 lgl:order-2"
        >
          <div className="relative h-96 group">
            <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-2xl p-6 h-full backdrop-blur-sm relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-textOrange/20 to-transparent rounded-full blur-lg opacity-50" />
              <div className="absolute bottom-2 left-2 w-8 h-8 bg-gradient-to-br from-textOrange/10 to-transparent rounded-full blur-md" />
              
              <div className="relative h-full flex items-center justify-center">
                <div className="relative">
                  <motion.img
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    className="w-full h-80 object-cover rounded-xl shadow-lg shadow-black/50 border-2 border-gray-600/30 group-hover:border-textOrange/50 transition-all duration-300"
                    src="/assets/images/test.jpg"
                    alt="profile"
                  />
                  
                  {/* Floating elements around image */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-textOrange rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500 group-hover:animate-ping" />
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-textOrange/60 rounded-full opacity-0 group-hover:opacity-40 transition-all duration-700 delay-200 group-hover:animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Section - appears second on mobile, first on desktop */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full lgl:w-2/3 order-2 lgl:order-1"
        >
          <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-textOrange/10 to-transparent rounded-full blur-xl" />
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-textOrange/5 to-transparent rounded-full blur-lg" />
            
            <div className="relative z-10 text-base text-textLight font-medium flex flex-col gap-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="text-textOrange">
                  Hello, I'm Jarue "Rue" Johnson, born and raised in Florida, and
                  I've been in love with technology since I was 16.
                </span>{" "}
                My dad, a engineer himself, was the one who introduced me to the
                world of tech. Learning from him and many others, I've grown a lot,
                not just as an engineer, but as a person too.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <span className="text-textOrange">
                  What really makes me happy is using my tech skills to help others.
                </span>{" "}
                My love for helping people has been with me since I was a kid. Plus,
                I'm a big fan of sports and music. What's really cool is that I get
                to mix these interests with my love for coding, and that's where the
                magic happens!
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-textOrange">
                  The awesome thing about coding is that there are no real limits.
                </span>{" "}
                You can do so much with it, and the only limits are the ones you put
                on yourself! In short, I'm not just an engineer, but also someone
                who loves to solve problems and dream big. I'm excited to keep
                learning and growing, and to use technology to make a real
                difference in the world.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-textDark"
              >
                Here are a few technologies, languages and tools I have been working
                with recently:
              </motion.p>

              {/* Modern Tech Stack Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="mt-4"
              >
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {technologies.map((tech, index) => (
                    <motion.a
                      key={tech.name}
                      href={tech.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      className="group"
                    >
                      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-lg border border-gray-600/30 hover:border-textOrange/50 transition-all duration-300 hover:bg-gradient-to-r hover:from-textOrange/10 hover:to-orange-900/20">
                        <span className="text-textOrange group-hover:scale-110 transition-transform duration-300">
                          <AiFillThunderbolt className="w-4 h-4" />
                        </span>
                        <span className="text-xs font-titleFont text-textDark group-hover:text-textOrange transition-colors duration-300">
                          {tech.name}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        viewport={{ once: true }}
        className="mt-8 w-full h-[1px] bg-gradient-to-r from-transparent via-textOrange to-transparent"
      />
    </section>
  )
}

export default About
