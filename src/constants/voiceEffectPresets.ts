import { AudioEffectPreset } from 'react-native-agora';

export type VoiceEffectPresetOption = {
  id: string;
  label: string;
  preset: AudioEffectPreset;
};

export const VOICE_EFFECT_PRESETS: VoiceEffectPresetOption[] = [
  { id: 'off', label: 'Original', preset: AudioEffectPreset.AudioEffectOff },
  { id: 'ktv', label: 'KTV', preset: AudioEffectPreset.RoomAcousticsKtv },
  { id: 'studio', label: 'Studio', preset: AudioEffectPreset.RoomAcousticsStudio },
  { id: 'concert', label: 'Concert Hall', preset: AudioEffectPreset.RoomAcousticsVocalConcert },
  { id: 'stereo', label: 'Virtual Stereo', preset: AudioEffectPreset.RoomAcousticsVirtualStereo },
  { id: 'uncle', label: 'Uncle', preset: AudioEffectPreset.VoiceChangerEffectUncle },
  { id: 'sister', label: 'Sister', preset: AudioEffectPreset.VoiceChangerEffectSister },
  { id: 'hulk', label: 'Hulk', preset: AudioEffectPreset.VoiceChangerEffectHulk },
];
