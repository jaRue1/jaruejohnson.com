/* eslint-disable react/no-unescaped-entities */
import React from "react"
import { motion } from "framer-motion"

function Contact() {
  return (
    <section
      id="contact"
      className="max-w-containerSmall mx-auto py-10 lgl:py-32 flex flex-col gap-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/30 rounded-2xl p-8 lgl:p-12 backdrop-blur-sm relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-textOrange/15 to-transparent rounded-full blur-xl" />
          <div className="absolute bottom-6 left-6 w-20 h-20 bg-gradient-to-br from-textOrange/10 to-transparent rounded-full blur-lg" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-textOrange/5 to-transparent rounded-full blur-md" />
          
          <div className="relative z-10 flex flex-col gap-6 lgl:gap-8 items-center justify-center text-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="font-titleFont text-lg text-textOrange font-semibold flex items-center tracking-wide"
            >
              04. What's Next
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="font-titleFont text-4xl lgl:text-5xl font-semibold text-textLight"
            >
              Get In Touch
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="max-w-[600px] text-center text-textLight leading-relaxed"
            >
              Although I am not currently looking for any new opportunities, my inbox
              is always open. Whether you have a questions or just want to say hello,
              I will try my best to get back with you.
            </motion.p>

            {/* Email CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="mt-4"
            >
              <motion.a
                href="mailto:jaruejohnson@outlook.com"
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-block"
              >
                <div className="relative px-8 py-4 bg-gradient-to-r from-gray-800/50 to-gray-700/30 border-2 border-textOrange/50 rounded-xl text-textOrange font-semibold tracking-wide overflow-hidden transition-all duration-300 hover:border-textOrange hover:text-white">
                  {/* Button background animation */}
                  <span className="absolute inset-0 bg-gradient-to-r from-textOrange to-orange-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  
                  {/* Button content */}
                  <span className="relative z-10 flex items-center justify-center">
                    jaruejohnson@outlook.com
                    <motion.span
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                    >
                      →
                    </motion.span>
                  </span>
                  
                  {/* Button glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-textOrange/20 to-orange-600/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                </div>
              </motion.a>
            </motion.div>

            {/* Alternative contact methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-6"
            >
              <p className="max-w-[600px] text-center text-textDark mb-4">
                Alternatively, you can reach out to me on:
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="https://twitter.com/Tru_Rue"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    scale: 1.1,
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative"
                >
                  <div className="px-6 py-3 bg-gradient-to-r from-gray-800/50 to-gray-700/30 border border-gray-600/50 hover:border-textOrange/50 rounded-lg text-textDark hover:text-textOrange transition-all duration-300 font-medium">
                    <span className="relative z-10">Twitter</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-textOrange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  </div>
                </motion.a>
                
                <motion.a
                  href="https://www.linkedin.com/in/jarue-johnson-9a08241ab"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    scale: 1.1,
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative"
                >
                  <div className="px-6 py-3 bg-gradient-to-r from-gray-800/50 to-gray-700/30 border border-gray-600/50 hover:border-textOrange/50 rounded-lg text-textDark hover:text-textOrange transition-all duration-300 font-medium">
                    <span className="relative z-10">LinkedIn</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-textOrange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
          
          {/* Floating particles */}
          <div className="absolute top-8 left-8 w-2 h-2 bg-textOrange rounded-full opacity-60 animate-ping" />
          <div className="absolute bottom-12 right-12 w-1 h-1 bg-textOrange/80 rounded-full opacity-40 animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-textOrange/60 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.0 }}
        viewport={{ once: true }}
        className="w-full h-[1px] bg-gradient-to-r from-transparent via-textOrange to-transparent"
      />
    </section>
  )
}

export default Contact
