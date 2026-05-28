import { useEffect, useRef, useState } from 'react';
import { ClientRoleType } from 'react-native-agora';
import { createRtcEngine } from '../agora/createRtcEngine';
import { AGORA_CHANNELS } from '../constants/channelNames';
import { TOKEN as token } from '../constants/agoraConstants';

const channelName = AGORA_CHANNELS.LIVE;

export const useAgoraLiveAudience = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [hostUid, setHostUid] = useState<number | null>(null);
  const [speakerOn, setSpeakerOn] = useState(true);

  const engineRef = useRef<ReturnType<typeof createRtcEngine> | null>(null);

  useEffect(() => {
    const engine = createRtcEngine('liveBroadcasting');
    engineRef.current = engine;
    engine.enableAudio();
    engine.enableVideo();
    engine.setClientRole(ClientRoleType.ClientRoleAudience);
    engine.setEnableSpeakerphone(true);

    engine.registerEventHandler({
      onJoinChannelSuccess: () => setIsJoined(true),
      onUserJoined: (_conn, uid) => setHostUid(uid),
      onUserOffline: (_conn, uid) => {
        setHostUid(prev => (prev === uid ? null : prev));
      },
      onLeaveChannel: () => {
        setIsJoined(false);
        setHostUid(null);
      },
    });

    return () => {
      engine.leaveChannel();
      engine.release();
    };
  }, []);

  const join = async () => {
    await engineRef.current?.joinChannel(token, channelName, 0, {
      publishMicrophoneTrack: false,
      publishCameraTrack: false,
      clientRoleType: ClientRoleType.ClientRoleAudience,
    });
  };

  const leave = () => engineRef.current?.leaveChannel();

  const toggleSpeaker = () => {
    const next = !speakerOn;
    engineRef.current?.setEnableSpeakerphone(next);
    setSpeakerOn(next);
  };

  return {
    channelName,
    isJoined,
    hostUid,
    speakerOn,
    join,
    leave,
    toggleSpeaker,
  };
};
