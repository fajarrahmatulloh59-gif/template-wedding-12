/**
 * Web Audio API Synthesizer for Sundanese Gamelan Degung / Salendro scale
 * Provides a serene, high quality acoustic ambient melody as an immediate, reliable fallback
 * when an external MP3 file is unavailable or fails to load.
 */

class SundaAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private gainNode: GainNode | null = null;

  // Sundanese Pelog Degung notes frequencies (Hz approx):
  // Da (530), Mi (480), Na (420), Ti (360), La (320), Da-low (265)
  private degungScale = [
    265, 320, 360, 420, 480, 530, 640, 720, 840
  ];

  // Peaceful traditional motif sequence indices
  private melodyPattern = [
    0, 2, 3, 5, 4, 3, 2, 0,
    1, 3, 4, 6, 5, 4, 3, 1,
    2, 4, 5, 7, 6, 5, 4, 2,
    0, 3, 5, 4, 2, 1, 0, -1
  ];

  private step = 0;

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.init();
    if (!this.ctx || this.isPlaying) return;
    this.isPlaying = true;

    // Master volume node
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.18, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    const playNext = () => {
      if (!this.isPlaying || !this.ctx || !this.gainNode) return;

      const noteIdx = this.melodyPattern[this.step % this.melodyPattern.length];
      this.step++;

      if (noteIdx >= 0 && noteIdx < this.degungScale.length) {
        this.strikeBell(this.degungScale[noteIdx]);

        // Occasionally play a soft low gong drone for depth
        if (this.step % 8 === 0) {
          this.strikeGong(132.5); // Deep resonance
        }
      }

      // Calm, meditative tempo ~650ms between notes
      this.timer = window.setTimeout(playNext, 650);
    };

    playNext();
  }

  private strikeBell(freq: number) {
    if (!this.ctx || !this.gainNode) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Metallic chime harmonic ratios
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.76, now); // Metallic overtones

    noteGain.gain.setValueAtTime(0.18, now);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 2.3);
    osc2.stop(now + 2.3);
  }

  private strikeGong(freq: number) {
    if (!this.ctx || !this.gainNode) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gongGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    // Slight pitch bend characteristic of bronze gong
    osc.frequency.exponentialRampToValueAtTime(freq * 0.98, now + 3.0);

    gongGain.gain.setValueAtTime(0.25, now);
    gongGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

    osc.connect(gongGain);
    gongGain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + 4.6);
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public stop() {
    this.pause();
    this.step = 0;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const sundaSynth = new SundaAudioSynthesizer();
