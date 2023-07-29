/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from "react"
import SectionTitle from "./SectionTitle"

import { AiFillThunderbolt } from "react-icons/ai"

function About() {
  return (
    <section
      id="about"
      className="max-w-containerSmall mx-auto py-10 lgl:py-32 flex flex-col gap-8"
    >
      <SectionTitle title="About Me" titleNum="01." />
      <div className="flex flex-col lgl:flex-row gap-16">
        <div className="w-full lgl:w-2/3 text-base text-textLight font-medium flex flex-col gap-4">
          <p>
            <span className="text-textOrange">
              {" "}
              Hello, I'm Jarue "Rue" Johnson, born and raised in Florida, and
              I've been in love with technology since I was 16.
            </span>{" "}
            My dad, a engineer himself, was the one who introduced me to the
            world of tech. Learning from him and many others, I've grown a lot,
            not just as an engineer, but as a person too..
          </p>
          <p>
            <span className="text-textOrange">
              {" "}
              What really makes me happy is using my tech skills to help others.
            </span>{" "}
            My love for helping people has been with me since I was a kid. Plus,
            I'm a big fan of sports and music. What's really cool is that I get
            to mix these interests with my love for coding, and that's where the
            magic happens!
          </p>
          <p>
            <span className="text-textOrange">
              {" "}
              The awesome thing about coding is that there are no real limits.
            </span>{" "}
            You can do so much with it, and the only limits are the ones you put
            on yourself! In short, I'm not just an engineer, but also someone
            who loves to solve problems and dream big. I'm excited to keep
            learning and growing, and to use technology to make a real
            difference in the world.
          </p>
          <p>
            {" "}
            Here are a few technologies, languages and tools I have been working
            with recently:
          </p>
          <ul className="max-w-[450px] text-sm font-titleFont grid grid-cols-3 gap-2 mt-6">
            <li className="flex items-center ">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              HTML5
            </li>
            <li className="flex items-center ">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              Tailwind CSS
            </li>
            <li className="flex items-center ">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              JavaScript (ES6+)
            </li>
            <li className="flex items-center ">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              TypeScript
            </li>
            <li className="flex items-center">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              React JS
            </li>
            <li className="flex items-center ">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              Next JS
            </li>
            <li className="flex items-center ">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              Vue JS
            </li>
            <li className="flex items-center ">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              Nuxt JS
            </li>
            <li className="flex items-center ">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              Nest JS
            </li>
            <li className="flex items-center ">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              AWS
            </li>
            <li className="flex items-center ">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              Cypress JS
            </li>
            <li className="flex items-center ">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              Jest
            </li>
            <li className="flex items-center ">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              MySQL
            </li>
            <li className="flex items-center ">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              Postgres
            </li>
            <li className="flex items-center ">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              Mongo
            </li>
            <li className="flex items-center ">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              Bash
            </li>
            <li className="flex items-center ">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              Docker
            </li>
            <li className="flex items-center ">
              <span className="text-textOrange">
                <AiFillThunderbolt />
              </span>
              Terraform
            </li>
          </ul>
        </div>

        <div className="w-full lgl:w-1/3 h-80 relative group">
          <div className="absolute w-full h-80 -left-2 -top-2 rounded-lg">
            <div className="w-full h-full relative flex pl-6 lgl:pl-0">
              <img
                className=" z-20 rounded-lg h-full object-cover -translate-x-4 -translate-y-4 transition-transform duration-300 "
                src="/assets/images/profile.png"
                alt="profile"
              />
              <div className="hidden lgl:inline-block absolute w-full h-80 bg-textOrange/20 rounded-md top-0 left-0 group-hover:bg-transparent duration-300">
                <div className="hidden lgl:inline-flex w-full h-80 border-2 border-textOrange rounded-md group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-300 " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
