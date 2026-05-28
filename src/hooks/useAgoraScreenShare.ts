import { useEffect, useRef, useState } from 'react';
import { Alert, Platform } from 'react-native';
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
} from 'react-native-agora';
import { appId, TOKEN as token } from '../constants/agoraConstants';

const channelName = 'screen-share-room';

export const useAgoraScreenShare = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const engineRef = useRef<ReturnType<typeof createAgoraRtcEngine> | null>(null);

  useEffect(() => {
    const engine = createAgoraRtcEngine();
    engineRef.current = engine;

    engine.initialize({ appId });
    engine.setChannelProfile(ChannelProfileType.ChannelProfileLiveBroadcasting);
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
        'Not supported',
        'In-app screen sharing is available on Android. Use a video call on iOS.',
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

  return { isSharing, isMuted, startShare, stopShare, toggleMute };
};
