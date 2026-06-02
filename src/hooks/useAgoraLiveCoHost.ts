import { useEffect, useRef, useState } from 'react';
import { ClientRoleType, VideoSourceType } from 'react-native-agora';
import { createRtcEngine } from '../agora/createRtcEngine';
import { AGORA_CHANNELS } from '../constants/channelNames';
import { TOKEN as token } from '../constants/agoraConstants';

const channelName = AGORA_CHANNELS.COHOST;

export type LiveCoHostRole = 'audience' | 'broadcaster';

export const useAgoraLiveCoHost = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [role, setRole] = useState<LiveCoHostRole>('audience');
  const [hostUid, setHostUid] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const engineRef = useRef<ReturnType<typeof createRtcEngine> | null>(null);
  const isJoinedRef = useRef(false);
  const roleRef = useRef<LiveCoHostRole>('audience');

  const applyRole = (next: LiveCoHostRole) => {
    roleRef.current = next;
    const engine = engineRef.current;
    if (!engine || !isJoinedRef.current) {
      setRole(next);
      return;
    }

    if (next === 'broadcaster') {
      engine.setClientRole(ClientRoleType.ClientRoleBroadcaster);
      engine.enableVideo();
      engine.updateChannelMediaOptions({
        publishMicrophoneTrack: true,
        publishCameraTrack: true,
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
    } else {
      engine.setClientRole(ClientRoleType.ClientRoleAudience);
      engine.updateChannelMediaOptions({
        publishMicrophoneTrack: false,
        publishCameraTrack: false,
        clientRoleType: ClientRoleType.ClientRoleAudience,
      });
    }
    setRole(next);
  };

  useEffect(() => {
    const engine = createRtcEngine('liveBroadcasting');
    engineRef.current = engine;
    engine.enableAudio();
    engine.enableVideo();
    engine.setClientRole(ClientRoleType.ClientRoleAudience);

    engine.registerEventHandler({
      onJoinChannelSuccess: () => {
        isJoinedRef.current = true;
        setIsJoined(true);
      },
      onUserJoined: (_c, uid) => {
        if (roleRef.current === 'audience') {
          setHostUid(uid);
        }
      },
      onUserOffline: (_c, uid) => {
        setHostUid(prev => (prev === uid ? null : prev));
      },
      onLeaveChannel: () => {
        isJoinedRef.current = false;
        setIsJoined(false);
        setHostUid(null);
        roleRef.current = 'audience';
        setRole('audience');
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
      publishMicrophoneTrack: false,
      publishCameraTrack: false,
      clientRoleType: ClientRoleType.ClientRoleAudience,
    });
    setRole('audience');
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

  return {
    channelName,
    isJoined,
    role,
    hostUid,
    isMuted,
    isVideoEnabled,
    videoSourceType: VideoSourceType.VideoSourceCamera,
    join,
    leave,
    setRole: applyRole,
    toggleMute,
    toggleVideo,
    switchCamera,
  };
};
