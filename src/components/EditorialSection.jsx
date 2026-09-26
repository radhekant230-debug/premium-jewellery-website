import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { prefersReducedMotion } from '../lib/motionPref'

export default function EditorialSection({
  image,
  alt,
  eyebrow,
  title,
  text,
  ctaLabel,
  ctaTo,
  align = 'left',
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section className={`editorial editorial-${align}`} ref={ref}>
      <div className="editorial-media">
        <motion.img src={image} alt={alt} style={prefersReducedMotion ? undefined : { y: imageY }} loading="lazy" />
      </div>
      <div className="editorial-body">
        <Reveal>
          {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
          <h2 className="section-title">{title}</h2>
          <p className="editorial-text">{text}</p>
          {ctaLabel && (
            <Link to={ctaTo} className="btn btn-outline btn-margin-top">
              {ctaLabel}
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  )
}
