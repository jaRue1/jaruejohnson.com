import React from "react"

function RightSide() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-end gap-6 text-textLight">
      <div className="mb-10">
        <a href="mailto:jaruejohnson@outook.com">
          <p className="text-sm rotate-90 w-72 tracking-wide text-textGreen">
            jaruejohnson@outook.com
          </p>
        </a>
      </div>
      <span className="w-[2px] h-32 bg-textDark"></span>
    </div>
  )
}

export default RightSide
