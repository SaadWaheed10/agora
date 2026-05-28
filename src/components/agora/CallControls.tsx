import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Camera,
  Volume2,
  VolumeX,
} from 'lucide-react-native';
import { Colors } from '../../constants';

type Props = {
  isMuted?: boolean;
  onToggleMute?: () => void;
  onEnd: () => void;
  isVideoEnabled?: boolean;
  onToggleVideo?: () => void;
  onSwitchCamera?: () => void;
  speakerOn?: boolean;
  onToggleSpeaker?: () => void;
};

export function CallControls({
  isMuted,
  onToggleMute,
  onEnd,
  isVideoEnabled,
  onToggleVideo,
  onSwitchCamera,
  speakerOn,
  onToggleSpeaker,
}: Props) {
  return (
    <View style={styles.bar}>
      {onToggleMute != null && isMuted != null && (
        <TouchableOpacity
          style={[styles.btn, isMuted && styles.btnDanger]}
          onPress={onToggleMute}
        >
          {isMuted ? (
            <MicOff size={26} color={Colors.white} />
          ) : (
            <Mic size={26} color={Colors.white} />
          )}
        </TouchableOpacity>
      )}

      {onToggleVideo != null && isVideoEnabled != null && (
        <TouchableOpacity
          style={[styles.btn, !isVideoEnabled && styles.btnDanger]}
          onPress={onToggleVideo}
        >
          {isVideoEnabled ? (
            <Video size={26} color={Colors.white} />
          ) : (
            <VideoOff size={26} color={Colors.white} />
          )}
        </TouchableOpacity>
      )}

      {onToggleSpeaker != null && (
        <TouchableOpacity style={styles.btn} onPress={onToggleSpeaker}>
          {speakerOn ? (
            <Volume2 size={26} color={Colors.white} />
          ) : (
            <VolumeX size={26} color={Colors.white} />
          )}
        </TouchableOpacity>
      )}

      {onSwitchCamera != null && (
        <TouchableOpacity style={styles.btn} onPress={onSwitchCamera}>
          <Camera size={26} color={Colors.white} />
        </TouchableOpacity>
      )}

      <TouchableOpacity style={[styles.btn, styles.btnEnd]} onPress={onEnd}>
        <PhoneOff size={28} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 24,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(13, 17, 23, 0.92)',
  },
  btn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.gray[800],
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDanger: { backgroundColor: Colors.error },
  btnEnd: { backgroundColor: Colors.error, width: 64, height: 64, borderRadius: 32 },
});
