import { useEffect, useRef, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { ClientRoleType } from 'react-native-agora';
import { createRtcEngine } from '../agora/createRtcEngine';
import { AGORA_CHANNELS } from '../constants/channelNames';
import { TOKEN as token } from '../constants/agoraConstants';

export const useAgoraScreenShare = () => {
  const channelName = AGORA_CHANNELS.SCREEN_SHARE;
  const [isSharing, setIsSharing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const engineRef = useRef<ReturnType<typeof createRtcEngine> | null>(null);

  useEffect(() => {
    const engine = createRtcEngine('liveBroadcasting');
    engineRef.current = engine;
    engine.setClientRole(ClientRoleType.ClientRoleBroadcaster);
    engine.enableAudio();
    engine.enableVideo();

    engine.registerEventHandler({
      onJoinChannelSuccess: () => setIsSharing(true),
      onLeaveChannel: () => setIsSharing(false),
    });

    return () => {
      if (Platform.OS === 'android') {
        engine.stopScreenCapture();
      }
      engine.leaveChannel();
      engine.release();
    };
  }, []);

  const startShare = async () => {
    if (Platform.OS !== 'android') {
      Alert.alert(
        'iOS screen share',
        'In-app screen capture on iOS requires a Broadcast Extension. This demo implements Android screen capture via startScreenCapture + publishScreenTrack.',
      );
      return;
    }

    const engine = engineRef.current;
    if (!engine) {
      return;
    }

    engine.startScreenCapture({
      captureVideo: true,
      captureAudio: false,
    });

    await engine.joinChannel(token, channelName, 0, {
      publishMicrophoneTrack: true,
      publishCameraTrack: false,
      publishScreenTrack: true,
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  const stopShare = () => {
    const engine = engineRef.current;
    if (!engine) {
      return;
    }
    if (Platform.OS === 'android') {
      engine.stopScreenCapture();
    }
    engine.leaveChannel();
    setIsSharing(false);
  };

  const toggleMute = () => {
    const next = !isMuted;
    engineRef.current?.muteLocalAudioStream(next);
    setIsMuted(next);
  };

  return { channelName, isSharing, isMuted, startShare, stopShare, toggleMute };
};
