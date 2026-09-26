import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { prefersReducedMotion } from '../lib/motionPref'

const ease = [0.22, 1, 0.36, 1]
const noAnim = prefersReducedMotion

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero-media" style={noAnim ? undefined : { y: imageY }}>
        <motion.img
          src="/images/hero.png"
          alt="A diamond and champagne-gold necklace on a limestone pedestal"
          initial={noAnim ? false : { scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease }}
        />
      </motion.div>

      <motion.div
        className="hero-content"
        style={noAnim ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="hero-eyebrow"
          initial={noAnim ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease }}
        >
          Zeyura by Anshika — Paris
        </motion.p>
        <motion.h1
          className="hero-title"
          initial={noAnim ? false : { opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.55, ease }}
        >
          The Art of
          <br />
          Timeless Beauty
        </motion.h1>
        <motion.p
          className="hero-text"
          initial={noAnim ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease }}
        >
          Exceptional jewellery designed to become part of your story.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={noAnim ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease }}
        >
          <Link to="/collections" className="btn btn-dark">
            Explore Collection
          </Link>
          <Link to="/about" className="btn btn-ghost-dark">
            Discover More
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span />
      </motion.div>
    </section>
  )
}
