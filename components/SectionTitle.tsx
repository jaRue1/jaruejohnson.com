import React from "react"
interface Props {
  title: string
  titleNum: string
}
function SectionTitle({ title, titleNum }: Props) {
  return (
    <h2 className="font-titleFont text-2xl font-semibold flex items-center">
      <span className="text-base md:text-lg text-textOrange mr-2">
        {titleNum}
      </span>
      {title}
      <span className="hidden md:inline-flex md:w-60 lgl:w-72 h-[.5px] bg-gray-700 ml-6" />
    </h2>
  )
}

export default SectionTitle
