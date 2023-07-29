import { TbBrandGithub, TbBrandTwitter } from "react-icons/tb"
import {
  SlSocialYoutube,
  SlSocialLinkedin,
  SlSocialInstagram,
} from "react-icons/sl"
function Footer() {
  return (
    <div className="hidden mdl:inline-flex xl:hidden items-center justify-center w-full py-6 gap-6">
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
      <a href="https://www.instagram.com/jarue_johnson" target="_blank">
        <span className="w-10 h-10 text-xl bg-hoverColor rounded-full inline-flex items-center justify-center hover:text-textOrange cursor-pointer hover:-translate-y-2 transition-all duration-300">
          <SlSocialInstagram />
        </span>
      </a>
    </div>
  )
}

export default Footer
