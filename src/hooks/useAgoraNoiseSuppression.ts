import { useEffect, useRef, useState } from 'react';
import { AudioAinsMode, ClientRoleType } from 'react-native-agora';
import { createRtcEngine } from '../agora/createRtcEngine';
import { AGORA_CHANNELS } from '../constants/channelNames';
import { TOKEN as token } from '../constants/agoraConstants';

const channelName = AGORA_CHANNELS.NOISE;

export type AinsModeOption = 'off' | AudioAinsMode;

export const useAgoraNoiseSuppression = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [ainsMode, setAinsMode] = useState<AinsModeOption>('off');
  const [isMuted, setIsMuted] = useState(false);

  const engineRef = useRef<ReturnType<typeof createRtcEngine> | null>(null);
  const ainsModeRef = useRef<AinsModeOption>('off');

  const applyAins = (mode: AinsModeOption) => {
    ainsModeRef.current = mode;
    const engine = engineRef.current;
    if (!engine) {
      return;
    }
    if (mode === 'off') {
      engine.setAINSMode(false, AudioAinsMode.AinsModeBalanced);
    } else {
      engine.setAINSMode(true, mode);
    }
    setAinsMode(mode);
  };

  useEffect(() => {
    const engine = createRtcEngine('communication');
    engineRef.current = engine;
    engine.enableAudio();
    engine.enableVideo();

    engine.registerEventHandler({
      onJoinChannelSuccess: () => {
        setIsJoined(true);
        applyAins(ainsModeRef.current);
      },
      onLeaveChannel: () => setIsJoined(false),
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
      publishCameraTrack: true,
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  const leave = () => engineRef.current?.leaveChannel();

  const toggleMute = () => {
    const next = !isMuted;
    engineRef.current?.muteLocalAudioStream(next);
    setIsMuted(next);
  };

  const switchCamera = () => engineRef.current?.switchCamera();

  return {
    channelName,
    isJoined,
    ainsMode,
    isMuted,
    join,
    leave,
    setAinsMode: applyAins,
    toggleMute,
    switchCamera,
  };
};
