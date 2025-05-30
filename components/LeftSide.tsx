import React from "react"
import { TbBrandGithub, TbBrandTwitter } from "react-icons/tb"
import { SlSocialLinkedin, SlSocialInstagram } from "react-icons/sl"

function LeftSide() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-end gap-4 text-textLight">
      <div className="flex flex-col gap-4 ">
        <a href="https://github.com/jaRue1" target="_blank">
          <span className="w-10 h-10 text-xl bg-hoverColor rounded-full inline-flex items-center justify-center hover:text-textOrange cursor-pointer hover:-translate-y-2 transition-all duration-300">
            <TbBrandGithub />
          </span>
        </a>
        <a href="https://twitter.com/Tru_Rue" target="_blank">
          <span className="w-10 h-10 text-xl bg-hoverColor rounded-full inline-flex items-center justify-center hover:text-textOrange cursor-pointer hover:-translate-y-2 transition-all duration-300">
            <TbBrandTwitter />
          </span>
        </a>
        <a
          href="https://www.linkedin.com/in/jarue-johnson-9a08241ab/"
          target="_blank"
        >
          <span className="w-10 h-10 text-xl bg-hoverColor rounded-full inline-flex items-center justify-center hover:text-textOrange cursor-pointer hover:-translate-y-2 transition-all duration-300">
            <SlSocialLinkedin />
          </span>
        </a>
        {/* No need to show ig here */}
        {/* <a href="https://www.instagram.com/jarue_johnson" target="_blank">
          <span className="w-10 h-10 text-xl bg-hoverColor rounded-full inline-flex items-center justify-center hover:text-textOrange cursor-pointer hover:-translate-y-2 transition-all duration-300">
            <SlSocialInstagram />
          </span>
        </a> */}
      </div>
      <span className="w-[2px] h-32 bg-textDark"></span>
    </div>
  )
}

export default LeftSide
