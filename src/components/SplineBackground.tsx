'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import type { Application } from '@splinetool/runtime'

const Spline = dynamic(
  () => import('@splinetool/react-spline'),
  {
    ssr: false,
    loading: () => null,
  }
)

export function SplineBackground() {
  const [splineLoaded, setSplineLoaded] = useState(false)
  const [isMobile, setIsMobile]         = useState(false)
  const splineRef                        = useRef<Application | null>(null)
  const rafRef                           = useRef<number>(0)
  const mouseRef                         = useRef({ x: 0, y: 0 })
  const lerpedMouse                      = useRef({ x: 0, y: 0 })

  // ── Mobile detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Global mouse tracking (Disabled until variables are added to Spline Editor) ──
  useEffect(() => {
    if (isMobile) return
    /*
    const handleMouseMove = (e: MouseEvent) => {
      // Normalise: center = 0,0 — top-left = -1,-1 — bottom-right = 1,1
      mouseRef.current = {
        x: (e.clientX / window.innerWidth)  * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
    */
  }, [isMobile])

  // ── Spline variable injection loop (Disabled) ─────────────
  const startLoop = useCallback(() => {
    /*
    const LERP_FACTOR = 0.06 // silky premium smoothing
    const loop = () => {
      // Interpolate towards actual mouse position
      lerpedMouse.current.x += (mouseRef.current.x - lerpedMouse.current.x) * LERP_FACTOR
      lerpedMouse.current.y += (mouseRef.current.y - lerpedMouse.current.y) * LERP_FACTOR

      if (splineRef.current) {
        try {
          splineRef.current.setVariable('mouseX', lerpedMouse.current.x)
          splineRef.current.setVariable('mouseY', lerpedMouse.current.y)
        } catch {}
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    */
  }, [])

  const handleLoad = useCallback((app: Application) => {
    splineRef.current = app
    setSplineLoaded(true)
    startLoop()
  }, [startLoop])

  // ── Cleanup RAF on unmount ────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // ── No render on mobile ───────────────────────────────────────────────────
  if (isMobile) return null

  return (
    <>
      {/* Spline canvas — fixed, fullscreen, receives pointer events */}
      <div
        id="spline-wrapper"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         '100vw',
          height:        '100vh',
          zIndex:        0,
          pointerEvents: 'auto',  // CRITICAL: override inherited 'none' from body
          opacity:       splineLoaded ? 1 : 0,
          transition:    'opacity 1.5s ease',
        }}
      >
        <Spline
          scene="https://prod.spline.design/nH5nGJsAx0Csax3j/scene.splinecode"
          onLoad={handleLoad}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </>
  )
}




