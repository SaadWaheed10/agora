import { useEffect, useRef, useState } from 'react';
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
} from 'react-native-agora';
import { appId, TOKEN as token } from '../constants/agoraConstants';

export const useAgoraAudioCall = (channelName: string) => {
  const [isJoined, setIsJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const engineRef = useRef<ReturnType<typeof createAgoraRtcEngine> | null>(null);

  useEffect(() => {
    const engine = createAgoraRtcEngine();
    engineRef.current = engine;

    engine.initialize({ appId });
    engine.setChannelProfile(ChannelProfileType.ChannelProfileCommunication);
    engine.enableAudio();

    engine.registerEventHandler({
      onJoinChannelSuccess: () => setIsJoined(true),
      onUserJoined: (_connection, uid) => setRemoteUid(uid),
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
  }, [channelName]);

  const joinCall = async () => {
    await engineRef.current?.joinChannel(token, channelName, 0, {
      publishMicrophoneTrack: true,
      publishCameraTrack: false,
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  const leaveCall = () => engineRef.current?.leaveChannel();

  const toggleMute = () => {
    const next = !isMuted;
    engineRef.current?.muteLocalAudioStream(next);
    setIsMuted(next);
  };

  return {
    isJoined,
    remoteUid,
    isMuted,
    joinCall,
    leaveCall,
    toggleMute,
  };
};
