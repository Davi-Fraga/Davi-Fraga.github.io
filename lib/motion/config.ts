export interface MotionConfig {
  durations: {
    fast: number;
    base: number;
    reveal: number;
    visual: number;
    counters: {
      min: number;
      max: number;
    };
  };
  easings: {
    ui: "power2.out";
    reveal: "power3.out";
    visual: "expo.out";
  };
  breakpoints: {
    mobileMax: number;
    desktopMin: number;
  };
  offsets: {
    navbar: number;
    reveal: number;
  };
  imageScale: number;
  cardShift: number;
  flamengoTilt: number;
}

export const motionConfig = {
  durations: {
    fast: 0.2,
    base: 0.4,
    reveal: 0.7,
    visual: 0.9,
    counters: {
      min: 0.7,
      max: 1.2,
    },
  },
  easings: {
    ui: "power2.out",
    reveal: "power3.out",
    visual: "expo.out",
  },
  breakpoints: {
    mobileMax: 767,
    desktopMin: 768,
  },
  offsets: {
    navbar: 64,
    reveal: 24,
  },
  imageScale: 1.025,
  cardShift: 4,
  flamengoTilt: 3,
} as const satisfies Readonly<MotionConfig>;
