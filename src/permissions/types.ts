export type AppFeature =
  | 'videoCall'
  | 'groupCall'
  | 'liveStream'
  | 'liveAudience'
  | 'audioCall'
  | 'screenShare'
  | 'beauty'
  | 'virtualBackground'
  | 'voiceEffects'
  | 'echoTest'
  | 'noiseSuppression'
  | 'volumeIndicator'
  | 'networkProbe'
  | 'audioMixing'
  | 'liveCoHost';

export type PermissionKind = 'camera' | 'microphone' | 'bluetooth' | 'notifications';
