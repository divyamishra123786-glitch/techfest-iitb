/**
 * Techfest IIT Bombay - Procedural UI Sound FX
 * Built with Web Audio API (Zero external audio file dependencies)
 */

window.TechfestAudio = (function () {
  let audioCtx = null;
  let isEnabled = false;
  let droneOsc = null;
  let droneGain = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function toggle() {
    isEnabled = !isEnabled;
    if (isEnabled) {
      initAudio();
      playBeep(880, 'sine', 0.08, 0.05);
      startAtmosphericDrone();
    } else {
      stopAtmosphericDrone();
    }
    return isEnabled;
  }

  function playHover() {
    if (!isEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(950, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) { }
  }

  function playClick() {
    if (!isEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.06);
    } catch (e) { }
  }

  function playSuccess() {
    if (!isEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.03, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.15);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.15);
      });
    } catch (e) { }
  }

  function playBeep(freq = 800, type = 'sine', duration = 0.08, vol = 0.03) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) { }
  }

  function startAtmosphericDrone() {
    if (!audioCtx || droneOsc) return;
    try {
      droneOsc = audioCtx.createOscillator();
      droneGain = audioCtx.createGain();
      droneOsc.type = 'sawtooth';
      droneOsc.frequency.setValueAtTime(55, audioCtx.currentTime); // Low A1 harmonic

      // Filter for warm soft sci-fi ambient hum
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, audioCtx.currentTime);

      droneGain.gain.setValueAtTime(0.012, audioCtx.currentTime);

      droneOsc.connect(filter);
      filter.connect(droneGain);
      droneGain.connect(audioCtx.destination);

      droneOsc.start();
    } catch (e) { }
  }

  function stopAtmosphericDrone() {
    if (droneOsc) {
      try {
        droneOsc.stop();
        droneOsc.disconnect();
      } catch (e) { }
      droneOsc = null;
    }
  }

  return {
    toggle,
    isEnabled: () => isEnabled,
    playHover,
    playClick,
    playSuccess
  };
})();
