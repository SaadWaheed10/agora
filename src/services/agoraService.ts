// agoraService.ts
// Custom hooks for Agora v4.5.3 use cases
import { useEffect, useRef } from 'react';
import { appId, TOKEN as token } from '../constants/agoraConstants';
import RtcEngine from 'react-native-agora';

function useAgoraBase(
  channelName: string,
  profile: number = 1,
  role: number = 1,
  uid: number = 0,
): React.MutableRefObject<any> {
  const engineRef = useRef<any>(null);

  useEffect(() => {
    async function setup() {
      if (!engineRef.current) {
        const engine = RtcEngine();
        await engine.initialize({ appId });
        await engine.setChannelProfile(profile);
        await engine.setClientRole(role);
        engineRef.current = engine;
      }
      await engineRef.current?.joinChannel(token, channelName, null, uid);
    }
    setup();
    return () => {
      (async () => {
        if (engineRef.current) {
          await engineRef.current.leaveChannel();
          await engineRef.current.destroy();
          engineRef.current = null;
        }
      })();
    };
  }, [channelName, profile, role, uid]);
  return engineRef;
}

// Live Stream: profile=1 (LiveBroadcasting), role=1 (Broadcaster)
export function useLiveStream(channelName: string, uid: number = 0) {
  return useAgoraBase(channelName, 1, 1, uid);
}

// Video Call: profile=0 (Communication), role=1 (Broadcaster)
export function useVideoCall(channelName: string, uid: number = 0) {
  return useAgoraBase(channelName, 0, 1, uid);
}

// Audio Call: profile=0 (Communication), role=1 (Broadcaster)
export function useAudioCall(channelName: string, uid: number = 0) {
  return useAgoraBase(channelName, 0, 1, uid);
}

// Screen Share: profile=1 (LiveBroadcasting), role=1 (Broadcaster)
export function useScreenShare(channelName: string, uid: number = 0) {
  return useAgoraBase(channelName, 1, 1, uid);
}
