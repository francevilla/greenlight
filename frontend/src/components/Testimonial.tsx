import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Quote } from 'lucide-react'

export function Testimonial() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end center'],
  })

  const testimonialText = `Greenlight ha rivoluzionato come gestiamo le verifiche creditizie. Ora prendiamo decisioni più veloci e sicure. Greenlight ha rivoluzionato come gestiamo le verifiche creditizie.`
  const words = testimonialText.split(' ')

  return (
    <section 
      ref={containerRef}
      id="testimonial"
      className="min-h-screen py-24 md:py-32 px-8 md:px-28"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-10"
        >
          <div className="flex items-center gap-4">
            <Quote className="w-14 h-10 text-muted-foreground/50" />
            <motion.p className="text-4xl md:text-5xl font-medium leading-[1.2] flex flex-wrap">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className="mr-[0.3em]"
                  style={{
                    opacity: useTransform(scrollYProgress, [i / words.length, (i + 1) / words.length], [0.2, 1]),
                    color: useTransform(scrollYProgress, [i / words.length, (i + 1) / words.length], ['hsl(0 0% 35%)', 'hsl(0 0% 100%)']),
                  }}
                >
                  {word}
                </motion.span>
              ))}
              <span className="text-muted-foreground ml-2">"</span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-full border-3 border-foreground bg-muted flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500" />
            </div>
            <div>
              <p className="text-base font-semibold leading-7">Marco Rossi</p>
              <p className="text-sm leading-5 text-muted-foreground">Responsabile Commerciale, Agenzia Marketing Pro</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
