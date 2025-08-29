"use client"

interface XPProgressBarProps {
  progress: number
  className?: string
}

export function XPProgressBar({ progress, className = "" }: XPProgressBarProps) {
  return (
    <div className={`w-full bg-secondary/30 rounded-full h-3 overflow-hidden ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500 ease-out relative"
        style={{ width: `${Math.min(progress, 100)}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      </div>
    </div>
  )
}
