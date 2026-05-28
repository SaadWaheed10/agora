import type { RootDrawerParamList } from '../navigation/types';
import {
  Video,
  Users,
  Phone,
  Radio,
  Eye,
  Monitor,
  Sparkles,
  BookOpen,
} from 'lucide-react-native';
import { Colors } from './colors';
import { AGORA_CHANNELS } from './channelNames';

export type AgoraFeatureCategory =
  | 'Communication'
  | 'Live Streaming'
  | 'Media & Effects'
  | 'Learn';

export type AgoraFeatureItem = {
  route: keyof RootDrawerParamList;
  title: string;
  description: string;
  sdkFeature: string;
  testHint: string;
  icon: typeof Video;
  color: string;
  category: AgoraFeatureCategory;
};

export const AGORA_FEATURE_CATEGORIES: AgoraFeatureCategory[] = [
  'Communication',
  'Live Streaming',
  'Media & Effects',
  'Learn',
];

export const AGORA_FEATURES: AgoraFeatureItem[] = [
  {
    route: 'VideoCall',
    title: '1:1 Video Call',
    description: 'Communication profile — two-way video and audio',
    sdkFeature: 'ChannelProfileCommunication + publishCameraTrack',
    testHint: `Join channel "${AGORA_CHANNELS.VIDEO_CALL}" on two phones.`,
    icon: Video,
    color: Colors.primary,
    category: 'Communication',
  },
  {
    route: 'GroupVideoCall',
    title: 'Group Video Call',
    description: 'Communication profile — multiple remote participants',
    sdkFeature: 'onUserJoined / onUserOffline + remote RtcSurfaceView',
    testHint: `Join "${AGORA_CHANNELS.GROUP_CALL}" with 3+ devices to see a grid.`,
    icon: Users,
    color: Colors.secondary,
    category: 'Communication',
  },
  {
    route: 'AudioCall',
    title: 'Voice Call',
    description: 'Audio-only communication channel',
    sdkFeature: 'publishCameraTrack: false + muteLocalAudioStream',
    testHint: `Join "${AGORA_CHANNELS.AUDIO_CALL}" on two phones (no camera).`,
    icon: Phone,
    color: Colors.accent,
    category: 'Communication',
  },
  {
    route: 'LiveStream',
    title: 'Live Stream (Host)',
    description: 'Broadcast as host with live profile',
    sdkFeature: 'ChannelProfileLiveBroadcasting + ClientRoleBroadcaster',
    testHint: `Host joins "${AGORA_CHANNELS.LIVE}"; audience uses Live Audience demo.`,
    icon: Radio,
    color: Colors.primary,
    category: 'Live Streaming',
  },
  {
    route: 'LiveAudience',
    title: 'Live Audience',
    description: 'Watch a host stream as audience',
    sdkFeature: 'ClientRoleAudience + subscribe to host video',
    testHint: `Open Host on device A, Audience on device B — same channel.`,
    icon: Eye,
    color: Colors.primaryLight,
    category: 'Live Streaming',
  },
  {
    route: 'ScreenShare',
    title: 'Screen Sharing',
    description: 'Share device screen into a channel',
    sdkFeature: 'startScreenCapture + publishScreenTrack (Android)',
    testHint: `Android: join "${AGORA_CHANNELS.SCREEN_SHARE}". iOS needs Broadcast Extension.`,
    icon: Monitor,
    color: Colors.primary,
    category: 'Media & Effects',
  },
  {
    route: 'BeautyEffects',
    title: 'Beauty & Filters',
    description: 'Real-time face enhancement on camera',
    sdkFeature: 'setBeautyEffectOptions (smoothness, lightening, etc.)',
    testHint: `Join "${AGORA_CHANNELS.BEAUTY}" and toggle beauty sliders.`,
    icon: Sparkles,
    color: Colors.secondary,
    category: 'Media & Effects',
  },
  {
    route: 'AgoraGuide',
    title: 'How to Test',
    description: 'App ID, tokens, and multi-device setup',
    sdkFeature: 'react-native-agora v4 setup reference',
    testHint: 'Read before shipping your own integration.',
    icon: BookOpen,
    color: Colors.gray[500],
    category: 'Learn',
  },
];
