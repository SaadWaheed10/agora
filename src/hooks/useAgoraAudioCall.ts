import { useEffect, useRef, useState } from 'react';
import { ClientRoleType } from 'react-native-agora';
import { createRtcEngine } from '../agora/createRtcEngine';
import { AGORA_CHANNELS } from '../constants/channelNames';
import { TOKEN as token } from '../constants/agoraConstants';

export const useAgoraAudioCall = () => {
  const channelName = AGORA_CHANNELS.AUDIO_CALL;
  const [isJoined, setIsJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);

  const engineRef = useRef<ReturnType<typeof createRtcEngine> | null>(null);

  useEffect(() => {
    const engine = createRtcEngine('communication');
    engineRef.current = engine;
    engine.enableAudio();
    engine.setEnableSpeakerphone(true);

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
  }, []);

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

  const toggleSpeaker = () => {
    const next = !speakerOn;
    engineRef.current?.setEnableSpeakerphone(next);
    setSpeakerOn(next);
  };

  return {
    channelName,
    isJoined,
    remoteUid,
    isMuted,
    speakerOn,
    joinCall,
    leaveCall,
    toggleMute,
    toggleSpeaker,
  };
};
