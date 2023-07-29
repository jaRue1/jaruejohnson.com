/* eslint-disable react/no-unescaped-entities */
import React from "react"

function Contact() {
  return (
    <section
      id="contact"
      className="max-w-contentContainer mx-auto py-10 xl:py-32 flex flex-col gap-4 items-center justify-center"
    >
      <p className="font-titleFont text-lg text-textOrange font-semibold flex items-center tracking-wide">
        04. What's Next
      </p>
      <h2 className="font-titleFont text-5xl font-semibold"> Get In Touch</h2>
      <p className="max-w-[600px] text-center text-textLight">
        Although I am not currently looking for any new opportunities, my inbox
        is always open. Whether you have a questions or just want to say hello,
        I will try my best to get back with you!
      </p>
      <a href="mailto:jaruejohnson@outlook.com">
        <button className="w-40 h-14 border border-textOrange mt-6 font-titleFont text-sm tracking-wider rounded-md hover:bg-hoverColor duration-300 text-textOrange">
          Introduce yourself
        </button>
      </a>
    </section>
  )
}

export default Contact
