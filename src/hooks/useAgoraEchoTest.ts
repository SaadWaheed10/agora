import { useEffect, useRef, useState } from 'react';
import {
  EchoTestConfiguration,
  createAgoraRtcEngine,
} from 'react-native-agora';
import { appId, TOKEN as token } from '../constants/agoraConstants';

export const useAgoraEchoTest = () => {
  const [isRunning, setIsRunning] = useState(false);
  const channelIdRef = useRef(`rn-demo-echo-${Date.now()}`);

  const engineRef = useRef<ReturnType<typeof createAgoraRtcEngine> | null>(null);

  useEffect(() => {
    const engine = createAgoraRtcEngine();
    engine.initialize({ appId });
    engine.enableAudio();
    engineRef.current = engine;

    return () => {
      engine.stopEchoTest();
      engine.release();
    };
  }, []);

  const start = () => {
    const config = new EchoTestConfiguration();
    config.enableAudio = true;
    config.enableVideo = false;
    config.token = token ?? undefined;
    config.channelId = channelIdRef.current;
    config.intervalInSeconds = 2;

    const code = engineRef.current?.startEchoTest(config) ?? -1;
    if (code === 0) {
      setIsRunning(true);
    }
  };

  const stop = () => {
    engineRef.current?.stopEchoTest();
    setIsRunning(false);
    channelIdRef.current = `rn-demo-echo-${Date.now()}`;
  };

  return {
    channelId: channelIdRef.current,
    isRunning,
    start,
    stop,
  };
};
