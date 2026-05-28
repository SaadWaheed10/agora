import { useEffect, useRef, useState } from 'react';
import { ClientRoleType } from 'react-native-agora';
import { createRtcEngine } from '../agora/createRtcEngine';
import { AGORA_CHANNELS } from '../constants/channelNames';
import { TOKEN as token } from '../constants/agoraConstants';

const channelName = AGORA_CHANNELS.GROUP_CALL;

export const useAgoraGroupCall = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<number[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);

  const engineRef = useRef<ReturnType<typeof createRtcEngine> | null>(null);

  useEffect(() => {
    const engine = createRtcEngine('communication');
    engineRef.current = engine;
    engine.enableAudio();
    engine.enableVideo();
    engine.setEnableSpeakerphone(true);

    engine.registerEventHandler({
      onJoinChannelSuccess: () => setIsJoined(true),
      onUserJoined: (_conn, uid) => {
        setRemoteUsers(prev => (prev.includes(uid) ? prev : [...prev, uid]));
      },
      onUserOffline: (_conn, uid) => {
        setRemoteUsers(prev => prev.filter(id => id !== uid));
      },
      onLeaveChannel: () => {
        setIsJoined(false);
        setRemoteUsers([]);
      },
    });

    return () => {
      engine.leaveChannel();
      engine.release();
    };
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

  const toggleVideo = () => {
    const next = !isVideoEnabled;
    engineRef.current?.muteLocalVideoStream(next);
    setIsVideoEnabled(next);
  };

  const switchCamera = () => engineRef.current?.switchCamera();

  const toggleSpeaker = () => {
    const next = !speakerOn;
    engineRef.current?.setEnableSpeakerphone(next);
    setSpeakerOn(next);
  };

  return {
    channelName,
    isJoined,
    remoteUsers,
    isMuted,
    isVideoEnabled,
    speakerOn,
    join,
    leave,
    toggleMute,
    toggleVideo,
    switchCamera,
    toggleSpeaker,
  };
};
