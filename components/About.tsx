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
          <ul className="max-w-[450px] text-sm font-titleFont grid grid-cols-4 gap-2 mt-6">
            <a
              href="https://developer.mozilla.org/en-US/docs/Glossary/HTML5"
              target="_blank"
            >
              <li className="flex items-center hover:text-textOrange">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                HTML5
              </li>
            </a>

            <a href="https://tailwindcss.com/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Tailwind
              </li>
            </a>

            <a href="https://flowbite.com/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Flowbite
              </li>
            </a>

            <a href="https://sass-lang.com/guide/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                SASS
              </li>
            </a>

            <a href="http://es6-features.org/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                JS (ES6+)
              </li>
            </a>

            <a href="https://www.typescriptlang.org/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                TypeScript
              </li>
            </a>

            <a href="https://www.python.org/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Python
              </li>
            </a>

            <a
              href="https://learn.microsoft.com/en-us/dotnet/csharp/"
              target="_blank"
            >
              {/*  Build Something Real World with this */}
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  {" "}
                  <AiFillThunderbolt />
                </span>
                C#
              </li>
            </a>

            <a href="https://react.dev/" target="_blank">
              <li className="flex items-center hover:text-textOrange">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                React
              </li>
            </a>

            <a href="https://nextjs.org/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Next
              </li>
            </a>

            <a href="https://vuejs.org/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Vue
              </li>
            </a>

            <a href="https://nuxt.com/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Nuxt
              </li>
            </a>

            <a href="https://nestjs.com/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Nest
              </li>
            </a>

            <a href="https://expressjs.com/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Express
              </li>
            </a>

            <a href="https://aws.amazon.com/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                AWS
              </li>
            </a>

            <a href="https://cloud.google.com/gcp" target="_blank">
              {" "}
              {/*  Build Something Real World with this */}
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                GCP
              </li>
            </a>

            <a href="https://www.chaijs.com/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Chai
              </li>
            </a>

            <a href="https://mochajs.org/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Mocha
              </li>
            </a>

            <a href="https://www.cypress.io/app/?gad=1" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Cypress
              </li>
            </a>

            <a href="https://jestjs.io/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Jest
              </li>
            </a>

            <a href="https://www.mysql.com/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                MySQL
              </li>
            </a>

            <a href="https://www.postgresql.org/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Postgres
              </li>
            </a>

            <a href="https://www.mongodb.com/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Mongo
              </li>
            </a>
            {/*  Build Something Real World with this */}
            <a href="https://redis.io/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Redis
              </li>
            </a>

            <a
              href="https://www.gnu.org/software/bash/manual/bash.html"
              target="_blank"
            >
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Bash
              </li>
            </a>

            <a href="https://www.docker.com/" target="_blank">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Docker
              </li>
            </a>

            <a href="https://developer.hashicorp.com/terraform?ajs_aid=bdf16eee-8a78-446d-ae45-a94dc4206ea1&product_intent=terraform">
              <li className="flex items-center hover:text-textOrange ">
                <span className="text-textOrange">
                  <AiFillThunderbolt />
                </span>
                Terraform
              </li>
            </a>
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
