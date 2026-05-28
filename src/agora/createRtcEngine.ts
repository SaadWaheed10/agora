import { createAgoraRtcEngine, ChannelProfileType } from 'react-native-agora';
import { appId } from '../constants/agoraConstants';

export type EngineProfile =
  | 'communication'
  | 'liveBroadcasting';

export function createRtcEngine(profile: EngineProfile) {
  const engine = createAgoraRtcEngine();
  engine.initialize({ appId });
  engine.setChannelProfile(
    profile === 'liveBroadcasting'
      ? ChannelProfileType.ChannelProfileLiveBroadcasting
      : ChannelProfileType.ChannelProfileCommunication,
  );
  return engine;
}
