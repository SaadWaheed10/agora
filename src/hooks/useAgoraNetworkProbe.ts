import { useEffect, useRef, useState } from 'react';
import {
  LastmileProbeConfig,
  LastmileProbeResult,
  LastmileProbeResultState,
  createAgoraRtcEngine,
} from 'react-native-agora';
import { appId } from '../constants/agoraConstants';

export const useAgoraNetworkProbe = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<LastmileProbeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const engineRef = useRef<ReturnType<typeof createAgoraRtcEngine> | null>(null);

  useEffect(() => {
    const engine = createAgoraRtcEngine();
    engine.initialize({ appId });
    engineRef.current = engine;

    engine.registerEventHandler({
      onLastmileProbeResult: probeResult => {
        setResult(probeResult);
        setIsRunning(false);
        if (probeResult.state === LastmileProbeResultState.LastmileProbeResultUnavailable) {
          setError('Probe unavailable — check your network connection.');
        } else {
          setError(null);
        }
      },
    });

    return () => {
      engine.stopLastmileProbeTest();
      engine.release();
    };
  }, []);

  const start = () => {
    setResult(null);
    setError(null);
    setIsRunning(true);

    const config = new LastmileProbeConfig();
    config.probeUplink = true;
    config.probeDownlink = true;
    config.expectedUplinkBitrate = 500000;
    config.expectedDownlinkBitrate = 500000;

    const code = engineRef.current?.startLastmileProbeTest(config) ?? -1;
    if (code !== 0) {
      setIsRunning(false);
      setError(`Failed to start probe (code ${code}).`);
    }
  };

  const stop = () => {
    engineRef.current?.stopLastmileProbeTest();
    setIsRunning(false);
  };

  return {
    isRunning,
    result,
    error,
    start,
    stop,
  };
};
