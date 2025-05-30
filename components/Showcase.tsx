import React, { useState } from "react"
import SectionTitle from "./SectionTitle"
import { motion } from "framer-motion"
import { HiOutlineExternalLink } from "react-icons/hi"
import { FiCode, FiUsers, FiTrendingUp } from "react-icons/fi"

interface ProjectProps {
  title: string
  description: string
  focus: "primary" | "secondary"
  features: string[]
  icon: React.ReactNode
  stakeholder: string
  link?: string
}

const ProjectCard = ({ title, description, focus, features, icon, stakeholder, link }: ProjectProps) => {
  const isPrimary = focus === "primary"
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="relative p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 shadow-lg hover:shadow-2xl hover:shadow-textOrange/10 transition-all duration-300 group overflow-hidden"
    >
      {/* Animated background overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-textOrange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-textOrange/20 via-transparent to-textOrange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-gradient-to-r from-gray-800/60 to-gray-700/40 backdrop-blur-sm border border-gray-600/30 rounded-2xl group-hover:from-textOrange/20 group-hover:to-textOrange/10 group-hover:border-textOrange/40 transition-all duration-300">
              <div className="text-textOrange group-hover:text-textLight transition-colors duration-300 text-3xl">
                {icon}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-3">
                <h3 className="text-3xl lg:text-4xl font-titleFont font-semibold text-textLight group-hover:text-textOrange transition-colors duration-300">
                  {title}
                </h3>
                <span className={`inline-block px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                  isPrimary 
                    ? 'bg-textOrange/20 text-textOrange border border-textOrange/30' 
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {isPrimary ? 'Primary Focus' : 'Secondary Focus'}
                </span>
                <span className="inline-block px-4 py-2 text-sm font-medium bg-gradient-to-r from-gray-800/40 to-gray-700/30 border border-gray-600/30 rounded-full text-textDark">
                  Stakeholder: <span className="text-textOrange font-semibold">{stakeholder}</span>
                </span>
              </div>
            </div>
          </div>
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-gradient-to-r from-gray-800/60 to-gray-700/40 backdrop-blur-sm border border-gray-600/30 rounded-xl hover:from-textOrange/20 hover:to-textOrange/10 hover:border-textOrange/40 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <HiOutlineExternalLink className="text-textOrange hover:text-textLight transition-colors duration-300 text-xl" />
            </a>
          )}
        </div>
        
        <p className="text-textDark leading-relaxed mb-8 text-lg group-hover:text-textLight transition-colors duration-300">
          {description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + (index * 0.1) }}
              className="flex items-center gap-3 text-textDark group-hover:text-textLight transition-colors duration-300"
            >
              <div className="w-2 h-2 bg-textOrange rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
              <span>{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-textOrange/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125" />
      <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-textOrange/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
      
      {/* Floating particles effect */}
      <div className="absolute top-6 right-6 w-2 h-2 bg-textOrange rounded-full opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:animate-ping" />
      <div className="absolute bottom-8 left-8 w-1 h-1 bg-textOrange rounded-full opacity-0 group-hover:opacity-40 transition-all duration-1000 delay-200 group-hover:animate-pulse" />
    </motion.div>
  )
}

function Showcase() {
  const [activeTab, setActiveTab] = useState(0)

  const projects = [
    {
      title: "Nexus",
      description: "A comprehensive client portal project for MajorLinkx designed for service-based businesses, featuring intuitive project timeline management and real-time status board functionality to streamline client communication and project transparency.",
      focus: "primary" as const,
      stakeholder: "MajorLinkx",
      features: [
        "Client portal with authentication and role management",
        "Interactive project timeline and milestone tracking",
        "Real-time status board with project updates",
        "Document sharing and collaboration tools",
        "Automated client notifications and progress reports"
      ],
      icon: <FiUsers />,
    },
    {
      title: "dothething.dev",
      description: "A comprehensive tech platform project for MajorLinkx showcasing our expertise through in-depth tutorials, technology comparisons, and YouTube content designed to establish thought leadership in the development community.",
      focus: "secondary" as const,
      stakeholder: "MajorLinkx",
      features: [
        "Tech blog with best practices and tutorials",
        "Technology comparisons with pros and cons",
        "YouTube content for brand awareness",
        "Practical 'how to do the thing' guides",
        "Community engagement and thought leadership"
      ],
      icon: <FiCode />,
      link: "https://dothething.dev"
    }
  ]

  return (
    <section
      id="showcase"
      className="max-w-containerSmall mx-auto py-10 lgl:py-32 flex flex-col gap-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <SectionTitle title="What I am building" titleNum="03." />
        <div className="mt-8 text-center">
          <h3 className="text-3xl lgl:text-4xl font-titleFont font-bold text-textLight mb-4">
            Current <span className="text-textOrange"> projects</span>
          </h3>
          <p className="text-textDark text-lg max-w-2xl mx-auto">
            Building innovative solutions that bridge technology and business needs.
          </p>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <div className="flex justify-center mb-8">
          <div className="flex bg-gradient-to-r from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-2">
            {projects.map((project, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === index
                    ? 'text-textLight bg-gradient-to-r from-textOrange to-orange-600 shadow-lg'
                    : 'text-textDark hover:text-textLight'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-lg">{project.icon}</span>
                  {project.title}
                </span>
                {activeTab !== index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-textOrange/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative min-h-[400px]">
          <ProjectCard
            key={activeTab}
            title={projects[activeTab].title}
            description={projects[activeTab].description}
            focus={projects[activeTab].focus}
            features={projects[activeTab].features}
            icon={projects[activeTab].icon}
            stakeholder={projects[activeTab].stakeholder}
            link={projects[activeTab].link}
          />
        </div>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 w-full h-[1px] bg-gradient-to-r from-transparent via-textOrange to-transparent"
      />
    </section>
  )
}

export default Showcase 