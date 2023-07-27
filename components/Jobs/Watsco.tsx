import React from "react"
import { motion } from "framer-motion"
import { TiArrowForward } from "react-icons/ti"

function Watsco() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <h3 className="flex gap-1 font-medium text-xl font-titleFont">
        Platform Engineer{" "}
        <span className="text-textGreen tracking-wide">@Watsco Ventures</span>
      </h3>
      <p className="text-sm mt-1 font-medium text-textDark">
        Jun 2021 - Jan 2022{" "}
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textGreen mt-1">
            <TiArrowForward />{" "}
          </span>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
          tempora, ad exercitationem unde ut repudiandae ipsum explicabo aliquam
          pariatur molestias, suscipit consequuntur dignissimos eius velit
          inventore maxime optio sit. Commodi.
        </li>
        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textGreen mt-1">
            <TiArrowForward />{" "}
          </span>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
          tempora, ad exercitationem unde ut repudiandae ipsum explicabo aliquam
          pariatur molestias, suscipit consequuntur dignissimos eius velit
          inventore maxime optio sit. Commodi.
        </li>
        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textGreen mt-1">
            <TiArrowForward />{" "}
          </span>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
          tempora, ad exercitationem unde ut repudiandae ipsum explicabo aliquam
          pariatur molestias, suscipit consequuntur dignissimos eius velit
          inventore maxime optio sit. Commodi.
        </li>
      </ul>
    </motion.div>
  )
}

export default Watsco
