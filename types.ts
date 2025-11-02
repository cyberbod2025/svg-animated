
export interface AnimationConfig {
  logoName: string;
  logoAnimation: 'electric-trace' | 'fade-in' | 'scale-up' | 'path-draw';
  textAnimation: 'vertical-entrance' | 'fade-in' | 'typewriter' | 'glow-in';
  backgroundAnimation: 'progressive-glow' | 'fade-in' | 'static' | 'subtle-pulse';
  duration: number;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  isTransparent: boolean;
}
