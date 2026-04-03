import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { FiClock, FiArrowLeft, FiExternalLink } from "react-icons/fi"
import { articles, Article } from "../../data/articles"

const NetworkTopologyDiagram = dynamic(
  () => import("../../components/diagrams/NetworkTopologyDiagram"),
  { ssr: false, loading: () => <div className="my-8 h-[620px] rounded-2xl border border-gray-700/40 bg-gray-900/40 animate-pulse" /> }
)
const BlockInterVlanDiagram = dynamic(
  () => import("../../components/diagrams/BlockInterVlanDiagram"),
  { ssr: false, loading: () => <div className="my-8 h-[380px] rounded-2xl border border-red-900/50 bg-gray-900/40 animate-pulse" /> }
)
const AllowDefaultDiagram = dynamic(
  () => import("../../components/diagrams/AllowDefaultDiagram"),
  { ssr: false, loading: () => <div className="my-8 h-[300px] rounded-2xl border border-green-900/50 bg-gray-900/40 animate-pulse" /> }
)

const diagramMap: Record<string, React.ComponentType> = {
  "network-topology": NetworkTopologyDiagram,
  "block-inter-vlan": BlockInterVlanDiagram,
  "allow-default-to-all": AllowDefaultDiagram,
}

interface ArticlePageProps {
  article: Article
}

function renderContent(content: string) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Diagram markers
    const diagramMatch = line.match(/^\[DIAGRAM:(.+)\]$/)
    if (diagramMatch) {
      const DiagramComponent = diagramMap[diagramMatch[1]]
      if (DiagramComponent) {
        elements.push(<DiagramComponent key={`diagram-${i}`} />)
      }
      i++
      continue
    }

    // Code blocks
    if (line.startsWith("```")) {
      const codeLines: string[] = []
      i++ // skip opening ```
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing ```
      elements.push(
        <pre
          key={`code-${i}`}
          className="my-6 p-4 bg-gray-900/80 border border-gray-700/50 rounded-xl overflow-x-auto"
        >
          <code className="text-sm text-textLight font-mono leading-relaxed">
            {codeLines.join("\n")}
          </code>
        </pre>
      )
      continue
    }

    // Headings
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="text-2xl font-titleFont font-bold text-textLight mt-10 mb-4"
        >
          {line.replace("## ", "")}
        </h2>
      )
      i++
      continue
    }

    // Unordered list items
    if (line.startsWith("- ")) {
      const listItems: React.ReactNode[] = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        const itemText = lines[i].replace(/^- /, "")
        // Handle bold text within list items
        const parts = itemText.split(/(\*\*[^*]+\*\*)/)
        const rendered = parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={j} className="text-textOrange font-semibold">
                {part.slice(2, -2)}
              </strong>
            )
          }
          return part
        })
        listItems.push(
          <li key={i} className="text-textLight leading-relaxed">
            {rendered}
          </li>
        )
        i++
      }
      elements.push(
        <ul
          key={`ul-${i}`}
          className="list-disc list-inside space-y-2 my-4 ml-4 text-textLight"
        >
          {listItems}
        </ul>
      )
      continue
    }

    // Empty lines
    if (line.trim() === "") {
      i++
      continue
    }

    // Regular paragraphs - handle inline bold
    const parts = line.split(/(\*\*[^*]+\*\*)/)
    const rendered = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={j} className="text-textOrange font-semibold">
            {part.slice(2, -2)}
          </strong>
        )
      }
      return part
    })

    elements.push(
      <p key={i} className="text-textLight leading-relaxed mb-4">
        {rendered}
      </p>
    )
    i++
  }

  return elements
}

export default function ArticlePage({ article }: ArticlePageProps) {
  return (
    <>
      <Head>
        <title>{article.title} - Jarue Johnson</title>
        <meta name="description" content={article.excerpt} />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="font-bodyFont w-full min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-textLight overflow-x-hidden relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-textOrange/5 via-transparent to-textOrange/3 pointer-events-none" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-textOrange/10 rounded-full blur-3xl animate-pulse opacity-30" />
        <div
          className="absolute top-1/3 right-20 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse opacity-20"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4 py-24">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-textDark hover:text-textOrange transition-colors duration-300"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Writing</span>
            </Link>
          </motion.div>

          {/* Article header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-sm text-textDark">
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="text-textDark/40">|</span>
              <span className="flex items-center gap-1 text-sm text-textDark">
                <FiClock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-titleFont font-bold text-textLight mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-800/60 to-gray-700/40 border border-gray-600/30 rounded-full text-textDark"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-textOrange/40 to-transparent" />
          </motion.header>

          {/* Article body */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose-custom"
          >
            {renderContent(article.content)}
          </motion.article>

          {/* Footer actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-gray-700/40"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-textDark hover:text-textOrange transition-colors duration-300"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span>All Articles</span>
              </Link>

              {article.mediumUrl && (
                <motion.a
                  href={article.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group/btn relative px-6 py-3 bg-gradient-to-r from-gray-800/60 to-gray-700/40 backdrop-blur-sm border border-gray-600/30 rounded-xl hover:from-textOrange/20 hover:to-textOrange/10 hover:border-textOrange/40 transition-all duration-300 overflow-hidden flex items-center gap-2"
                >
                  <span className="relative z-10 text-textLight group-hover/btn:text-textOrange transition-colors duration-300">
                    Read on Medium
                  </span>
                  <FiExternalLink className="text-lg text-textOrange group-hover/btn:text-textLight transition-colors duration-300" />
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = articles.map((article) => ({
    params: { slug: article.slug },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({
  params,
}) => {
  const found = articles.find((a) => a.slug === params?.slug)
  if (!found) {
    return { notFound: true }
  }
  // JSON round-trip strips undefined values which Next.js cannot serialize
  const article = JSON.parse(JSON.stringify(found))
  return { props: { article } }
}
