type Props = { subject: 'field' | 'grain' };

/** A static responsive photo by default; CSS adds bounded scroll motion when supported. */
export function EditorialPhoto({ subject }: Props) {
  const asset = subject === 'field' ? 'field-season' : 'grain-storage';
  return <div className={`editorial-photo editorial-photo-${subject}`}>
    <img src={`/assets/editorial/${asset}.webp`}
      srcSet={`/assets/editorial/${asset}-small.webp 800w, /assets/editorial/${asset}.webp 1600w`}
      sizes={subject === 'field' ? '100vw' : '(max-width: 767px) 100vw, 50vw'}
      alt="" width="1600" height="900" loading="lazy" decoding="async"/>
  </div>;
}
