import { motion } from 'framer-motion'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import PageSection from '../components/PageSection'
import SectionHeader from '../components/SectionHeader'
import { TIMELINE } from '../data/content'

export default function Timeline() {
  return (
    <PageSection fullWidth className="overflow-x-hidden">
      <div className="section-container mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeader
          title="Our Story"
          subtitle="Every chapter of us, in order"
        />
      </div>

      <div className="timeline-romance mx-auto w-full max-w-5xl px-2 sm:px-4">
        <VerticalTimeline lineColor="rgba(248, 180, 196, 0.35)">
          {TIMELINE.map((item, i) => (
            <VerticalTimelineElement
              key={item.title}
              date={item.date}
              icon={
                <span className="flex items-center justify-center text-lg leading-none">
                  {item.highlight ? '❤️' : '💌'}
                </span>
              }
              iconStyle={{
                background: item.highlight
                  ? 'linear-gradient(135deg, #e8a0b0, #ff6b9d)'
                  : 'rgba(248, 180, 196, 0.25)',
                boxShadow: '0 0 20px rgba(255, 107, 157, 0.35)',
              }}
              contentStyle={{
                background: 'rgba(18, 18, 26, 0.9)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(248, 180, 196, 0.22)',
                borderRadius: '16px',
                color: '#f5e6eb',
                boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
              }}
              contentArrowStyle={{
                borderRight: '7px solid rgba(18, 18, 26, 0.9)',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="timeline-card-inner"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    className="mb-4 aspect-[16/10] w-full rounded-lg object-cover"
                  />
                )}
                <h3 className="font-display text-xl text-romance-pink">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-white/85">{item.text}</p>
                {item.song && (
                  <p className="mt-3 text-sm italic text-romance-rose/90">🎵 {item.song}</p>
                )}
              </motion.div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </PageSection>
  )
}
