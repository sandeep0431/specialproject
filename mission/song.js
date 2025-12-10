document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("loveSong");
  if (!audio) return;

  // Simple: try to play audio immediately. No syncing, no overlays.
  audio.play().catch((err) => {
    // Most browsers block audible autoplay; if that happens user can press play.
    console.log("Playback failed (autoplay blocked or error):", err);
  });
});

// --- Debug helpers: update visible status and log media events ---
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("loveSong");
  const status = document.getElementById("audioStatus");

  function setStatus(text) {
    console.log("Audio status:", text);
    if (status) status.textContent = text;
  }

  if (!audio) return;

  audio.addEventListener("loadedmetadata", () => {
    setStatus(`Loaded — duration: ${isFinite(audio.duration) ? audio.duration.toFixed(2) + 's' : 'unknown'}`);
  });

  audio.addEventListener("canplay", () => setStatus("Can play (buffered enough)."));
  audio.addEventListener("canplaythrough", () => setStatus("Can play through without buffering."));
  audio.addEventListener("playing", () => setStatus("Playing."));
  audio.addEventListener("pause", () => setStatus("Paused."));
  audio.addEventListener("ended", () => setStatus("Ended."));

  audio.addEventListener("error", () => {
    const err = audio.error;
    if (!err) {
      setStatus("Unknown audio error occurred.");
      return;
    }
    // MediaError codes: 1 = MEDIA_ERR_ABORTED, 2 = MEDIA_ERR_NETWORK, 3 = MEDIA_ERR_DECODE, 4 = MEDIA_ERR_SRC_NOT_SUPPORTED
    const codeMap = {
      1: 'MEDIA_ERR_ABORTED',
      2: 'MEDIA_ERR_NETWORK',
      3: 'MEDIA_ERR_DECODE',
      4: 'MEDIA_ERR_SRC_NOT_SUPPORTED'
    };
    setStatus(`Error: ${codeMap[err.code] || ('code ' + err.code)}.`);
    console.error('MediaError', err);
  });

  // If audio remains paused (muted autoplay blocked), suggest action
  setTimeout(() => {
    if (audio.paused) {
      setStatus('Audio is paused. Click the small 🔊 button or the native play control to start sound.');
    }
  }, 1200);
});
