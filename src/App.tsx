import { useEffect, useRef, useState } from 'react'
import { useTypewriter } from './useTypewriter'

const PILLS = [
  { label: 'View Projects', href: '#projects' },
  { label: 'See Skills', href: '#skills' },
  { label: 'My Education', href: '#education' },
  { label: 'Get In Touch', href: '#contact' },
]

const EMAIL = 'mhshaukat01@gmail.com'
const GITHUB_URL = 'https://github.com/Muhammad-Hasnain-Shaukat'
const LINKEDIN_URL = 'https://www.linkedin.com/in/m-hasnain-shaukat-398b4b2a8/'

const SKILL_GROUPS = [
  { title: 'AI / ML Engineering', items: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV'] },
  { title: 'Full-Stack Development', items: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'MySQL'] },
  { title: 'Mobile Development', items: ['React Native', 'Android Studio', 'Firebase', 'Java'] },
  { title: 'Game Development', items: ['Unity', 'C#', 'Game Design'] },
  { title: 'Languages', items: ['Python', 'Java', 'C#', 'C++', 'JavaScript'] },
  { title: 'Client & Team', items: ['Team Lead', 'Client Comms', 'Problem Solving'] },
]

const PROJECTS = [
  {
    title: 'EmotionNet — Facial Emotion Recognition',
    tech: 'Python · EfficientNet-B2 · CBAM · FastAPI',
    desc: 'Final year project. A facial emotion recognition system built on an EfficientNet-B2 backbone with CBAM attention, trained across merged datasets and deployed as a live API on Hugging Face Spaces.',
    tags: ['Deep Learning', 'Computer Vision', 'Deployment'],
    featured: true,
  },
  {
    title: 'MHS Store',
    tech: 'MERN · JWT · Vercel',
    desc: 'A full-stack e-commerce platform with product browsing, nested categories, JWT authentication, and an admin dashboard — deployed on Vercel with MongoDB Atlas.',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Vehicle Detection & Classification',
    tech: 'OpenCV · SVM · EfficientNetB3',
    desc: 'A classical ML pipeline (HOG, LBP, HSV features with an SVM sliding-window detector, iterated across 9 versions) alongside a parallel EfficientNetB3 deep learning approach, with NMS tuning to clean up detections.',
    tags: ['Classical ML', 'Deep Learning', 'IEEE Report'],
  },
  {
    title: 'Shopping Mobile Application',
    tech: 'Android Studio · Java · Firebase',
    desc: "A solo-built e-commerce Android app spanning men's, women's, and kids' categories, with a full multi-step order flow and real-time push notifications.",
    tags: ['Android', 'Firebase Auth'],
  },
  {
    title: 'Nainz — Horror Game',
    tech: 'Unity · C#',
    desc: 'A survival-horror game where zombies hunt you through a locked-down environment and your only way out is to find the key before they find you.',
    tags: ['Unity', 'C#', 'Game Design'],
    featured: true,
  },
]

const EDUCATION = [
  {
    year: '2022 — 2026',
    title: 'BS Computer Science',
    sub: 'University of Management & Technology (UMT), Lahore · CGPA 3.73/4.0',
    desc: 'Relevant coursework: Artificial Intelligence, Machine Learning, Data Structures & Algorithms, Software Engineering, Database Systems. Final year project: EmotionNet.',
  },
  {
    year: '2020 — 2022',
    title: 'FSc — Pre-Engineering',
    sub: 'Punjab College, Lahore',
    desc: '',
  },
  {
    year: '2018 — 2020',
    title: 'Matriculation — Computer Science',
    sub: 'The Punjab School, Lahore',
    desc: '',
  },
]

const CERTIFICATIONS = [
  { org: 'Anthropic', name: 'Claude Platform 101' },
  { org: 'Anthropic', name: 'Claude Code 101' },
  { org: 'OpenAI Academy', name: 'AI Foundations' },
  { org: 'OpenAI Academy', name: 'Applied AI Foundations' },
  { org: 'OpenAI Academy', name: 'Agents and Workflows' },
]

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" />
      <path d="M1.5 8.5V2.5C1.5 1.94772 1.94772 1.5 2.5 1.5H8.5" stroke="currentColor" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ScrubVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const prevXRef = useRef<number | null>(null)
  const targetTimeRef = useRef(0)
  const lastAppliedRef = useRef(-1)
  const rafRef = useRef<number>(0)
  const SENSITIVITY = 1.1

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleMouseMove = (e: MouseEvent) => {
      const duration = video.duration
      if (!duration || Number.isNaN(duration)) return

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX
        return
      }

      const delta = e.clientX - prevXRef.current
      prevXRef.current = e.clientX

      const timeDelta = (delta / window.innerWidth) * SENSITIVITY * duration
      let target = targetTimeRef.current + timeDelta
      target = Math.max(0, Math.min(duration, target))
      targetTimeRef.current = target
    }

    // Continuous rAF loop: with every frame being a keyframe, seeks are
    // near-instant, so we can just push the target time every frame instead
    // of waiting on the 'seeked' event between moves — much snappier.
    const tick = () => {
      const target = targetTimeRef.current
      if (Math.abs(target - lastAppliedRef.current) > 0.008) {
        video.currentTime = target
        lastAppliedRef.current = target
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <video
        ref={videoRef}
        className="fixed inset-0 z-0 h-full w-full object-cover"
        style={{ objectPosition: 'center 22%' }}
        src="/hero-video.mp4"
        muted
        playsInline
        preload="auto"
      />
      {/* dark scrim: top (keeps nav legible off the head), sides, and bottom */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0) 20%), linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 30%, rgba(0,0,0,0) 55%), linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 40%)',
        }}
      />
    </>
  )
}

