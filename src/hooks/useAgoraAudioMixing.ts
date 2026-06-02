import { useEffect, useRef, useState } from 'react';
import {
  AudioMixingReasonType,
  AudioMixingStateType,
  ClientRoleType,
} from 'react-native-agora';
import { createRtcEngine } from '../agora/createRtcEngine';
import { AGORA_CHANNELS, DEMO_AUDIO_MIX_URL } from '../constants/channelNames';
import { TOKEN as token } from '../constants/agoraConstants';

const channelName = AGORA_CHANNELS.AUDIO_MIX;

export const useAgoraAudioMixing = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [mixState, setMixState] = useState<'idle' | 'playing' | 'paused' | 'failed'>(
    'idle',
  );
  const [positionMs, setPositionMs] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const engineRef = useRef<ReturnType<typeof createRtcEngine> | null>(null);

  useEffect(() => {
    const engine = createRtcEngine('communication');
    engineRef.current = engine;
    engine.enableAudio();
    engine.setEnableSpeakerphone(true);

    engine.registerEventHandler({
      onJoinChannelSuccess: () => setIsJoined(true),
      onLeaveChannel: () => {
        setIsJoined(false);
        setMixState('idle');
        setPositionMs(0);
      },
      onAudioMixingStateChanged: (state, reason) => {
        if (state === AudioMixingStateType.AudioMixingStatePlaying) {
          setMixState('playing');
        } else if (state === AudioMixingStateType.AudioMixingStatePaused) {
          setMixState('paused');
        } else if (state === AudioMixingStateType.AudioMixingStateStopped) {
          setMixState('idle');
          setPositionMs(0);
        } else if (state === AudioMixingStateType.AudioMixingStateFailed) {
          setMixState('failed');
          if (reason === AudioMixingReasonType.AudioMixingReasonCanNotOpen) {
            console.warn('Audio mixing file could not be opened');
          }
        }
      },
      onAudioMixingPositionChanged: pos => setPositionMs(pos),
    });

    return () => {
      engine.stopAudioMixing();
      engine.leaveChannel();
      engine.release();
    };
  }, []);

  const join = async () => {
    await engineRef.current?.joinChannel(token, channelName, 0, {
      publishMicrophoneTrack: true,
      publishCameraTrack: false,
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  const leave = () => {
    engineRef.current?.stopAudioMixing();
    engineRef.current?.leaveChannel();
  };

  const startMixing = () => {
    const code =
      engineRef.current?.startAudioMixing(DEMO_AUDIO_MIX_URL, false, 1) ?? -1;
    if (code !== 0) {
      setMixState('failed');
    }
  };

  const stopMixing = () => {
    engineRef.current?.stopAudioMixing();
    setMixState('idle');
    setPositionMs(0);
  };

  const pauseMixing = () => engineRef.current?.pauseAudioMixing();

  const resumeMixing = () => engineRef.current?.resumeAudioMixing();

  const toggleMute = () => {
    const next = !isMuted;
    engineRef.current?.muteLocalAudioStream(next);
    setIsMuted(next);
  };

  return {
    channelName,
    mixUrl: DEMO_AUDIO_MIX_URL,
    isJoined,
    mixState,
    positionMs,
    isMuted,
    join,
    leave,
    startMixing,
    stopMixing,
    pauseMixing,
    resumeMixing,
    toggleMute,
  };
};
