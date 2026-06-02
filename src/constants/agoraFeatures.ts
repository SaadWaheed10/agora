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
  Layers,
  Mic2,
  Repeat,
  Shield,
  BarChart3,
  Activity,
  Music,
  UserPlus,
} from 'lucide-react-native';
import { Colors } from './colors';
import { AGORA_CHANNELS } from './channelNames';

export type AgoraFeatureCategory =
  | 'Communication'
  | 'Live Streaming'
  | 'Media & Effects'
  | 'Diagnostics'
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
  'Diagnostics',
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
    route: 'VoiceEffects',
    title: 'Voice Effects',
    description: 'Preset voice changer and room acoustics',
    sdkFeature: 'setAudioEffectPreset + setVoiceBeautifierPreset',
    testHint: `Join "${AGORA_CHANNELS.VOICE_FX}" and try presets while speaking.`,
    icon: Mic2,
    color: Colors.secondaryLight,
    category: 'Communication',
  },
  {
    route: 'VolumeIndicator',
    title: 'Volume Indicator',
    description: 'Real-time speaking volume for local and remote users',
    sdkFeature: 'enableAudioVolumeIndication + onAudioVolumeIndication',
    testHint: `Join "${AGORA_CHANNELS.VOLUME}" on two devices and watch the meters.`,
    icon: BarChart3,
    color: Colors.info,
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
    route: 'LiveCoHost',
    title: 'Live Co-Host',
    description: 'Switch between audience and broadcaster in a live channel',
    sdkFeature: 'setClientRole + updateChannelMediaOptions',
    testHint: `Join "${AGORA_CHANNELS.COHOST}" as audience, then promote to host.`,
    icon: UserPlus,
    color: Colors.accentLight,
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
    route: 'VirtualBackground',
    title: 'Virtual Background',
    description: 'Blur or replace the camera background',
    sdkFeature: 'enableVirtualBackground + SegmentationProperty',
    testHint: `Join "${AGORA_CHANNELS.VIRTUAL_BG}" and try blur or solid color.`,
    icon: Layers,
    color: Colors.primaryLight,
    category: 'Media & Effects',
  },
  {
    route: 'NoiseSuppression',
    title: 'AI Noise Suppression',
    description: 'AINS modes for cleaner microphone audio',
    sdkFeature: 'setAINSMode (balanced / aggressive / ultra-low latency)',
    testHint: `Join "${AGORA_CHANNELS.NOISE}" and compare AINS modes in a noisy room.`,
    icon: Shield,
    color: Colors.success,
    category: 'Media & Effects',
  },
  {
    route: 'AudioMixing',
    title: 'Audio Mixing',
    description: 'Play music into the channel alongside the mic',
    sdkFeature: 'startAudioMixing + onAudioMixingStateChanged',
    testHint: `Join "${AGORA_CHANNELS.AUDIO_MIX}" and play the bundled demo track.`,
    icon: Music,
    color: Colors.accent,
    category: 'Media & Effects',
  },
  {
    route: 'EchoTest',
    title: 'Echo Test',
    description: 'Loopback test for mic and speaker before joining',
    sdkFeature: 'startEchoTest + stopEchoTest',
    testHint: 'Speak into the mic — you should hear yourself after ~2 seconds.',
    icon: Repeat,
    color: Colors.warning,
    category: 'Diagnostics',
  },
  {
    route: 'NetworkProbe',
    title: 'Network Probe',
    description: 'Last-mile uplink/downlink quality test',
    sdkFeature: 'startLastmileProbeTest + onLastmileProbeResult',
    testHint: 'Run probe before going live to check packet loss, jitter, and RTT.',
    icon: Activity,
    color: Colors.primary,
    category: 'Diagnostics',
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