function Navbar() {
  return (
    <>
      <nav className="fixed top-0 z-10 flex w-full items-start justify-between px-5 py-4 sm:px-8 sm:py-5">
        <div className="flex flex-row items-start gap-3">
          <div className="flex flex-col leading-tight">
            <span className="text-[19px] tracking-tight text-white sm:text-[24px]" style={{ fontFamily: 'var(--font-heading)' }}>
              M. Hasnain Shaukat
            </span>
            <span className="mt-0.5 text-[11px] tracking-wide text-white/55 sm:text-[12px]">3.73 CGPA</span>
          </div>
          <span className="-mt-0.5 select-none text-[22px] text-white sm:text-[26px]" style={{ letterSpacing: '-0.02em' }}>
            ✳︎
          </span>
        </div>

        <a
          href="#contact"
          className="text-[15px] text-white underline underline-offset-2 transition-opacity hover:opacity-60 sm:text-[17px]"
        >
          Get in touch
        </a>
      </nav>
    </>
  )
}

function Hero() {
  const { displayed, done } = useTypewriter(
    'CS grad building AI systems, full-stack apps, and the occasional horror game.',
  )
  const [pillsVisible, setPillsVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setPillsVisible(true), 400)
    return () => window.clearTimeout(timeoutId)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section className="relative z-[1] flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0">
      <div className="relative z-10 max-w-sm sm:max-w-md">
        <p
          className="mb-5 text-white sm:mb-6"
          style={{ fontSize: 'clamp(18px, 3.6vw, 25px)', lineHeight: 1.35, fontWeight: 400, minHeight: 54 }}
        >
          {displayed}
          {!done && <span className="blink-cursor ml-[2px] inline-block h-[1.1em] w-[2px] align-middle bg-white" />}
        </p>

        <div
          className="flex flex-wrap gap-y-1 transition-all"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
            transitionProperty: 'opacity, transform',
            transitionDuration: '0.4s',
            transitionTimingFunction: 'ease',
          }}
        >
          {PILLS.map((pill) => (
            <a
              key={pill.label}
              href={pill.href}
              className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/15 bg-white px-4 py-[0.3em] text-[13px] text-black transition-colors duration-200 hover:bg-white/80 sm:px-5 sm:text-[14px]"
            >
              {pill.label}
            </a>
          ))}

          <button
            onClick={handleCopy}
            className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-[0.3em] text-[13px] text-white transition-colors duration-200 hover:bg-white hover:text-black sm:gap-3 sm:px-5 sm:text-[14px]"
          >
            <span>
              Reach me: <span className="underline underline-offset-1">{copied ? 'Copied!' : EMAIL}</span>
            </span>
            <CopyIcon />
          </button>
        </div>

        <div
          className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-white/55 transition-all"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transitionProperty: 'opacity',
            transitionDuration: '0.5s',
            transitionDelay: '0.1s',
          }}
        >
          <a href="/resume.pdf" download="Hasnain_Shaukat_Resume.pdf" className="underline underline-offset-2 transition-colors hover:text-white">
            Download Resume ↓
          </a>
          <span className="text-white/25">·</span>
          <a href={GITHUB_URL} target="_blank" rel="noopener" className="underline underline-offset-2 transition-colors hover:text-white">
            GitHub
          </a>
          <span className="text-white/25">·</span>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener" className="underline underline-offset-2 transition-colors hover:text-white">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-14 max-w-2xl sm:mb-16">
      <p className="mb-3 text-[13px] uppercase tracking-[0.14em] text-white/40">{eyebrow}</p>
      <h2 className="text-[32px] leading-[1.1] tracking-tight text-white sm:text-[44px]" style={{ fontFamily: 'var(--font-heading)' }}>
        {title}
      </h2>
      {sub && <p className="mt-4 text-[16px] leading-relaxed text-white/60">{sub}</p>}
    </div>
  )
}

