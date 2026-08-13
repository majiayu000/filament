import { AgentRun } from '@/components/agent-run'
import { ReplayButton } from '@/components/replay-button'
import { CropFrame } from '@/showcase/marks'
import type { RunSnapshot } from '@/lib/run-player'
import type { ApprovalDecision } from '@/types'

const CATALOG = [
  ['01', 'Thinking', '#thinking'],
  ['02', 'Tools', '#tools'],
  ['03', 'Stream', '#stream'],
  ['04', 'Approval', '#approval'],
  ['05', 'Task', '#task'],
  ['06', 'Cost', '#cost'],
] as const

type HeroProps = {
  snapshot: RunSnapshot
  playing: boolean
  onReplay: () => void
  onPause: () => void
  onResume: () => void
  onDecide: (decision: ApprovalDecision) => void
}

export function Hero({
  snapshot,
  playing,
  onReplay,
  onPause,
  onResume,
  onDecide,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden pb-20 pt-8">
      <p className="pointer-events-none absolute -right-6 top-10 hidden select-none font-display text-[28vw] italic leading-none text-copper/[0.06] lg:block">
        01
      </p>

      <div className="mx-auto max-w-6xl px-5">
        <div className="rise flex items-end justify-between gap-4 font-mono text-[10px] uppercase tracking-catalog text-dust">
          <span>Vol. 01 · Specimen plate</span>
          <span className="tabular">Atlas / checkout.pay</span>
        </div>

        <div className="mt-6 grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div>
            <p className="rise rise-1 font-mono text-[11px] uppercase tracking-catalog text-copper-bright">
              Agent-native UI kit
            </p>
            <h1 className="rise rise-2 mt-2 pl-[0.04em] font-display text-[18vw] font-medium leading-[0.76] tracking-[-0.045em] text-cream sm:text-[120px] lg:text-[148px]">
              Filament
            </h1>
            <p className="rise rise-3 relative z-10 -mt-1 ml-[6%] font-display text-[16vw] italic leading-[0.78] text-copper sm:-mt-3 sm:text-[88px] lg:-mb-4 lg:text-[108px]">
              surfaces.
            </p>
            <div className="rise rise-4 mt-6 space-y-5 lg:hidden">
              <p className="text-[16px] leading-7 text-fog">
                The insides of an agent, set like instruments. Thinking, tools, stream,
                approval, state, cost — paste them into a product tonight.
              </p>
              <ReplayButton onClick={onReplay} size="lg" />
            </div>
          </div>

          <div className="rise rise-3 hidden lg:block">
            <ol className="space-y-0 border-l border-line pl-5">
              {CATALOG.map(([index, label, href]) => (
                <li key={index}>
                  <a
                    href={href}
                    className="flex items-baseline justify-between gap-4 border-b border-line/70 py-1.5 font-mono text-[11px] text-fog hover:text-copper-bright"
                  >
                    <span>{label}</span>
                    <span className="text-dust">{index}</span>
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[13px] leading-6 text-fog">
              The insides of an agent, set like instruments. Paste them tonight.
            </p>
            <div className="mt-4">
              <ReplayButton onClick={onReplay} size="md" />
            </div>
          </div>
        </div>
      </div>

      <div className="rise rise-5 relative z-20 mx-auto mt-6 max-w-6xl px-5 lg:mt-2">
        <CropFrame>
          <AgentRun
            snapshot={snapshot}
            playing={playing}
            onReplay={onReplay}
            onPause={onPause}
            onResume={onResume}
            onDecide={onDecide}
          />
        </CropFrame>
      </div>
    </section>
  )
}
