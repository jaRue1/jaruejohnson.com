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
        I will try my best to get back with you. {" "}
        <span className="text-textOrange">jaruejohnson@outlook.com</span>
      </p>
      <p className="max-w-[600px] text-center text-textLight mt-4">
        Alternatively, you can send me a message on{" "}
        <a
          href="https://twitter.com/Tru_Rue"
          target="_blank"
          rel="noopener noreferrer"
          className="text-textOrange hover:underline"
        >
          Twitter
        </a>{" "}
        or{" "}
        <a
          href="https://www.linkedin.com/in/jarue-johnson-9a08241ab"
          target="_blank"
          rel="noopener noreferrer"
          className="text-textOrange hover:underline"
        >
          LinkedIn
        </a>
        .
      </p>
    </section>
  )
}

export default Contact
