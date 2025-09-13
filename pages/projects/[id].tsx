import Head from "next/head"
import Link from "next/link"
import { GetStaticPaths, GetStaticProps } from "next"
import { motion } from "framer-motion"
import { FiUsers, FiCode, FiCloud, FiMonitor, FiExternalLink, FiArrowLeft, FiCalendar, FiUser } from "react-icons/fi"

interface ProjectDetail {
  id: string
  title: string
  description: string
  longDescription: string
  status: string
  stakeholder: string
  websiteUrl?: string | null
  websiteLabel?: string | null
  iconName: string
  color: string
  features: string[]
  techStack?: string[]
  overview: string[]
  keyHighlights: string[]
}

const projectsData: { [key: string]: ProjectDetail } = {
  "nexus-nexusos": {
    id: "nexus-nexusos",
    title: "Nexus + Nexus OS",
    description: "A comprehensive full-stack platform built for Majorlinkx",
    longDescription: "Nexus + Nexus OS represents a groundbreaking approach to business management, combining a sophisticated client portal with an integrated operating system layer. Built specifically for Majorlinkx, this enterprise-level solution transforms how service-based businesses manage projects, communicate with clients, and streamline operations.",
    status: "In Development",
    stakeholder: "Majorlinkx",
    websiteUrl: "https://majorlinkx.com",
    websiteLabel: "Visit Majorlinkx",
    iconName: "FiUsers",
    color: "from-blue-800/60 to-blue-700/40",
    features: [
      "Full-stack client portal with multi-role authentication system",
      "Nexus OS: Integrated business operating system layer", 
      "Advanced project timeline and milestone management",
      "Real-time status dashboard with live updates",
      "Document management and collaboration suite",
      "Automated workflow and notification systems",
      "Custom business process automation",
      "Analytics and reporting dashboard"
    ],
    techStack: ["Nuxt.js", "Nest.js", "PostgreSQL", "AWS", "Tailwind CSS"],
    overview: [
      "Nexus serves as the primary client-facing portal, providing businesses with a comprehensive view of their projects, timelines, and deliverables.",
      "Nexus OS acts as the underlying operating system that powers business operations, automating workflows and providing real-time insights.",
      "The platform integrates seamlessly with existing business tools and provides a unified interface for all stakeholder interactions."
    ],
    keyHighlights: [
      "Enterprise-grade security and authentication",
      "Scalable architecture supporting multiple business sizes",
      "Real-time collaboration and communication tools",
      "Advanced analytics and business intelligence",
      "Custom workflow automation engine"
    ]
  },
  "cmd-cloud": {
    id: "cmd-cloud", 
    title: "cmd cloud",
    description: "Own your infrastructure. Cut out PaaS vendor middlemen. Deploy in seconds.",
    longDescription: "cmd cloud empowers developers to own their infrastructure completely while getting the speed and feedback loop of PaaS vendors like Railway, Supabase, and Heroku - without ever using them. Get infrastructure provisioned in seconds, not weeks, with full ownership and zero vendor lock-in. Experience proven 40-60% cost reductions while maintaining complete control over your stack.",
    status: "Live",
    stakeholder: "Personal Project",
    websiteUrl: "https://cmdcloud.dev",
    websiteLabel: "Visit cmd cloud",
    iconName: "FiCloud",
    color: "from-green-800/60 to-green-700/40",
    features: [
      "Deploy infrastructure in minutes, not weeks",
      "40-60% immediate cost reductions vs PaaS vendors",
      "Zero vendor lock-in - full infrastructure ownership",
      "Conversational infrastructure definition",
      "Real-time infrastructure visualization",
      "One-command deployment to AWS",
      "Local-first development with Docker",
      "Terraform-powered deployment with no black boxes"
    ],
    techStack: ["Nuxt.js", "Nest.js", "Docker", "Terraform", "Vercel AI SDK", "Tailwind CSS"],
    overview: [
      "cmd cloud solves the infrastructure dilemma: PaaS vendors like Railway and Supabase are fast but expensive with vendor lock-in, while raw cloud providers like AWS are flexible but complex. cmd cloud gives you the best of both worlds.",
      "Real case studies show companies like AdStage saving over $10,000/month by migrating from Heroku, and Onix achieving 50% cost reduction (from $800 to $400/month) by cutting out PaaS middlemen.",
      "The platform hits the sweet spot when PaaS costs exceed 'one engineer's salary worth' - typically around $500-1000/month - enabling companies to gain more control while dramatically reducing expenses."
    ],
    keyHighlights: [
      "Proven 40-60% cost reductions vs PaaS vendors",
      "Deploy infrastructure in seconds with full ownership",
      "Zero vendor markup or hidden costs",
      "Learn real infrastructure, not just button pushing",
      "Never hit surprise invoices or forced Enterprise tiers"
    ]
  },
  "fresh-site": {
    id: "fresh-site",
    title: "Fresh Site", 
    description: "Revolutionary website builder for Instagram creators",
    longDescription: "Fresh Site is democratizing web presence for content creators by providing the fastest and simplest way to turn your Instagram into a professional website. Co-founded with Danny Hogan, this platform eliminates the complexity of traditional website builders while maintaining professional quality and functionality.",
    status: "Co-founding",
    stakeholder: "Co-founder with Danny Hogan",
    websiteUrl: "https://freshsite.io",
    websiteLabel: "Visit Fresh Site",
    iconName: "FiMonitor",
    color: "from-purple-800/60 to-purple-700/40",
    features: [
      "One-click Instagram integration",
      "Pre-designed templates for creators",
      "Automated content synchronization",
      "Mobile-first responsive design",
      "Built-in analytics and performance tracking",
      "Simple pricing with no hidden fees",
      "Custom domain support",
      "SEO optimization tools"
    ],
    techStack: ["React", "Next.js", "Nuxt.js", "Nest.js", "Supabase", "Appify", "Stripe", "Instagram API", "Vercel", "PostgreSQL", "TypeScript", "Tailwind CSS", "Docker", "AWS"],
    overview: [
      "Fresh Site addresses the gap between social media presence and professional web presence for content creators.",
      "The platform focuses on speed and simplicity, allowing creators to launch a professional website in minutes, not hours.",
      "Built specifically for Instagram creators who need a web presence but don't want to deal with complex website builders."
    ],
    keyHighlights: [
      "Launch a website in under 5 minutes",
      "Automatic Instagram content sync",
      "Creator-focused design templates",
      "No technical knowledge required",
      "Affordable pricing for creators"
    ]
  },
  "dothething-dev": {
    id: "dothething-dev",
    title: "dothething.dev",
    description: "Developer content and building in public platform",
    longDescription: "dothething.dev represents my commitment to building in public and sharing practical development knowledge. This platform serves as a comprehensive resource for developers who want to learn through real-world examples, practical tutorials, and honest insights into the journey of scaling a development business.",
    status: "Content Focus",
    stakeholder: "Personal Brand",
    websiteUrl: null,
    websiteLabel: null,
    iconName: "FiCode",
    color: "from-orange-800/60 to-orange-700/40",
    features: [
      "In-depth technical tutorials and guides",
      "Technology comparisons with pros and cons",
      "Building in public documentation",
      "YouTube content for visual learners",
      "Community engagement and discussions",
      "Practical 'how to do the thing' approaches",
      "Real-world project case studies",
      "Developer career guidance"
    ],
    techStack: ["Astro", "YouTube API", "Vercel AI SDK", "Tailwind CSS"],
    overview: [
      "dothething.dev focuses on practical, actionable content that helps developers solve real problems.",
      "The platform emphasizes learning through building, with detailed walkthroughs of actual projects and challenges.",
      "Content covers both technical skills and business aspects of being a developer entrepreneur."
    ],
    keyHighlights: [
      "Real-world project documentation",
      "Honest insights into developer entrepreneurship",
      "Community-driven learning approach",
      "Multi-format content (written, video, interactive)",
      "Focus on practical implementation over theory"
    ]
  }
}

