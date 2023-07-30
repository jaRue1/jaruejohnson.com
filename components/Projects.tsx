/* eslint-disable @next/next/no-img-element */
import React from "react"
import SectionTitle from "./SectionTitle"
import { TbBrandGithub } from "react-icons/tb"
import { RxOpenInNewWindow } from "react-icons/rx"
function Projects() {
  return (
    <section id="projects" className="max-w-container mx-auto lgl:px-20 py-24">
      <SectionTitle title="Some things I have built" titleNum="03" />
      <div className="w-full flex flex-col items-center justify-between gap-28 mt-10">
        {" "}
        {/* One */}
        <div className="w-full flex flex-col items-center justify-between gap-28 mt-10">
          <div className="flex flex-col xl:flex-row gap-6">
            <a
              href="https://clone-jj.web.app/"
              target="_blank"
              className="w-full xl:w-1/2 h-auto relative group"
            >
              <div>
                <img src="/assets/images/amz.png" alt="" />
              </div>
            </a>
            <div className="w-full xl:w-1/2 flex flex-col gap-6 lgl:justify-between items-end text-right xl:-ml-16 z-10">
              <p className="font-titleFont text-textOrange text-sm tracking-wide">
                Feature Project
              </p>
              <h3 className="text-2xl font-bold">Amazon Clone</h3>
              <p className="bg-customBg text-sm md:text-base p-2 md:p-6 rounded-md">
                This an amazon clone built with ReactJS and integrated with
                <span className="text-textOrange"> stripe </span> payment
                gateway. It has a fully functional cart and a user
                authentication system deployed on{" "}
                <span className="text-textOrange">firebase</span>.
              </p>
              <ul className="text-xs md:text-sm font-titleFont tracking-wide flex gap-2 md:gap-5 justify-between text-textDark">
                <li>Material - Ui </li>
                <li>React Js</li>
                <li>Stripe</li>
                <li>Firebase</li>
              </ul>
              <div className="text-2xl flex gap-4">
                <a
                  className="hover:text-textOrange duration-300"
                  href="https://github.com/jaRue1/amazon-clone"
                  target="_blank"
                >
                  <TbBrandGithub />
                </a>
                <a
                  className="hover:text-textOrange duration-300"
                  href="https://clone-jj.web.app"
                  target="_blank"
                >
                  {" "}
                  <RxOpenInNewWindow />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Two */}
        <div className="w-full flex flex-col items-center justify-center gap-28 mt-10">
          <div className="flex flex-col xl:flex-row-reverse gap-6">
            <a
              href="https://kanban-clone-jj.web.app/"
              target="_blank"
              className="w-full xl:w-1/2 h-auto relative group"
            >
              <div>
                <img src="/assets/images/trello-clone.png" alt="" />
              </div>
            </a>
            <div className="w-full xl:w-1/2 flex flex-col gap-6 items-end z-10">
              <p className="font-titleFont text-textOrange text-sm tracking-wide">
                Feature Project
              </p>
              <h3 className="text-2xl font-bold">Trello Clone</h3>
              <p className="bg-customBg text-sm md:text-base p-2 md:p-6 rounded-md xl:-mr-16">
                This an trello clone built with NuxtJS and styled with
                <span className="text-textOrange"> Vuetify </span> User can
                create boards and add tasks to the board. Also color coordinated
                the boards and even upload images as the background of the
                board. It has a fully functional user authentication system
                deployed on <span className="text-textOrange">firebase</span>.
              </p>
              <ul className="text-xs md:text-sm font-titleFont tracking-wide flex gap-2 md:gap-5 justify-between text-textDark">
                <li>Vuetify</li>
                <li>Nuxt Js</li>
                <li>Moment</li>
                <li>Firebase</li>
              </ul>
              <div className="text-2xl flex gap-4">
                <a
                  className="hover:text-textOrange duration-300"
                  href="https://github.com/jaRue1/trello-clone"
                  target="_blank"
                >
                  <TbBrandGithub />
                </a>
                <a
                  className="hover:text-textOrange duration-300"
                  href="https://kanban-clone-jj.web.app/"
                  target="_blank"
                >
                  {" "}
                  <RxOpenInNewWindow />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Three */}
        <div className="w-full flex flex-col items-center justify-between gap-28 mt-10">
          <div className="flex flex-col xl:flex-row gap-6">
            <a
              href="https://affirm-app-jj.web.app/"
              target="_blank"
              className="w-full xl:w-1/2 h-auto relative group"
            >
              <div>
                <img src="/assets/images/affirmations.png" alt="" />
              </div>
            </a>
            <div className="w-full xl:w-1/2 flex flex-col gap-6 items-end text-right xl:-ml-16 z-10">
              <p className="font-titleFont text-textOrange text-sm tracking-wide">
                Feature Project
              </p>
              <h3 className="text-2xl font-bold">Affirmations App</h3>
              <p className="bg-customBg text-sm md:text-base p-2 md:p-6 rounded-md">
                This an affirmations app built with ReactJS and integrated with
                <span className="text-textOrange"> google </span> login deployed
                on <span className="text-textOrange">firebase</span>.
              </p>
              <ul className="text-xs md:text-sm font-titleFont tracking-wide flex gap-2 md:gap-5 justify-between text-textDark">
                <li>React Js</li>
                <li>Firebase</li>
              </ul>
              <div className="text-2xl flex gap-4">
                <a
                  className="hover:text-textOrange duration-300"
                  href="https://github.com/jaRue1/affirmations-react-app"
                  target="_blank"
                >
                  <TbBrandGithub />
                </a>
                <a
                  className="hover:text-textOrange duration-300"
                  href="https://affirm-app-jj.web.app/"
                  target="_blank"
                >
                  {" "}
                  <RxOpenInNewWindow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
