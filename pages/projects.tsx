import Head from "next/head"
import Link from "next/link"
import { motion } from "framer-motion"
import { FiUsers, FiCode, FiCloud, FiMonitor, FiExternalLink, FiArrowRight } from "react-icons/fi"
import SectionTitle from "../components/SectionTitle"

interface Project {
  id: string
  title: string
  shortDescription: string
  status: "primary" | "development" | "co-founding" | "content"
  stakeholder: string
  websiteUrl?: string
  websiteLabel?: string
  icon: React.ReactNode
  color: string
  priority: number
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="relative md:ml-12 md:pl-12 lg:ml-16 lg:pl-16"
    >
      {/* Timeline dot - positioned to sit directly on the timeline line */}
      <div className="absolute -left-10 lg:-left-12 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 border-textOrange bg-textOrange shadow-lg shadow-textOrange/30 hidden md:block z-20" />
      
      {/* Project Card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
        className="relative p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-gray-900/60 to-gray-800/30 border border-gray-700/40 shadow-xl hover:shadow-2xl hover:shadow-textOrange/10 transition-all duration-300 group overflow-hidden backdrop-blur-sm"
      >
        {/* Animated background overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-textOrange/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-textOrange/30 via-transparent to-textOrange/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl bg-gradient-to-r ${project.color} backdrop-blur-sm border border-gray-600/30 group-hover:border-textOrange/40 transition-all duration-300 group-hover:scale-110`}>
                <div className="text-textOrange group-hover:text-textLight transition-colors duration-300 text-2xl">
                  {project.icon}
                </div>
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-titleFont font-bold text-textLight group-hover:text-textOrange transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
                    project.status === 'primary' 
                      ? 'bg-textOrange/20 text-textOrange border border-textOrange/30' 
                      : project.status === 'co-founding'
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : project.status === 'content'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}>
                    2025 - Present
                  </span>
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-800/60 to-gray-700/40 border border-gray-600/30 rounded-full text-textDark">
                    {project.stakeholder}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-textDark leading-relaxed mb-8 text-lg group-hover:text-textLight transition-colors duration-300">
            {project.shortDescription}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Learn More Button - Links to detailed project page */}
            <Link href={`/projects/${project.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group/btn relative px-6 py-3 bg-gradient-to-r from-textOrange to-orange-600 text-textLight font-semibold rounded-xl hover:from-textOrange/80 hover:to-orange-600/80 transition-all duration-300 overflow-hidden flex items-center gap-2"
              >
                <span className="relative z-10">Learn More</span>
                <FiArrowRight className="text-lg group-hover/btn:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </Link>
            
            {/* Website Button */}
            {project.websiteUrl ? (
              <motion.a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group/btn relative px-6 py-3 bg-gradient-to-r from-gray-800/60 to-gray-700/40 backdrop-blur-sm border border-gray-600/30 rounded-xl hover:from-textOrange/20 hover:to-textOrange/10 hover:border-textOrange/40 transition-all duration-300 overflow-hidden flex items-center gap-2"
              >
                <span className="relative z-10 text-textLight group-hover/btn:text-textOrange transition-colors duration-300">
                  {project.websiteLabel || 'Visit Website'}
                </span>
                <FiExternalLink className="text-lg text-textOrange group-hover/btn:text-textLight transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-textOrange/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </motion.a>
            ) : (
              <div className="px-6 py-3 bg-gradient-to-r from-gray-800/40 to-gray-700/20 backdrop-blur-sm border border-gray-600/20 rounded-xl text-textDark italic flex items-center gap-2">
                <span>Website Coming Soon</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-textOrange/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125" />
        <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-textOrange/15 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
        
        {/* Floating particles */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-textOrange rounded-full opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:animate-ping" />
        <div className="absolute bottom-6 left-6 w-1 h-1 bg-textOrange rounded-full opacity-0 group-hover:opacity-40 transition-all duration-1000 delay-200 group-hover:animate-pulse" />
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: "nexus-nexusos",
      title: "Nexus + Nexus OS",
      shortDescription: "A comprehensive full-stack platform built for Majorlinkx, featuring both a robust client portal for service-based businesses and an integrated operating system layer. This enterprise-level solution streamlines business operations with advanced project management and seamless client communication workflows.",
      status: "primary",
      stakeholder: "Majorlinkx",
      websiteUrl: "https://majorlinkx.com",
      websiteLabel: "Visit Majorlinkx",
      icon: <FiUsers />,
      color: "from-blue-800/60 to-blue-700/40",
      priority: 1
    },
    {
      id: "cmd-cloud",
      title: "cmd cloud",
      shortDescription: "A powerful cloud-based development tool that bridges the gap between local development and cloud infrastructure. Provides developers with seamless command-line access to cloud resources, streamlined deployment workflows, and integrated development environments accessible from anywhere.",
      status: "development",
      stakeholder: "Personal Project",
      websiteUrl: "https://cmdcloud.dev",
      websiteLabel: "Visit cmd cloud",
      icon: <FiCloud />,
      color: "from-green-800/60 to-green-700/40",
      priority: 2
    },
    {
      id: "fresh-site",
      title: "Fresh Site",
      shortDescription: "Co-founding a revolutionary website builder specifically designed for Instagram content creators. Fresh Site democratizes web presence by providing speed and simplicity - if you have an Instagram, you should have a website. We focus on quick setup without overwhelming configuration options.",
      status: "co-founding",
      stakeholder: "Co-founder with Danny Hogan",
      websiteUrl: "https://freshsite.io",
      websiteLabel: "Visit Fresh Site",
      icon: <FiMonitor />,
      color: "from-purple-800/60 to-purple-700/40",
      priority: 3
    },
    {
      id: "dothething-dev",
      title: "dothething.dev",
      shortDescription: "A comprehensive tech platform focused on practical development content, tutorials, and building in public. This project represents my shift toward content creation, sharing the journey of building and iterating as a developer scaling his business with in-depth tutorials and technology comparisons.",
      status: "content",
      stakeholder: "Personal Brand",
      websiteUrl: null,
      websiteLabel: null,
      icon: <FiCode />,
      color: "from-orange-800/60 to-orange-700/40",
      priority: 4
    }
  ]

  return (
    <>
      <Head>
        <title>Projects - Jarue Johnson</title>
        <meta name="description" content="Jarue Johnson's project timeline and portfolio" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      
      <main className="font-bodyFont w-full min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-textLight overflow-x-hidden relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-textOrange/5 via-transparent to-textOrange/3 pointer-events-none" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-textOrange/10 rounded-full blur-3xl animate-pulse opacity-30" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse opacity-20" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse opacity-15" style={{ animationDelay: '4s' }} />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionTitle title="Project Timeline" titleNum="01." />
            <div className="mt-8">
              <h1 className="text-4xl lgl:text-5xl font-titleFont font-bold text-textLight mb-6">
                My <span className="text-textOrange">Projects</span>
              </h1>
              <p className="text-textDark text-lg max-w-3xl mx-auto leading-relaxed">
                A timeline of projects I've built, co-founded, and continue to develop. Each represents a unique challenge 
                and learning experience in my journey as a developer and entrepreneur.
              </p>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line - hidden on mobile, positioned to intersect with dots */}
            <div className="absolute left-4 lg:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-textOrange/60 via-textOrange/30 to-transparent hidden md:block" />
            
            <div className="space-y-16 lg:space-y-20">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>

          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mt-20"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-2xl hover:from-textOrange/20 hover:to-textOrange/10 hover:border-textOrange/40 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-textOrange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-textLight group-hover:text-textOrange transition-colors duration-300 font-semibold">
                  ← Back to Home
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-textOrange/20 via-transparent to-textOrange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  )
}