// Icon mapping function
const getIcon = (iconName: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    FiUsers: <FiUsers />,
    FiCloud: <FiCloud />,
    FiMonitor: <FiMonitor />,
    FiCode: <FiCode />
  }
  return icons[iconName] || <FiCode />
}

interface ProjectPageProps {
  project: ProjectDetail
}

export default function ProjectPage({ project }: ProjectPageProps) {
  return (
    <>
      <Head>
        <title>{project.title} - Jarue Johnson</title>
        <meta name="description" content={project.description} />
        <link rel="icon" href="/favicon.png" />
      </Head>
      
      <main className="font-bodyFont w-full min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-textLight overflow-x-hidden relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-textOrange/5 via-transparent to-textOrange/3 pointer-events-none" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-textOrange/10 rounded-full blur-3xl animate-pulse opacity-30" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse opacity-20" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-24">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-xl hover:from-textOrange/20 hover:to-textOrange/10 hover:border-textOrange/40 transition-all duration-300"
              >
                <FiArrowLeft className="text-textOrange group-hover:text-textLight transition-colors duration-300" />
                <span className="text-textLight group-hover:text-textOrange transition-colors duration-300 font-medium">
                  Back to Projects
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-start gap-6 mb-8">
              <div className={`p-6 rounded-3xl bg-gradient-to-r ${project.color} backdrop-blur-sm border border-gray-600/30`}>
                <div className="text-textOrange text-4xl">
                  {getIcon(project.iconName)}
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl lg:text-5xl font-titleFont font-bold text-textLight mb-4">
                  {project.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-textOrange/20 text-textOrange border border-textOrange/30">
                    <FiCalendar className="w-4 h-4" />
                    2025 - Present
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-gray-800/60 to-gray-700/40 border border-gray-600/30 rounded-full text-textDark">
                    <FiUser className="w-4 h-4" />
                    {project.stakeholder}
                  </span>
                  <span className="inline-block px-4 py-2 text-sm font-medium bg-gradient-to-r from-gray-800/40 to-gray-700/30 border border-gray-600/30 rounded-full text-green-400">
                    {project.status}
                  </span>
                </div>
                <p className="text-textDark text-lg leading-relaxed">
                  {project.longDescription}
                </p>
              </div>
            </div>

            {/* Website Button */}
            {project.websiteUrl ? (
              <motion.a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-textOrange to-orange-600 text-textLight font-semibold rounded-xl hover:from-textOrange/80 hover:to-orange-600/80 transition-all duration-300"
              >
                <span>{project.websiteLabel || 'Visit Website'}</span>
                <FiExternalLink className="text-lg" />
              </motion.a>
            ) : (
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-800/40 to-gray-700/20 backdrop-blur-sm border border-gray-600/20 rounded-xl text-textDark italic">
                <span>Website Coming Soon</span>
              </div>
            )}
          </motion.div>

          {/* Content Sections */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-titleFont font-bold text-textLight">Overview</h2>
              <div className="space-y-4">
                {project.overview.map((paragraph, index) => (
                  <p key={index} className="text-textDark leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Key Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-titleFont font-bold text-textLight">Key Highlights</h2>
              <div className="space-y-3">
                {project.keyHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-textOrange rounded-full mt-2 flex-shrink-0" />
                    <span className="text-textDark">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 space-y-6"
          >
            <h2 className="text-2xl font-titleFont font-bold text-textLight">Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-900/40 to-gray-800/20 border border-gray-700/30"
                >
                  <div className="w-2 h-2 bg-textOrange rounded-full mt-2 flex-shrink-0" />
                  <span className="text-textDark">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          {project.techStack && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 space-y-6"
            >
              <h2 className="text-2xl font-titleFont font-bold text-textLight">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                    className="px-4 py-2 bg-gradient-to-r from-gray-800/60 to-gray-700/40 border border-gray-600/30 rounded-full text-textLight text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="p-8 rounded-3xl bg-gradient-to-br from-gray-900/60 to-gray-800/30 border border-gray-700/40">
              <h3 className="text-xl font-titleFont font-bold text-textLight mb-4">
                Interested in learning more?
              </h3>
              <p className="text-textDark mb-6">
                Get in touch to discuss this project or explore potential collaborations.
              </p>
              <Link href="/#contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-textOrange to-orange-600 text-textLight font-semibold rounded-xl hover:from-textOrange/80 hover:to-orange-600/80 transition-all duration-300"
                >
                  Get In Touch
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(projectsData).map((id) => ({
    params: { id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = projectsData[params?.id as string]
  
  if (!project) {
    return { notFound: true }
  }

  return {
    props: { project },
  }
}