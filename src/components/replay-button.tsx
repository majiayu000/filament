import { IconReplay } from '@/components/icons'
import { cn } from '@/lib/cn'

type ReplayButtonProps = {
  onClick: () => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZE = {
  sm: 'gap-1 px-2 py-1 text-[10px]',
  md: 'gap-1.5 px-3 py-1.5 text-[11px]',
  lg: 'gap-2 px-4 py-2.5 text-[12px]',
} as const

export function ReplayButton({ onClick, size = 'md', className }: ReplayButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-action="replay"
      className={cn(
        'inline-flex items-center bg-copper font-mono uppercase tracking-wider text-paper hover:bg-copper-bright',
        SIZE[size],
        className,
      )}
    >
      <IconReplay className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      Replay
    </button>
  )
}
