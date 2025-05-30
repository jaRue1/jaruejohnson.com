import React from "react"
import SectionTitle from "./SectionTitle"
import { motion } from "framer-motion"

interface PhaseProps {
  phaseNumber: string
  title: string
  description: string
  bgColor: string
  delay: number
}

const PhaseCard = ({ phaseNumber, title, description, bgColor, delay }: PhaseProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className={`relative p-8 rounded-3xl bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 shadow-lg hover:shadow-2xl hover:shadow-textOrange/10 transition-all duration-300 group cursor-pointer overflow-hidden`}
    >
      {/* Animated background overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-textOrange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-textOrange/20 via-transparent to-textOrange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      <div className="relative z-10">
        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
          <span className="inline-block px-4 py-2 bg-textOrange text-white text-sm font-semibold rounded-full group-hover:bg-white group-hover:text-textOrange transition-all duration-300">
            {phaseNumber}
          </span>
        </div>
        <h3 className="text-2xl font-titleFont font-semibold text-textLight mb-4 group-hover:text-textOrange transition-colors duration-300 transform group-hover:translate-x-2">
          {title}
        </h3>
        <p className="text-textDark leading-relaxed group-hover:text-textLight transition-colors duration-300">
          {description}
        </p>
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-textOrange/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125" />
      <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-textOrange/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
      
      {/* Floating particles effect */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-textOrange rounded-full opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:animate-ping" />
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-textOrange rounded-full opacity-0 group-hover:opacity-40 transition-all duration-1000 delay-200 group-hover:animate-pulse" />
    </motion.div>
  )
}

function Approach() {
  const phases = [
    {
      phaseNumber: "Phase 1",
      title: "Plan & Strategy",
      description: "Discuss things like your business model, your target audience, and your goals will help me understand what you want to achieve with your product. Then I can plan something like architecture, user experience, and technical implementation.",
      bgColor: "", // No longer needed since all cards have same color
      delay: 0.1
    },
    {
      phaseNumber: "Phase 2", 
      title: "Design & Develop",
      description: "Once agreed on the plan, I cue my lofi playlist and start designing the user experience then deep dive into coding. I keep you in the loop by sharing the progress and asking for feedback.",
      bgColor: "", // No longer needed since all cards have same color
      delay: 0.2
    },
    {
      phaseNumber: "Phase 3",
      title: "Test & Review", 
      description: "I will test the application on different devices and browsers to make sure it is working correctly. I will also review the product with you to make sure it meets your expectations.",
      bgColor: "", // No longer needed since all cards have same color
      delay: 0.3
    },
    {
      phaseNumber: "Phase 4",
      title: "Launch & Support",
      description: "Once everything is ready, I come to the most exciting part, launching the product. By following the best practices, I will make sure your application is secure and performant. Continuous support is also provided to make sure your product is always up to date.",
      bgColor: "", // No longer needed since all cards have same color
      delay: 0.4
    }
  ]

  return (
    <section
      id="approach"
      className="max-w-containerSmall mx-auto py-10 lgl:py-32 flex flex-col gap-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <SectionTitle title="My Approach" titleNum="02." />
        <div className="mt-8 text-center">
          <h3 className="text-3xl lgl:text-4xl font-titleFont font-bold text-textLight mb-4">
            My usual <span className="text-textOrange">approach</span>
          </h3>
          <p className="text-textDark text-lg max-w-2xl mx-auto">
            Focus on the user and all else will follow.
          </p>
        </div>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {phases.map((phase, index) => (
          <PhaseCard
            key={index}
            phaseNumber={phase.phaseNumber}
            title={phase.title}
            description={phase.description}
            bgColor={phase.bgColor}
            delay={phase.delay}
          />
        ))}
      </div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 w-full h-[1px] bg-gradient-to-r from-transparent via-textOrange to-transparent"
      />
    </section>
  )
}

export default Approach 