function About() {
  return (
    <section id="about" className="relative z-[2] scroll-mt-20 bg-[#141414] px-5 py-24 sm:px-8 sm:py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="About" title="A generalist by training, a builder by habit." />
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr]">
          <div className="space-y-5 text-[16px] leading-relaxed text-white/65">
            <p>
              I recently completed a <strong className="text-white">BS in Computer Science at the University of
              Management &amp; Technology</strong>, Lahore, with a focus that keeps drifting between AI/ML, full-stack
              development, mobile apps, and game development — mostly because I like finishing things I start, in
              whichever stack the idea needs.
            </p>
            <p>
              My final year project, <strong className="text-white">EmotionNet</strong>, is a facial emotion
              recognition system built on EfficientNet-B2 with CBAM attention, deployed via FastAPI. Outside of
              coursework I've shipped a full MERN e-commerce platform, an Android shopping app, a classical + deep
              learning vehicle detection pipeline, and a Unity survival-horror game — because sometimes the best way
              to learn a system is to make it scary.
            </p>
          </div>
          <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.04] px-6">
            {[
              ['Location', 'Johar Town, Lahore, PK'],
              ['Education', 'BS CS — UMT, 2022–2026'],
              ['CGPA', '3.73 / 4.0'],
              ['Focus', 'AI/ML · Full-Stack · Mobile'],
              ['Also builds', 'Games (Unity / C#)'],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 py-4 text-[14px]">
                <span className="text-white/40">{k}</span>
                <span className="text-right font-medium text-white">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="relative z-[2] scroll-mt-20 bg-[#1a1a1a] px-5 py-24 sm:px-8 sm:py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Skills"
          title="A toolkit that spans the stack."
          sub="From training models to shipping mobile apps to scripting enemy AI — the tools change, the problem-solving doesn't."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-4 text-[15px] font-medium text-white">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12.5px] text-white/60">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="relative z-[2] scroll-mt-20 bg-[#141414] px-5 py-24 sm:px-8 sm:py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Selected Work" title="Five projects, five very different problems." />
        <div className="grid gap-5 sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <div
              key={p.title}
              className={`group rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all duration-200 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.05] ${p.featured ? 'sm:col-span-2' : ''}`}
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-[19px] font-medium text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {p.title}
                </h3>
                <span className="whitespace-nowrap text-[11px] uppercase tracking-wide text-white/40">{p.tech}</span>
              </div>
              <p className="mb-5 text-[14.5px] leading-relaxed text-white/60">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-[11.5px] text-white/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="relative z-[2] scroll-mt-20 bg-[#1a1a1a] px-5 py-24 sm:px-8 sm:py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Education" title="The academic path so far." />
        <div className="ml-1 border-l border-white/15 pl-8">
          {EDUCATION.map((e) => (
            <div key={e.title} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[38px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#1a1a1a]" />
              <p className="mb-2 text-[12.5px] uppercase tracking-wide text-white/40">{e.year}</p>
              <h3 className="text-[19px] font-medium text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                {e.title}
              </h3>
              <p className="mt-1 text-[13.5px] text-white/50">{e.sub}</p>
              {e.desc && <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-white/60">{e.desc}</p>}
            </div>
          ))}
        </div>
        <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-[13.5px] text-white/60">
          <span className="h-2 w-2 shrink-0 rounded-full bg-white/70" />
          Dean's Merit Award ×2 — UMT, for academic excellence at 3.73 CGPA
        </div>
      </div>
    </section>
  )
}

function Certifications() {
  return (
    <section id="certifications" className="relative z-[2] scroll-mt-20 bg-[#141414] px-5 py-24 sm:px-8 sm:py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Certifications" title="Keeping current with the field." />
        <div className="flex flex-wrap gap-3">
          {CERTIFICATIONS.map((c) => (
            <div key={c.name} className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[13.5px] text-white/70">
              <span className="font-medium text-white">{c.org}</span> — {c.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="relative z-[2] scroll-mt-20 bg-black px-5 py-24 text-white sm:px-8 sm:py-32 md:px-10">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-3 text-[13px] uppercase tracking-[0.14em] text-white/40">Get In Touch</p>
        <h2 className="mx-auto max-w-2xl text-[36px] leading-[1.1] tracking-tight sm:text-[52px]" style={{ fontFamily: 'var(--font-heading)' }}>
          Let's build something.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[15.5px] leading-relaxed text-white/60">
          Open to full-stack, AI/ML, and mobile projects — or just a good conversation about zombies and neural nets.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-medium text-black transition-opacity hover:opacity-80"
          >
            Email Me <ArrowIcon />
          </a>
          <a
            href="/resume.pdf"
            download="Hasnain_Shaukat_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-[14px] text-white transition-colors hover:bg-white hover:text-black"
          >
            Download Resume ↓
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[13.5px] text-white/50">
          <a href={GITHUB_URL} target="_blank" rel="noopener" className="underline underline-offset-2 transition-colors hover:text-white">
            github.com/Muhammad-Hasnain-Shaukat
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener" className="underline underline-offset-2 transition-colors hover:text-white">
            linkedin.com/in/m-hasnain-shaukat
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative z-[2] border-t border-white/10 bg-[#141414] px-5 py-8 text-center sm:px-8">
      <p className="text-[12.5px] text-white/40">M. Hasnain Shaukat · Lahore, Pakistan</p>
    </footer>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      <ScrubVideo />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  )
}
