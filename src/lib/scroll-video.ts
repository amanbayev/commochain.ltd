/**
 * Initialize a real video frame before scroll seeking. In particular, preload
 * and loadedmetadata alone do not guarantee that iOS has activated its decoder.
 * No autoplay loop, blob download, UA sniffing, or new media asset is required.
 */
export type ScrollVideoState = 'loading' | 'ready' | 'needs-gesture';

export function createScrollVideo(
  video: HTMLVideoElement,
  fps: number,
  onState: (state: ScrollVideoState) => void,
) {
  const rate = Number.isFinite(fps) && fps > 0 ? fps : 24;
  const epsilon = 1 / (rate * 2);
  let target = 0, disposed = false, priming = false, primed = false;
  let gestureAttempt = false, attempt = 0, needsReload = false;
  let waitingSince = 0, state: ScrollVideoState = 'loading';
  let startupTimer = 0, frameTimer = 0, frameCallback: number | null = null;

  const report = (next: ScrollVideoState) => {
    video.dataset.scrubState = next;
    if (state !== next) { state = next; onState(next); }
  };
  const clearStartup = () => {
    window.clearTimeout(startupTimer); window.clearTimeout(frameTimer);
    if (frameCallback !== null && typeof video.cancelVideoFrameCallback === 'function') {
      video.cancelVideoFrameCallback(frameCallback);
    }
    frameCallback = null;
  };
  const flush = () => {
    if (disposed || priming || !primed) return;
    // HAVE_METADATA (1) is not a decoded frame. Keep the latest target queued.
    if (video.readyState < 2 || !Number.isFinite(video.duration) || video.duration <= 0 || video.seeking) {
      if (!waitingSince) waitingSince = performance.now();
      return;
    }
    const next = Math.max(0, Math.min(target, video.duration - 1 / rate));
    if (Math.abs(video.currentTime - next) <= epsilon) {
      waitingSince = 0; needsReload = false;
      report('ready');
      return;
    }
    try {
      waitingSince = performance.now();
      video.currentTime = next;
    } catch (error) {
      needsReload = true;
      video.dataset.scrubError = error instanceof Error ? error.name : 'SeekError';
      report('needs-gesture');
    }
  };

  const activate = (fromGesture = false, explicitRetry = false) => {
    if (disposed || (primed && state !== 'needs-gesture')) return;
    if (needsReload && !explicitRetry) return;
    // A real gesture may upgrade a pending automatic play request, but duplicate
    // pointer/touch/click events must not keep restarting an activation attempt.
    if (priming && (!fromGesture || gestureAttempt)) return;
    const id = ++attempt;
    clearStartup();
    priming = true; primed = false; gestureAttempt = fromGesture;
    waitingSince = 0;
    report('loading');

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    // Reload only after an explicit retry of a stuck seek, never on scroll,
    // locale switches, ordinary buffering, or each pointer interaction.
    if (fromGesture && explicitRetry && needsReload) { needsReload = false; video.load(); }

    const blocked = (error: unknown) => {
      if (disposed || id !== attempt) return;
      clearStartup(); ++attempt;
      priming = false; gestureAttempt = false;
      video.pause();
      video.dataset.scrubError = error instanceof Error ? error.name : 'ActivationBlocked';
      report('needs-gesture');
    };
    const finish = () => {
      if (disposed || id !== attempt || video.readyState < 2) return;
      clearStartup();
      priming = false; gestureAttempt = false; primed = true;
      // Only pause AFTER play resolves and a frame can be presented. Pausing in
      // loadeddata (or immediately after calling play) can abort initialization.
      video.pause();
      delete video.dataset.scrubError;
      flush();
    };
    startupTimer = window.setTimeout(() => blocked(new Error('ActivationTimeout')), 10000);
    try {
      // Must be invoked synchronously when called from a trusted tap/click.
      // No await, timer, or loadeddata callback before this play() call.
      const playing = video.play();
      void playing.then(() => {
        if (disposed || id !== attempt) return;
        // rVFC indicates a frame submitted to the compositor. The brief fallback
        // also supports older engines and callbacks suspended in background tabs.
        frameTimer = window.setTimeout(finish, 150);
        if (typeof video.requestVideoFrameCallback === 'function') {
          frameCallback = video.requestVideoFrameCallback(finish);
        }
      }).catch(blocked);
    } catch (error) { blocked(error); }
  };

  const onSeeked = () => { waitingSince = 0; flush(); };
  const onData = () => { if (!priming) flush(); };
  const dataEvents = ['loadedmetadata', 'loadeddata', 'canplay', 'progress', 'durationchange'] as const;
  video.addEventListener('seeked', onSeeked);
  for (const event of dataEvents) video.addEventListener(event, onData);

  // Recheck queued targets after scroll stops / missing readiness notifications.
  // A long stuck seek exposes a user-controlled recovery; it does not start an
  // endless play/load loop or download a complete blob on every phone.
  const watchdog = window.setInterval(() => {
    if (disposed || document.hidden || priming || !primed) return;
    flush();
    if (waitingSince && performance.now() - waitingSince > 8000) {
      needsReload = true;
      report('needs-gesture');
    }
  }, 500);

  video.dataset.scrubState = 'loading';
  activate();
  return {
    setTarget(time: number) {
      if (!Number.isFinite(time)) return;
      target = Math.max(0, time);
      video.dataset.scrubTarget = target.toFixed(4);
      flush();
    },
    activate,
    dispose() {
      disposed = true; ++attempt;
      clearStartup(); window.clearInterval(watchdog);
      video.pause();
      video.removeEventListener('seeked', onSeeked);
      for (const event of dataEvents) video.removeEventListener(event, onData);
    },
  };
}
