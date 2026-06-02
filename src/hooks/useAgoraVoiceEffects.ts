import { useEffect, useRef, useState } from 'react';
import { AudioEffectPreset, ClientRoleType } from 'react-native-agora';
import { createRtcEngine } from '../agora/createRtcEngine';
import { AGORA_CHANNELS } from '../constants/channelNames';
import { TOKEN as token } from '../constants/agoraConstants';
import { VOICE_EFFECT_PRESETS } from '../constants/voiceEffectPresets';

const channelName = AGORA_CHANNELS.VOICE_FX;

export const useAgoraVoiceEffects = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState<number | null>(null);
  const [activePresetId, setActivePresetId] = useState('off');
  const [isMuted, setIsMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);

  const engineRef = useRef<ReturnType<typeof createRtcEngine> | null>(null);

  const applyPreset = (preset: AudioEffectPreset, id: string) => {
    engineRef.current?.setAudioEffectPreset(preset);
    setActivePresetId(id);
  };

  useEffect(() => {
    const engine = createRtcEngine('communication');
    engineRef.current = engine;
    engine.enableAudio();
    engine.setEnableSpeakerphone(true);

    engine.registerEventHandler({
      onJoinChannelSuccess: () => {
        setIsJoined(true);
        applyPreset(AudioEffectPreset.AudioEffectOff, 'off');
      },
      onUserJoined: (_c, uid) => setRemoteUid(uid),
      onUserOffline: () => setRemoteUid(null),
      onLeaveChannel: () => {
        setIsJoined(false);
        setRemoteUid(null);
      },
    });

    return () => {
      engine.leaveChannel();
      engine.release();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const join = async () => {
    await engineRef.current?.joinChannel(token, channelName, 0, {
      publishMicrophoneTrack: true,
      publishCameraTrack: false,
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  const leave = () => engineRef.current?.leaveChannel();

  const toggleMute = () => {
    const next = !isMuted;
    engineRef.current?.muteLocalAudioStream(next);
    setIsMuted(next);
  };

  const toggleSpeaker = () => {
    const next = !speakerOn;
    engineRef.current?.setEnableSpeakerphone(next);
    setSpeakerOn(next);
  };

  return {
    channelName,
    isJoined,
    remoteUid,
    activePresetId,
    presets: VOICE_EFFECT_PRESETS,
    isMuted,
    speakerOn,
    join,
    leave,
    applyPreset,
    toggleMute,
    toggleSpeaker,
  };
};
