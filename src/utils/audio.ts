// Procedural 3D Web Audio API sound effects and Nusantara ambient engine

class AudioManager {
  private ctx: AudioContext | null = null;
  public soundEnabled: boolean = true;
  public musicEnabled: boolean = true;
  private musicInterval: number | null = null;
  private step: number = 0;

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1, delay: number = 0) {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + duration + 0.05);
  }

  public playFootstep() {
    if (!this.soundEnabled) return;
    this.playTone(80 + Math.random() * 40, 0.06, 'triangle', 0.03);
  }

  public playAttack() {
    if (!this.soundEnabled) return;
    // Swift wind slice
    this.playTone(320, 0.12, 'sawtooth', 0.08);
    this.playTone(640, 0.15, 'sine', 0.1, 0.03);
  }

  public playPurify() {
    if (!this.soundEnabled) return;
    // Holy emerald nature beam chime
    this.playTone(523.25, 0.2, 'sine', 0.12);
    this.playTone(659.25, 0.2, 'sine', 0.12, 0.06);
    this.playTone(783.99, 0.3, 'triangle', 0.14, 0.12);
    this.playTone(1046.5, 0.4, 'sine', 0.12, 0.18);
  }

  public playMonsterHit() {
    if (!this.soundEnabled) return;
    this.playTone(140, 0.18, 'sawtooth', 0.15);
    this.playTone(90, 0.25, 'sawtooth', 0.12, 0.05);
  }

  public playPickup() {
    if (!this.soundEnabled) return;
    this.playTone(659.25, 0.1, 'sine', 0.12);
    this.playTone(880, 0.18, 'triangle', 0.15, 0.05);
  }

  public playToxicAlert() {
    if (!this.soundEnabled) return;
    this.playTone(200, 0.15, 'sawtooth', 0.08);
    this.playTone(180, 0.15, 'sawtooth', 0.08, 0.1);
  }

  public playHeal() {
    if (!this.soundEnabled) return;
    [440, 554, 659, 880].forEach((f, idx) => {
      this.playTone(f, 0.25, 'sine', 0.1, idx * 0.06);
    });
  }

  public playSuccessFanfare() {
    if (!this.soundEnabled) return;
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, idx) => {
      this.playTone(f, 0.35, 'triangle', 0.15, idx * 0.08);
    });
  }

  public startMusic() {
    if (!this.musicEnabled) return;
    this.stopMusic();

    // Pentatonic Malay Gamelan peaceful loop (Slendro / Pelog scale)
    const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];

    this.musicInterval = window.setInterval(() => {
      if (!this.musicEnabled) return;
      const ctx = this.initCtx();
      if (!ctx || ctx.state !== 'running') return;

      const note = scale[this.step % scale.length];
      this.step++;

      // Soft bell gong
      this.playTone(note, 0.6, 'sine', 0.025);

      // Deep root gong every 4 beats
      if (this.step % 4 === 0) {
        this.playTone(scale[0] * 0.5, 1.2, 'triangle', 0.035);
      }
    }, 600);
  }

  public stopMusic() {
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  public toggleMusic(): boolean {
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled) {
      this.startMusic();
    } else {
      this.stopMusic();
    }
    return this.musicEnabled;
  }
}

export const audio = new AudioManager();
