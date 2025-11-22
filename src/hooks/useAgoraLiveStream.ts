import { useRef, useEffect, useState } from 'react';
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  IRtcEngineEventHandler,
} from 'react-native-agora';

const appId = '07c55cff72a54fb3bc2bc5e7736c4615';
const channelName = 'mylivestream';
const token = null;

export const useAgoraLiveStream = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const engineRef = useRef<any>(null);

  useEffect(() => {
    const engine = createAgoraRtcEngine();
    engineRef.current = engine;

    engine.initialize({ appId });
    engine.setChannelProfile(ChannelProfileType.ChannelProfileLiveBroadcasting);
    engine.setClientRole(ClientRoleType.ClientRoleBroadcaster);
    engine.enableAudio();
    engine.enableVideo();

    engine.setVideoEncoderConfiguration({
      dimensions: { width: 720, height: 1280 },
      frameRate: 30,
      bitrate: 2500,
      orientationMode: 1,
    });

    const eventHandler: IRtcEngineEventHandler = {
      onJoinChannelSuccess: () => setIsJoined(true),
      onLeaveChannel: () => setIsJoined(false),
      onError: (err, msg) => console.warn('Agora Error:', err, msg),
    };

    engine.registerEventHandler(eventHandler);

    return () => {
      engine.leaveChannel();
      engine.release();
    };
  }, []);

  const startStream = () => {
    engineRef.current?.joinChannel(token, channelName, 0, {
      publishMicrophoneTrack: true,
      publishCameraTrack: true,
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  const endStream = () => {
    engineRef.current?.leaveChannel();
    setIsJoined(false);
  };

  const toggleMute = () => {
    engineRef.current?.muteLocalAudioStream(!isMuted);
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    engineRef.current?.muteLocalVideoStream(!isVideoEnabled);
    setIsVideoEnabled(!isVideoEnabled);
  };

  return {
    isJoined,
    isMuted,
    isVideoEnabled,
    startStream,
    endStream,
    toggleMute,
    toggleVideo,
  };
};
