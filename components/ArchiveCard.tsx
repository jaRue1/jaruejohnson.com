import React from "react"
import { FaRegFolder } from "react-icons/fa"
import { RxOpenInNewWindow } from "react-icons/rx"

interface Props {
  title: string
  link: string
  description: string
  tech: string[]
}

function ArchiveCard(props: Props) {
  const { title, link, description, tech } = props
  return (
    <a href={link} target="_blank">
      <div className="w-full h-80 bg-customBg rounded-lg p-7 flex flex-col justify-center gap-6 hover:-translate-y-2 transition-transform duration-300 group">
        <div className="flex justify-between items-center">
          <FaRegFolder className="text-4xl text-textOrange" />
          <RxOpenInNewWindow className="text-4xl hover:text-textOrange" />
        </div>
        <div>
          <h2 className="text-xl font-titleFont font-semibold tracking-wide group-hover:text-textOrange">
            {title}
          </h2>
          <p className="text-sm mt-3">{description}</p>
        </div>

        <ul className="text-xs mdl:text-sm text-textDark flex items-center gap-2 flex-wrap justify-between">
          {tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </a>
  )
}

export default ArchiveCard
