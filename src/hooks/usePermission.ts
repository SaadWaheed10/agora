import { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export function usePermission() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS === 'android') {
        const mic = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );
        const cam = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        setGranted(
          mic === PermissionsAndroid.RESULTS.GRANTED &&
            cam === PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        const mic = await request(PERMISSIONS.IOS.MICROPHONE);
        const cam = await request(PERMISSIONS.IOS.CAMERA);
        setGranted(mic === RESULTS.GRANTED && cam === RESULTS.GRANTED);
      }
    }
    requestPermissions();
  }, []);

  return granted;
}
