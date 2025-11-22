import { useEffect, useRef, useState } from 'react';
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
} from 'react-native-agora';

const appId = '07c55cff72a54fb3bc2bc5e7736c4615';
const token = null;

export const useAgoraVideoCall = (channelName: string) => {
  const [isJoined, setIsJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const engineRef = useRef<any>(null);

  useEffect(() => {
    const engine = createAgoraRtcEngine();
    engineRef.current = engine;

    engine.initialize({ appId });
    engine.setChannelProfile(ChannelProfileType.ChannelProfileCommunication);
    engine.enableAudio();
    engine.enableVideo();

    const handler = {
      onJoinChannelSuccess: () => setIsJoined(true),
      onUserJoined: (_connection: any, uid: number) => setRemoteUid(uid),
      onUserOffline: () => setRemoteUid(null),
      onLeaveChannel: () => {
        setIsJoined(false);
        setRemoteUid(null);
      },
    };

    engine.registerEventHandler(handler);

    return () => {
      engine.leaveChannel();
      engine.release();
    };
  }, [channelName]);

  const joinCall = async () => {
    if (!engineRef.current) return;
    await engineRef.current.joinChannel(token, channelName, 0, {
      publishMicrophoneTrack: true,
      publishCameraTrack: true,
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  const leaveCall = () => engineRef.current?.leaveChannel();

  const toggleMute = () => {
    engineRef.current?.muteLocalAudioStream(!isMuted);
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    engineRef.current?.muteLocalVideoStream(!isVideoEnabled);
    setIsVideoEnabled(!isVideoEnabled);
  };

  const switchCamera = () => engineRef.current?.switchCamera();

  return {
    isJoined,
    remoteUid,
    isMuted,
    isVideoEnabled,
    joinCall,
    leaveCall,
    toggleMute,
    toggleVideo,
    switchCamera,
  };
};
