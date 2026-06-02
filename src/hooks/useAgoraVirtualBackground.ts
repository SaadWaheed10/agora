import { useEffect, useRef, useState } from 'react';
import {
  BackgroundBlurDegree,
  BackgroundSourceType,
  ClientRoleType,
  SegmentationProperty,
  SegModelType,
  VirtualBackgroundSource,
} from 'react-native-agora';
import { createRtcEngine } from '../agora/createRtcEngine';
import { AGORA_CHANNELS } from '../constants/channelNames';
import { TOKEN as token } from '../constants/agoraConstants';

export type VirtualBgMode = 'off' | 'blur' | 'color';

const channelName = AGORA_CHANNELS.VIRTUAL_BG;

function buildBackground(mode: VirtualBgMode): VirtualBackgroundSource {
  const source = new VirtualBackgroundSource();
  if (mode === 'blur') {
    source.background_source_type = BackgroundSourceType.BackgroundBlur;
    source.blur_degree = BackgroundBlurDegree.BlurDegreeHigh;
  } else if (mode === 'color') {
    source.background_source_type = BackgroundSourceType.BackgroundColor;
    source.color = 0x161b22;
  }
  return source;
}

export const useAgoraVirtualBackground = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [mode, setMode] = useState<VirtualBgMode>('off');
  const [isMuted, setIsMuted] = useState(false);

  const engineRef = useRef<ReturnType<typeof createRtcEngine> | null>(null);
  const isJoinedRef = useRef(false);
  const modeRef = useRef<VirtualBgMode>('off');

  const applyMode = (next: VirtualBgMode) => {
    modeRef.current = next;
    setMode(next);
    const engine = engineRef.current;
    if (!engine || !isJoinedRef.current) {
      return;
    }
    const seg = new SegmentationProperty();
    seg.modelType = SegModelType.SegModelAi;
    engine.enableVirtualBackground(
      next !== 'off',
      buildBackground(next),
      seg,
    );
  };

  useEffect(() => {
    const engine = createRtcEngine('communication');
    engineRef.current = engine;
    engine.enableAudio();
    engine.enableVideo();

    engine.registerEventHandler({
      onJoinChannelSuccess: () => {
        isJoinedRef.current = true;
        setIsJoined(true);
        applyMode(modeRef.current);
      },
      onLeaveChannel: () => {
        isJoinedRef.current = false;
        setIsJoined(false);
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
    mode,
    isMuted,
    join,
    leave,
    setMode: applyMode,
    toggleMute,
    switchCamera,
  };
};
