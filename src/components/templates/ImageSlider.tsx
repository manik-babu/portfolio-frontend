'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface SlideImage {
  src: string
  alt: string
}

export interface ImageSliderProps {
  images: SlideImage[]
}

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const AUTO_SLIDE_INTERVAL = 4000
const SWIPE_THRESHOLD = 50 // px
const DRAG_VELOCITY_THRESHOLD = 500 // px/s

/* ─────────────────────────────────────────────
   Slide animation variants
───────────────────────────────────────────── */
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
}

const transition = {
  x: { type: 'spring' as const, stiffness: 300, damping: 32, mass: 0.8 },
  opacity: { duration: 0.2 },
}

/* ─────────────────────────────────────────────
   Arrow SVG icons (no extra deps)
───────────────────────────────────────────── */
function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function ImageSlider({ images }: ImageSliderProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const count = images.length

  /* ── Navigation helpers ── */
  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir)
      setCurrent((prev) => (prev + dir + count) % count)
    },
    [count],
  )

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    },
    [current],
  )

  /* ── Auto-slide ── */
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!isPaused) {
      timerRef.current = setTimeout(() => paginate(1), AUTO_SLIDE_INTERVAL)
    }
  }, [isPaused, paginate])

  // Start / restart timer whenever current changes or pause state changes
  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [resetTimer, current])

  /* ── Keyboard navigation ── */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        !sliderRef.current?.contains(document.activeElement) &&
        document.activeElement !== sliderRef.current
      )
        return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        paginate(-1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        paginate(1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [paginate])

  /* ── Drag / swipe (Framer Motion drag) ── */
  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      const { offset, velocity } = info
      setIsDragging(false)

      const swipedFarEnough = Math.abs(offset.x) > SWIPE_THRESHOLD
      const swipedFast = Math.abs(velocity.x) > DRAG_VELOCITY_THRESHOLD

      if (swipedFarEnough || swipedFast) {
        paginate(offset.x < 0 ? 1 : -1)
      }
    },
    [paginate],
  )

  if (count === 0) return null

  return (
    <div
      ref={sliderRef}
      role="region"
      aria-label="Image slider"
      aria-roledescription="carousel"
      className="relative w-full overflow-hidden rounded-2xl bg-neutral-900 focus-within:ring-2 focus-within:ring-white/40 focus-within:ring-offset-2 focus-within:ring-offset-transparent"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      tabIndex={0}
    >
      {/* ── Slides ── */}
      <div
        className="relative w-full aspect-video select-none"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            style={{ willChange: 'transform' }}
            aria-roledescription="slide"
            aria-label={`Slide ${current + 1} of ${count}: ${images[current].alt}`}
          >
            <Image
              src={images[current].src}
              alt={images[current].alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 70vw"
              className="object-cover pointer-events-none"
              priority={current === 0}
              loading={current === 0 ? 'eager' : 'lazy'}
              draggable={false}
              quality={85}
            />

            {/* Subtle gradient overlay for depth */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Prev Arrow ── */}
        {/* <NavButton
          direction="prev"
          onClick={() => paginate(-1)}
          label="Go to previous slide"
          disabled={isDragging}
        /> */}

        {/* ── Next Arrow ── */}
        {/* <NavButton
          direction="next"
          onClick={() => paginate(1)}
          label="Go to next slide"
          disabled={isDragging}
        /> */}
      </div>

      {/* ── Dot Indicators ── */}
      {count > 1 && (
        <div
          role="tablist"
          aria-label="Slide navigation"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10"
        >
          {images.map((img, i) => (
            <DotButton
              key={`dot-${i}`}
              index={i}
              isActive={i === current}
              onClick={() => goTo(i)}
              totalSlides={count}
              alt={img.alt}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   NavButton sub-component
───────────────────────────────────────────── */
interface NavButtonProps {
  direction: 'prev' | 'next'
  onClick: () => void
  label: string
  disabled?: boolean
}

function NavButton({ direction, onClick, label, disabled }: NavButtonProps) {
  const isPrev = direction === 'prev'

  return (
    <motion.button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.25)' }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={[
        'absolute top-1/2 -translate-y-1/2 z-10',
        isPrev ? 'left-3' : 'right-3',
        'flex items-center justify-center',
        'w-10 h-10 rounded-full',
        'bg-white/15 backdrop-blur-sm',
        'border border-white/20',
        'text-white shadow-lg',
        'transition-colors duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-1',
        'disabled:opacity-30 disabled:cursor-not-allowed',
      ].join(' ')}
    >
      {isPrev ? (
        <ChevronLeft className="w-5 h-5" />
      ) : (
        <ChevronRight className="w-5 h-5" />
      )}
    </motion.button>
  )
}

/* ─────────────────────────────────────────────
   DotButton sub-component
───────────────────────────────────────────── */
interface DotButtonProps {
  index: number
  isActive: boolean
  onClick: () => void
  totalSlides: number
  alt: string
}

function DotButton({ index, isActive, onClick, totalSlides, alt }: DotButtonProps) {
  return (
    <motion.button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-label={`Go to slide ${index + 1} of ${totalSlides}: ${alt}`}
      onClick={onClick}
      animate={{
        width: isActive ? 24 : 8,
        backgroundColor: isActive
          ? 'rgba(255, 255, 255, 1)'
          : 'rgba(255, 255, 255, 0.45)',
      }}
      whileHover={{
        backgroundColor: isActive
          ? 'rgba(255, 255, 255, 1)'
          : 'rgba(255, 255, 255, 0.7)',
        scale: 1.15,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={[
        'h-2 rounded-full',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-1',
        'shadow-md',
      ].join(' ')}
    />
  )
}
