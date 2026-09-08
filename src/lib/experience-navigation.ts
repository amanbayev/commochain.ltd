export const sectionKeys = ['overview', 'assets', 'verification', 'infrastructure', 'participation', 'company', 'faq', 'contact', 'deeper'] as const;
export type SectionKey = typeof sectionKeys[number];

/** Standard tab keyboard behavior. No activation for unrelated keys. */
export function nextAudienceIndex(key: string, current: number, count: number, vertical = false): number | null {
  if (count < 1) return null;
  if (key === 'Home') return 0;
  if (key === 'End') return count - 1;
  if (key === (vertical ? 'ArrowDown' : 'ArrowRight')) return (current + 1) % count;
  if (key === (vertical ? 'ArrowUp' : 'ArrowLeft')) return (current - 1 + count) % count;
  return null;
}

/** The section crossing the reading line wins, including very tall sections. */
export function sectionAtReadingLine(bounds: { key: SectionKey; top: number; bottom: number }[], line: number): SectionKey | null {
  return bounds.find(section => section.top <= line && section.bottom > line)?.key ?? null;
}
