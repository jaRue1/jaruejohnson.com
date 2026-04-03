import Head from "next/head"
import Link from "next/link"
import { motion } from "framer-motion"
import { FiClock, FiExternalLink, FiArrowRight } from "react-icons/fi"
import SectionTitle from "../../components/SectionTitle"
import { articles } from "../../data/articles"

export default function Blog() {
  return (
    <>
      <Head>
        <title>Writing - Jarue Johnson</title>
        <meta
          name="description"
          content="Articles on software engineering, leadership, and building products - by Jarue Johnson."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="font-bodyFont w-full min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-textLight overflow-x-hidden relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-textOrange/5 via-transparent to-textOrange/3 pointer-events-none" />
        <div
          className="absolute top-20 left-20 w-72 h-72 bg-textOrange/10 rounded-full blur-3xl animate-pulse opacity-30"
        />
        <div
          className="absolute top-1/3 right-20 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse opacity-20"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse opacity-15"
          style={{ animationDelay: "4s" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionTitle title="Writing" titleNum="06." />
            <div className="mt-8">
              <h1 className="text-4xl lgl:text-5xl font-titleFont font-bold text-textLight mb-6">
                Thoughts &amp; <span className="text-textOrange">Articles</span>
              </h1>
              <p className="text-textDark text-lg max-w-3xl mx-auto leading-relaxed">
                Writing about software engineering, technical leadership, and
                the lessons learned building products at scale.
              </p>
            </div>
          </motion.div>

          {/* Article Cards */}
          <div className="grid gap-8 md:gap-10">
            {articles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.01, y: -3 }}
                  transition={{ duration: 0.3 }}
                  className="relative p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-gray-900/60 to-gray-800/30 border border-gray-700/40 shadow-xl hover:shadow-2xl hover:shadow-textOrange/10 transition-all duration-300 group overflow-hidden backdrop-blur-sm"
                >
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-textOrange/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-textOrange/30 via-transparent to-textOrange/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                  <div className="relative z-10">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
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

                    {/* Title */}
                    <h2 className="text-2xl lg:text-3xl font-titleFont font-bold text-textLight group-hover:text-textOrange transition-colors duration-300 mb-4">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-textDark leading-relaxed mb-6 text-lg group-hover:text-textLight transition-colors duration-300">
                      {article.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-800/60 to-gray-700/40 border border-gray-600/30 rounded-full text-textDark"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href={`/blog/${article.slug}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="group/btn relative px-6 py-3 bg-gradient-to-r from-textOrange to-orange-600 text-textLight font-semibold rounded-xl hover:from-textOrange/80 hover:to-orange-600/80 transition-all duration-300 overflow-hidden flex items-center gap-2"
                        >
                          <span className="relative z-10">Read Article</span>
                          <FiArrowRight className="text-lg group-hover/btn:translate-x-1 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                        </motion.button>
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
                          <div className="absolute inset-0 bg-gradient-to-r from-textOrange/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-textOrange/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125" />
                  <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-textOrange/15 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
                  <div className="absolute top-4 right-4 w-2 h-2 bg-textOrange rounded-full opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:animate-ping" />
                </motion.div>
              </motion.div>
            ))}
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
                  &larr; Back to Home
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
