import { Alert, Linking, Platform } from 'react-native';
import {
  check,
  checkMultiple,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
  type Permission,
  type PermissionStatus,
} from 'react-native-permissions';
import type { AppFeature, PermissionKind } from './types';

const FEATURE_PERMISSIONS: Record<AppFeature, PermissionKind[]> = {
  videoCall: ['camera', 'microphone', 'bluetooth'],
  liveStream: ['camera', 'microphone', 'bluetooth'],
  audioCall: ['microphone', 'bluetooth'],
  screenShare: ['microphone', 'bluetooth', 'notifications'],
};

const FEATURE_LABELS: Record<AppFeature, string> = {
  videoCall: 'Video Call',
  liveStream: 'Live Stream',
  audioCall: 'Audio Call',
  screenShare: 'Screen Share',
};

function getOsPermission(kind: PermissionKind): Permission | null {
  if (Platform.OS === 'ios') {
    switch (kind) {
      case 'camera':
        return PERMISSIONS.IOS.CAMERA;
      case 'microphone':
        return PERMISSIONS.IOS.MICROPHONE;
      case 'bluetooth':
        return PERMISSIONS.IOS.BLUETOOTH;
      case 'notifications':
        return null;
      default:
        return null;
    }
  }

  if (Platform.OS === 'android') {
    switch (kind) {
      case 'camera':
        return PERMISSIONS.ANDROID.CAMERA;
      case 'microphone':
        return PERMISSIONS.ANDROID.RECORD_AUDIO;
      case 'bluetooth':
        return PERMISSIONS.ANDROID.BLUETOOTH_CONNECT;
      case 'notifications':
        return PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
      default:
        return null;
    }
  }

  return null;
}

function permissionKindsForFeature(feature: AppFeature): PermissionKind[] {
  const kinds = FEATURE_PERMISSIONS[feature];

  // Bluetooth is optional (headsets); it often fails on the iOS Simulator.
  if (Platform.OS === 'ios') {
    return kinds.filter(k => k !== 'bluetooth' && k !== 'notifications');
  }

  if (feature === 'screenShare') {
    return kinds;
  }

  return kinds;
}

function resolvePermissions(feature: AppFeature): Permission[] {
  return permissionKindsForFeature(feature)
    .map(getOsPermission)
    .filter((p): p is Permission => p != null);
}

function isGranted(status: PermissionStatus): boolean {
  return (
    status === RESULTS.GRANTED ||
    status === RESULTS.LIMITED ||
    status === RESULTS.UNAVAILABLE
  );
}

function kindLabel(kind: PermissionKind): string {
  switch (kind) {
    case 'camera':
      return 'Camera';
    case 'microphone':
      return 'Microphone';
    case 'bluetooth':
      return 'Bluetooth';
    case 'notifications':
      return 'Notifications';
    default:
      return kind;
  }
}

function deniedMessage(feature: AppFeature, blockedKinds: PermissionKind[]): string {
  const names = blockedKinds.map(kindLabel).join(', ');
  const label = FEATURE_LABELS[feature];
  if (blockedKinds.length === 0) {
    return `${label} needs additional permissions to work.`;
  }
  return `${label} needs access to: ${names}.`;
}

async function requestOne(permission: Permission): Promise<PermissionStatus> {
  const current = await check(permission);
  if (isGranted(current)) {
    return current;
  }
  if (current === RESULTS.BLOCKED) {
    return current;
  }
  return request(permission);
}

export async function checkFeaturePermissions(
  feature: AppFeature,
): Promise<{ granted: boolean; blocked: PermissionKind[] }> {
  const kinds = permissionKindsForFeature(feature);
  const permissions = resolvePermissions(feature);
  const statuses = await checkMultiple(permissions);

  const blocked: PermissionKind[] = [];
  permissions.forEach((permission, index) => {
    const status = statuses[permission];
    if (!isGranted(status)) {
      blocked.push(kinds[index]);
    }
  });

  return { granted: blocked.length === 0, blocked };
}

export async function requestFeaturePermissions(
  feature: AppFeature,
): Promise<{ granted: boolean; blocked: PermissionKind[] }> {
  const kinds = permissionKindsForFeature(feature);
  const permissions = resolvePermissions(feature);
  const blocked: PermissionKind[] = [];

  for (let i = 0; i < permissions.length; i++) {
    const status = await requestOne(permissions[i]);
    if (!isGranted(status)) {
      blocked.push(kinds[i]);
    }
  }

  return { granted: blocked.length === 0, blocked };
}

export async function ensureFeaturePermissions(
  feature: AppFeature,
): Promise<boolean> {
  const checkResult = await checkFeaturePermissions(feature);
  if (checkResult.granted) {
    return true;
  }

  const requestResult = await requestFeaturePermissions(feature);
  if (requestResult.granted) {
    return true;
  }

  const blocked = requestResult.blocked;

  Alert.alert(
    'Permissions required',
    `${deniedMessage(feature, blocked)} You can enable them in Settings.`,
    [
      { text: 'Not now', style: 'cancel' },
      {
        text: 'Open Settings',
        onPress: () => {
          openSettings().catch(() => Linking.openSettings());
        },
      },
    ],
  );

  return false;
}

/** @deprecated Use ensureFeaturePermissions('videoCall' | 'liveStream') */
export async function ensureMediaPermissions(
  options: { camera?: boolean } = { camera: true },
): Promise<boolean> {
  const feature = options.camera ? 'videoCall' : 'audioCall';
  return ensureFeaturePermissions(feature);
}

/** @deprecated Use requestFeaturePermissions */
export async function requestMediaPermissions(
  options: { camera?: boolean } = { camera: true },
): Promise<boolean> {
  const feature = options.camera ? 'videoCall' : 'audioCall';
  const result = await requestFeaturePermissions(feature);
  return result.granted;
}
