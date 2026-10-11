# Filament

Agent-native UI surfaces. Thinking, tools, stream, approval, task, cost.

```bash
bun install
bun dev
```

Open [http://localhost:5173](http://localhost:5173).

Copy-paste the instruments from `src/components/`. Each tile on the wall has a usage snippet.

## Copying components into an app

The snippets in [src/data/script.ts](src/data/script.ts) use eight components from six source files. These are source-copy components for a React + TypeScript/TSX app; the demo package is marked private.

Copy [src/lib/cn.ts](src/lib/cn.ts) and [src/types.ts](src/types.ts), plus the component file and helpers below. Paths in the table are relative to `src/`; the type imports are erased at runtime.

| Component | Component file | Additional source helpers | Types from `types.ts` |
| --- | --- | --- | --- |
| `ThinkingTrace` | `components/thinking-trace.tsx` | `components/icons.tsx`, `lib/format.ts` | `ThoughtStep` |
| `ToolCallRow`, `ToolCallCard` | `components/tool-call.tsx` | `components/icons.tsx`, `lib/format.ts` | `ToolCall`, `ToolStatus` |
| `StreamingText` | `components/streaming-text.tsx` | None | `Citation` |
| `ApprovalCard` | `components/approval-card.tsx` | `components/icons.tsx` | `ApprovalDecision`, `ApprovalRequest`, `Risk` |
| `TaskMachine`, `TaskProgress` | `components/task-progress.tsx` | None | `MachineNode`, `MachineNodeState` |
| `CostPanel` | `components/cost-panel.tsx` | `lib/format.ts` | `CostSnapshot` |

- Runtime packages: `react`, `clsx`, and `tailwind-merge`. A browser app also needs its React DOM renderer. Keep React typings and a TSX build setup; the demo's versions are recorded in [package.json](package.json). Icons are inline SVG and need no icon package.
- Resolve `@/` to the copied source root in both TypeScript and the bundler, as in [tsconfig.app.json](tsconfig.app.json) and [vite.config.ts](vite.config.ts), or rewrite the imports to relative paths.
- For the supplied appearance, use a Tailwind CSS build that scans the copied TSX files. The demo uses Tailwind 3.4.17 with [PostCSS](postcss.config.js). Merge the colors, fonts, shadows, letter spacing, animations, and keyframes from [tailwind.config.js](tailwind.config.js) into your theme.
- Include the relevant rules from [src/index.css](src/index.css): `.stream-caret` for `StreamingText`, `.shimmer-bar` for a running `ToolCallCard`, and `.tabular` for `TaskProgress`/`CostPanel`, along with their reduced-motion overrides. Make the referenced `caret` and `shimmer` keyframes available in the output CSS, either as explicit CSS keyframes using the definitions in the Tailwind config or through the matching generated animation utilities. Component files do not import this stylesheet.
- To match the typography, load Fraunces, IBM Plex Sans, and IBM Plex Mono as shown in [index.html](index.html), or choose your own fonts and inherited body typography. The page background, grain, root/body layout, and other showcase decoration can stay in the demo.

Supply the snippet variables (`steps`, `tools`, `answer`, `citations`, `approval`, `decision`/`setDecision`, `nodes`, and `cost`) from your app. The fixtures in `src/data/script.ts`, `src/showcase/`, `AgentRun`, `ReplayButton`, `run-player.ts`, and `use-run.ts` drive the showcase and are outside these components' import closure. Your app owns real tool execution, streaming updates, and approval handling.
