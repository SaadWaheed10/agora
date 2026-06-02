import { useEffect, useRef, useState } from 'react';
import { AudioVolumeInfo, ClientRoleType } from 'react-native-agora';
import { createRtcEngine } from '../agora/createRtcEngine';
import { AGORA_CHANNELS } from '../constants/channelNames';
import { TOKEN as token } from '../constants/agoraConstants';

const channelName = AGORA_CHANNELS.VOLUME;

export type VolumeSpeaker = {
  uid: number;
  volume: number;
  isLocal: boolean;
};

export const useAgoraVolumeIndicator = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [speakers, setSpeakers] = useState<VolumeSpeaker[]>([]);
  const [isMuted, setIsMuted] = useState(false);

  const engineRef = useRef<ReturnType<typeof createRtcEngine> | null>(null);

  useEffect(() => {
    const engine = createRtcEngine('communication');
    engineRef.current = engine;
    engine.enableAudio();
    engine.setEnableSpeakerphone(true);

    engine.registerEventHandler({
      onJoinChannelSuccess: () => {
        setIsJoined(true);
        engine.enableAudioVolumeIndication(200, 3, true);
      },
      onLeaveChannel: () => {
        setIsJoined(false);
        setSpeakers([]);
      },
      onAudioVolumeIndication: (_conn, volumeSpeakers: AudioVolumeInfo[]) => {
        const mapped: VolumeSpeaker[] = volumeSpeakers
          .filter(s => (s.volume ?? 0) > 0 || s.uid === 0)
          .map(s => ({
            uid: s.uid ?? 0,
            volume: s.volume ?? 0,
            isLocal: s.uid === 0,
          }))
          .sort((a, b) => b.volume - a.volume);
        setSpeakers(mapped);
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
      publishCameraTrack: false,
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  const leave = () => engineRef.current?.leaveChannel();

  const toggleMute = () => {
    const next = !isMuted;
    engineRef.current?.muteLocalAudioStream(next);
    setIsMuted(next);
  };

  return {
    channelName,
    isJoined,
    speakers,
    isMuted,
    join,
    leave,
    toggleMute,
  };
};
