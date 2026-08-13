import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function base(props: IconProps) {
  return {
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...props,
  }
}

export function FilamentMark(props: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...props}>
      <path d="M2 17c3.2-8 4.8-8 8 0s4.8 8 8 0" stroke="#c56a2d" strokeWidth="1.5" />
      <path
        d="M2 12c3.2-6.4 4.8-6.4 8 0s4.8 6.4 8 0"
        stroke="#a24e16"
        strokeWidth="1.2"
        opacity="0.85"
      />
      <path d="M2 7c3.2-4.4 4.8-4.4 8 0s4.8 4.4 8 0" stroke="#8a5a32" strokeWidth="1.1" />
    </svg>
  )
}

export function IconReplay(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.4 8a4.6 4.6 0 1 0 1.2-3.2" />
      <path d="M3.2 2.8v3.4H6.6" />
    </svg>
  )
}

export function IconChevron(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 6.5 8 10.5 12 6.5" />
    </svg>
  )
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.2 8.2 6.4 11.4 12.8 4.6" />
    </svg>
  )
}

export function IconX(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 4 12 12M12 4 4 12" />
    </svg>
  )
}

export function IconCopy(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5.2" y="5.2" width="7.6" height="7.6" rx="0.6" />
      <path d="M3.4 10.2V3.6h6.6" />
    </svg>
  )
}

export function IconPlay(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 3.8v8.4L12.4 8 5 3.8Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconPause(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 3.6h1.8v8.8H5zM9.2 3.6H11v8.8H9.2z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconBolt(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9.2 2.4 4.2 9.2h3.2L6.6 13.6l5.2-7.2H8.6L9.2 2.4Z" />
    </svg>
  )
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="8" cy="8" r="5.4" />
      <path d="M8 5.2V8l2.2 1.4" />
    </svg>
  )
}

export function IconAlert(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 2.8 13.6 13H2.4L8 2.8Z" />
      <path d="M8 6.4v3.2M8 11.4h.01" />
    </svg>
  )
}
