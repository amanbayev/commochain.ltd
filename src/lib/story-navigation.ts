type Chapter = { start: number; end: number };

/** Land inside a chapter, not on a boundary that browser pixel rounding can cross. */
export function chapterSeekTime(chapter: Chapter) {
  return chapter.start === 0 ? 0 : Math.min(chapter.start + 0.05, (chapter.start + chapter.end) / 2);
}

export function storyScrollOffset(time: number, duration: number, travel: number) {
  return Math.ceil(Math.max(0, Math.min(1, time / duration)) * Math.max(1, travel));
}
