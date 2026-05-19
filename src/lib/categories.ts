export const CATEGORY_RULES: Array<[RegExp, string]> = [
  [/network|tcp|http|gRPC|mtu|nginx-buffer|firewall|browser-sop|brotli|br-extension/i, 'Network'],
  [/css|frontend|react|ui-|tooltip|grid|shared-worker|mf-|echarts|test|msw/i, 'Frontend'],
  [/mcp|claude|langfuse|fine-tuning|rag|ai-agent|a2a|langs/i, 'AI'],
  [/jit|bun|v8|register|strict|javascript/i, 'Runtime'],
  [/hexagonal|event-msa|architecture/i, 'Architecture'],
  [/sql|mvcc|scn|database/i, 'Database'],
  [/git|nginx-worker|port-forward|fowarding/i, 'DevOps'],
  [/latency|cpu|memory|register/i, 'Systems'],
];

export const CATEGORIES: Record<string, { color: string; glyph: string; desc: string }> = {
  Frontend:     { color: '#10b981', glyph: 'FE',  desc: 'UI · Browser · CSS' },
  Network:      { color: '#22d3ee', glyph: 'NW',  desc: 'TCP · HTTP · Routing' },
  AI:           { color: '#facc15', glyph: 'AI',  desc: 'LLM · Agents · Tooling' },
  Runtime:      { color: '#a78bfa', glyph: 'RT',  desc: 'V8 · Node · Bun' },
  Architecture: { color: '#fb7185', glyph: 'AR',  desc: 'MSA · DDD · Patterns' },
  Database:     { color: '#fbbf24', glyph: 'DB',  desc: 'SQL · MVCC · Index' },
  DevOps:       { color: '#34d399', glyph: 'OPS', desc: 'Nginx · Git · Infra' },
  Systems:      { color: '#f472b6', glyph: 'SYS', desc: 'CPU · Memory · Storage' },
  Misc:         { color: '#94a3b8', glyph: 'MS',  desc: 'Etc' },
};

export function resolveCategory(id: string, frontmatterCategory?: string): string {
  if (frontmatterCategory) return frontmatterCategory;
  const hit = CATEGORY_RULES.find(([re]) => re.test(id));
  return hit ? hit[1] : 'Misc';
}
