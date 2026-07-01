import { useEffect, useState } from "react"

function clamp(value, min = 0, max = 255) {
  return Math.min(max, Math.max(min, value))
}

function toRgb({ r, g, b }) {
  return `rgb(${r}, ${g}, ${b})`
}

function darkenColor({ r, g, b }, factor = 0.35) {
  return {
    r: Math.round(r * factor),
    g: Math.round(g * factor),
    b: Math.round(b * factor),
  }
}

function boostSaturation({ r, g, b }, factor = 1.35) {
  const avg = (r + g + b) / 3

  return {
    r: clamp(Math.round(avg + (r - avg) * factor)),
    g: clamp(Math.round(avg + (g - avg) * factor)),
    b: clamp(Math.round(avg + (b - avg) * factor)),
  }
}

function getBrightness({ r, g, b }) {
  return (r + g + b) / 3
}

function getSaturation({ r, g, b }) {
  return Math.max(r, g, b) - Math.min(r, g, b)
}

function extractColor(ctx, x, y, width, height) {
  const data = ctx.getImageData(x, y, width, height).data

  let r = 0
  let g = 0
  let b = 0
  let count = 0

  for (let i = 0; i < data.length; i += 4) {
    const pr = data[i]
    const pg = data[i + 1]
    const pb = data[i + 2]
    const alpha = data[i + 3]

    if (alpha < 128) continue

    const brightness = (pr + pg + pb) / 3
    const saturation = Math.max(pr, pg, pb) - Math.min(pr, pg, pb)

    if (brightness < 45 || brightness > 225) continue
    if (saturation < 30) continue

    r += pr
    g += pg
    b += pb
    count++
  }

  if (count === 0) return null

  const color = {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count),
    count,
  }

  const brightness = getBrightness(color)
  const saturation = getSaturation(color)

  return {
    ...color,
    score: saturation * 1.4 + brightness * 0.45 + Math.min(count, 1000) * 0.02,
  }
}

function getBestColor(ctx, size) {
  const half = Math.floor(size / 2)
  const third = Math.floor(size / 3)

  const samples = [
    extractColor(ctx, 0, 0, size, size),
    extractColor(ctx, 0, 0, size, half),
    extractColor(ctx, 0, third, size, third),
    extractColor(ctx, 0, half, size, half),
  ].filter(Boolean)

  if (!samples.length) return null

  return samples.sort((a, b) => b.score - a.score)[0]
}

export function HeroBackdrop({ imageUrl }) {
  const [colors, setColors] = useState(null)

  useEffect(() => {
    setColors(null)
    if (!imageUrl) return

    let cancelled = false

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageUrl

    img.onload = () => {
      if (cancelled) return

      try {
        const size = 80
        const canvas = document.createElement("canvas")
        canvas.width = size
        canvas.height = size

        const ctx = canvas.getContext("2d", { willReadFrequently: true })
        if (!ctx) return

        ctx.drawImage(img, 0, 0, size, size)

        const raw = getBestColor(ctx, size)
        if (!raw) return

        const boosted = boostSaturation(raw, 1.45)

        const primary = {
          r: clamp(Math.round(boosted.r * 0.78)),
          g: clamp(Math.round(boosted.g * 0.78)),
          b: clamp(Math.round(boosted.b * 0.78)),
        }

        const dark = darkenColor(primary, 0.32)

        setColors({ primary, dark })
      } catch (error) {
        console.warn("HeroBackdrop color error:", error)
        setColors(null)
      }
    }

    img.onerror = () => {
      if (!cancelled) setColors(null)
    }

    return () => {
      cancelled = true
    }
  }, [imageUrl])

  const backdrop = colors
    ? `linear-gradient(
        135deg,
        ${toRgb(colors.primary)} 0%,
        ${toRgb(colors.dark)} 42%,
        rgba(13, 13, 20, 0.94) 86%,
        #0d0d14 100%
      )`
    : `linear-gradient(
        135deg,
        #1e0a42 0%,
        #0d0d14 100%
      )`

      console.log(backdrop)
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: backdrop,
          transition: "background 0.6s ease",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 35%), linear-gradient(to bottom, transparent 45%, #0d0d14 100%)",
          zIndex: 1,
        }}
      />
    </>
  )
}

export default HeroBackdrop