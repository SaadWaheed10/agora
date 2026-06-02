/** Fixed channel names so two devices can join the same demo easily */
export const AGORA_CHANNELS = {
  VIDEO_CALL: 'rn-demo-video',
  GROUP_CALL: 'rn-demo-group',
  AUDIO_CALL: 'rn-demo-audio',
  LIVE: 'rn-demo-live',
  SCREEN_SHARE: 'rn-demo-screen',
  BEAUTY: 'rn-demo-beauty',
  VIRTUAL_BG: 'rn-demo-vbg',
  VOICE_FX: 'rn-demo-voicefx',
  VOLUME: 'rn-demo-volume',
  NOISE: 'rn-demo-ains',
  AUDIO_MIX: 'rn-demo-mix',
  COHOST: 'rn-demo-cohost',
} as const;

/** Public sample used by Agora web demos for audio mixing tests */
export const DEMO_AUDIO_MIX_URL = 'https://webdemo.agora.io/ding.mp3';
