type MotionEnvironment = {
  preference: Pick<MediaQueryList, 'matches' | 'addEventListener' | 'removeEventListener'>;
  createObserver?: (callback: IntersectionObserverCallback, options: IntersectionObserverInit) => Pick<IntersectionObserver, 'observe' | 'disconnect'>;
};

/** One optional emphasis, never a loading state or simulated live activity. */
export function observeDiagramMotion(element: HTMLElement, { preference, createObserver }: MotionEnvironment) {
  if (preference.matches || !createObserver) return () => {};
  let finished = false;
  const observer = createObserver(entries => {
    if (finished || preference.matches) return;
    if (!entries.some(entry => entry.target === element && entry.isIntersecting && entry.intersectionRatio >= .25)) return;
    finished = true;
    element.setAttribute('data-motion-entered', 'true');
    observer.disconnect();
  }, { threshold: .25 });
  const preferenceChanged = () => {
    if (!preference.matches) return;
    finished = true;
    observer.disconnect();
    element.removeAttribute('data-motion-entered');
  };
  preference.addEventListener('change', preferenceChanged);
  observer.observe(element);
  return () => {
    finished = true;
    observer.disconnect();
    preference.removeEventListener('change', preferenceChanged);
    element.removeAttribute('data-motion-entered');
  };
}
