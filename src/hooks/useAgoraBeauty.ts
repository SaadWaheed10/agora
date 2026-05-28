import { useEffect, useRef, useState } from 'react';
import {
  BeautyOptions,
  ClientRoleType,
  LighteningContrastLevel,
} from 'react-native-agora';
import { createRtcEngine } from '../agora/createRtcEngine';
import { AGORA_CHANNELS } from '../constants/channelNames';
import { TOKEN as token } from '../constants/agoraConstants';

const channelName = AGORA_CHANNELS.BEAUTY;

export type BeautyLevels = {
  smoothness: number;
  lightening: number;
  redness: number;
};

const defaultLevels: BeautyLevels = {
  smoothness: 0.6,
  lightening: 0.4,
  redness: 0.1,
};

export const useAgoraBeauty = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState<number | null>(null);
  const [beautyOn, setBeautyOn] = useState(true);
  const [levels, setLevels] = useState<BeautyLevels>(defaultLevels);
  const [isMuted, setIsMuted] = useState(false);

  const engineRef = useRef<ReturnType<typeof createRtcEngine> | null>(null);

  const applyBeauty = (enabled: boolean, lv: BeautyLevels) => {
    const options = new BeautyOptions();
    options.lighteningContrastLevel = LighteningContrastLevel.LighteningContrastNormal;
    options.lighteningLevel = lv.lightening;
    options.smoothnessLevel = lv.smoothness;
    options.rednessLevel = lv.redness;
    options.sharpnessLevel = 0.1;
    engineRef.current?.setBeautyEffectOptions(enabled, options);
  };

  useEffect(() => {
    const engine = createRtcEngine('communication');
    engineRef.current = engine;
    engine.enableAudio();
    engine.enableVideo();

    engine.registerEventHandler({
      onJoinChannelSuccess: () => {
        setIsJoined(true);
        applyBeauty(true, defaultLevels);
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
      publishCameraTrack: true,
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  const leave = () => engineRef.current?.leaveChannel();

  const toggleBeauty = () => {
    const next = !beautyOn;
    applyBeauty(next, levels);
    setBeautyOn(next);
  };

  const updateLevels = (next: BeautyLevels) => {
    setLevels(next);
    if (beautyOn) {
      applyBeauty(true, next);
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    engineRef.current?.muteLocalAudioStream(next);
    setIsMuted(next);
  };

  const switchCamera = () => engineRef.current?.switchCamera();

  return {
    channelName,
    isJoined,
    remoteUid,
    beautyOn,
    levels,
    isMuted,
    join,
    leave,
    toggleBeauty,
    updateLevels,
    toggleMute,
    switchCamera,
  };
};
