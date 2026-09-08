/** Geometry reused verbatim from the existing Concept B mark, not a new logo. */
export function BrandMonogram({ className = '' }: { className?: string }) {
  return <svg className={`brand-monogram ${className}`} viewBox="0 0 64 64" aria-hidden="true" focusable="false"><path d="M50 6H6V58H50V52H12V12H50Z M58 22H26V42H58V36H32V28H58Z" fill="currentColor"/></svg>;
}

export function LinkArrow({ down = false }: { down?: boolean }) {
  return <svg className="link-arrow" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={down ? 'M12 3v14m-5-5 5 5 5-5M4 20h16' : 'M5 19 19 5M5 5h14v14'}/></svg>;
}

export function DisclosureMark() {
  return <svg className="disclosure-mark" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false"><path d="M4 12h16M12 4v16"/></svg>;
}
