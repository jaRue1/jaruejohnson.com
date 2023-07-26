/* eslint-disable @next/next/no-img-element */
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
        <div className="w-full lgl:w-2/3 text-base text-textDark font-medium flex flex-col gap-4">
          <p>
            <span className="text-textGreen">
              {" "}
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </span>
            Laboriosam, laudantium? Praesentium quaerat, tempora ipsum, ea enim
            corporis sunt blanditiis omnis, odit nemo iure temporibus animi
            soluta architecto libero velit sed! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
          </p>
          <p>
            <span className="text-textGreen">
              {" "}
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, voluptatum.
          </p>
          <p>
            <span className="text-textGreen">
              {" "}
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </span>
            Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, voluptatum.
          </p>
          <p>
            {" "}
            Here are a few technologies, languages and tools I have been working
            with recently:
          </p>
          <ul className="max-w-[450px] text-sm font-titleFont grid grid-cols-3 gap-2 mt-6">
            <li className="flex items-center ">
              <span className="text-textGreen">
                <AiFillThunderbolt />
              </span>
              HTML5
            </li>
            <li className="flex items-center ">
              <span className="text-textGreen">
                <AiFillThunderbolt />
              </span>
              Tailwind CSS
            </li>
            <li className="flex items-center ">
              <span className="text-textGreen">
                <AiFillThunderbolt />
              </span>
              JavaScript (ES6+)
            </li>
            <li className="flex items-center ">
              <span className="text-textGreen">
                <AiFillThunderbolt />
              </span>
              TypeScript
            </li>
            <li className="flex items-center">
              <span className="text-textGreen">
                <AiFillThunderbolt />
              </span>
              React JS
            </li>
            <li className="flex items-center ">
              <span className="text-textGreen">
                <AiFillThunderbolt />
              </span>
              Next JS
            </li>
            <li className="flex items-center ">
              <span className="text-textGreen">
                <AiFillThunderbolt />
              </span>
              Vue JS
            </li>
            <li className="flex items-center ">
              <span className="text-textGreen">
                <AiFillThunderbolt />
              </span>
              Nuxt JS
            </li>
            <li className="flex items-center ">
              <span className="text-textGreen">
                <AiFillThunderbolt />
              </span>
              Nest JS
            </li>
            <li className="flex items-center ">
              <span className="text-textGreen">
                <AiFillThunderbolt />
              </span>
              AWS
            </li>
            <li className="flex items-center ">
              <span className="text-textGreen">
                <AiFillThunderbolt />
              </span>
              Cypress JS
            </li>
            <li className="flex items-center ">
              <span className="text-textGreen">
                <AiFillThunderbolt />
              </span>
              Jest
            </li>
            <li className="flex items-center ">
              <span className="text-textGreen">
                <AiFillThunderbolt />
              </span>
              MySQL
            </li>
            <li className="flex items-center ">
              <span className="text-textGreen">
                <AiFillThunderbolt />
              </span>
              Postgres
            </li>
            <li className="flex items-center ">
              <span className="text-textGreen">
                <AiFillThunderbolt />
              </span>
              Mongo
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
              <div className="hidden lgl:inline-block absolute w-full h-80 bg-textGreen/20 rounded-md top-0 left-0 group-hover:bg-transparent duration-300">
                <div className="hidden lgl:inline-flex w-full h-80 border-2 border-textGreen rounded-md group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-300 " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
