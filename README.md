# Agora React Native Showcase

A hands-on demo app for the [React Native community](https://reactnative.dev) to explore [**react-native-agora**](https://github.com/AgoraIO-Extensions/react-native-agora) (v4.x) — the official Agora Video SDK binding for iOS and Android.

Use it to **see real SDK features running on a device**, copy patterns into your own app, and test multi-device scenarios without building every integration from scratch.

---

## Purpose

Building live video, voice, and streaming into a React Native app involves many moving parts: permissions, channel setup, UI for calls, and dozens of SDK APIs. This project exists to:

- **Lower the learning curve** — each screen focuses on one Agora capability with a short explanation and test hints.
- **Provide working reference code** — hooks and screens show how v4 APIs are wired in TypeScript (engine lifecycle, events, `RtcSurfaceView`, and more).
- **Support community testing** — fixed demo channel names make it easy to join the same room from two phones and verify behavior quickly.

This is a **showcase and learning tool**, not a production template. Replace the bundled App ID, enable token authentication, and harden error handling before shipping your own product.

---

## What this app does

The home screen groups demos by category. Open any card to try that feature, or use the side drawer to jump between screens. Every demo (except diagnostics) uses a **named channel** so two or more devices can join the same room.

### Communication

| Demo | What you can try |
|------|------------------|
| **1:1 Video Call** | Two-way video and audio in a communication channel |
| **Group Video Call** | Multiple remote participants with camera tiles |
| **Voice Call** | Audio-only channel (no camera) |
| **Voice Effects** | Preset voice changer and room acoustics (`setAudioEffectPreset`) |
| **Volume Indicator** | Live speaking-volume meters (`enableAudioVolumeIndication`) |

### Live streaming

| Demo | What you can try |
|------|------------------|
| **Live Stream (Host)** | Broadcast as host (`ClientRoleBroadcaster`) |
| **Live Audience** | Watch a host as audience (`ClientRoleAudience`) |
| **Live Co-Host** | Switch between audience and broadcaster in the same live channel |

### Media & effects

| Demo | What you can try |
|------|------------------|
| **Screen Sharing** | Publish screen capture (Android; iOS needs a Broadcast Extension) |
| **Beauty & Filters** | Real-time face enhancement sliders |
| **Virtual Background** | Blur or solid-color background (`enableVirtualBackground`) |
| **AI Noise Suppression** | AINS modes for cleaner mic audio (`setAINSMode`) |
| **Audio Mixing** | Play background music into the channel (`startAudioMixing`) |

### Diagnostics

| Demo | What you can try |
|------|------------------|
| **Echo Test** | Mic/speaker loopback before joining a channel |
| **Network Probe** | Last-mile uplink/downlink quality (`startLastmileProbeTest`) |

### Learn

| Demo | What you can try |
|------|------------------|
| **How to Test** | App ID, channel names, tokens, and multi-device tips |

---

## Demo channels

Each feature uses a fixed channel name so devices can find each other easily:

| Channel key | Name |
|-------------|------|
| Video call | `rn-demo-video` |
| Group call | `rn-demo-group` |
| Audio call | `rn-demo-audio` |
| Live / audience / co-host | `rn-demo-live` / `rn-demo-cohost` |
| Screen share | `rn-demo-screen` |
| Beauty | `rn-demo-beauty` |
| Virtual background | `rn-demo-vbg` |
| Voice effects | `rn-demo-voicefx` |
| Volume indicator | `rn-demo-volume` |
| Noise suppression | `rn-demo-ains` |
| Audio mixing | `rn-demo-mix` |

Channel constants live in [`src/constants/channelNames.ts`](src/constants/channelNames.ts).

---

## Who this is for

- **React Native developers** evaluating Agora for calls, live streaming, or real-time media
- **Contributors** who want a runnable app to reproduce SDK behavior or add new demos
- **Workshop and meetup attendees** who need a shared app to pair-test on phones

---

## Tech stack

- React Native 0.81
- [react-native-agora](https://www.npmjs.com/package/react-native-agora) ^4.5
- React Navigation (drawer)
- TypeScript
- [lucide-react-native](https://lucide.dev) icons

---

## Prerequisites

- [React Native environment](https://reactnative.dev/docs/set-up-your-environment) (Node 20+, Xcode for iOS, Android Studio for Android)
- A physical device is recommended for camera, mic, and live-stream tests (simulators work with limitations)
- An [Agora App ID](https://console.agora.io/) (a test ID is included for quick starts; use your own for real projects)

---

## Configuration

1. Clone the repo and install dependencies:

   ```sh
   yarn install
   ```

2. **App ID** — set yours in [`src/constants/agoraConstants.tsx`](src/constants/agoraConstants.tsx):

   ```ts
   export const appId = 'YOUR_AGORA_APP_ID';
   export const TOKEN = null; // testing mode; use tokens in production
   ```

3. **iOS** — install pods after install or native dependency changes:

   ```sh
   yarn pod
   ```

4. **Permissions** — camera and microphone are requested per feature when you start a demo. Grant them when prompted.

---

## Run the app

Start Metro:

```sh
yarn start
```

In another terminal:

```sh
# Android
yarn android

# iOS
yarn ios
```

You can also open `ios/agora.xcworkspace` in Xcode or the `android` folder in Android Studio.

---

## How to test with two devices

1. Install the app on two phones (or one phone + one simulator with camera enabled).
2. Open the **same demo** on both devices (e.g. **1:1 Video Call**).
3. Tap join/start on both — they use the same channel name shown on the banner.
4. For **Live Host + Audience**, run **Live Stream (Host)** on device A and **Live Audience** on device B (both use the live channel).

See **How to Test** inside the app for more scenarios.

---

## Project layout

```text
src/
  agora/           # RTC engine factory
  components/      # Shared UI (header, demo banner, controls)
  constants/       # App ID, channels, feature catalog
  hooks/           # Per-feature Agora logic
  navigation/      # Drawer navigator
  permissions/     # Camera / mic permission helpers
  screens/         # One screen per demo
```

---

## Contributing

Contributions are welcome — especially new demos that map to supported `react-native-agora` APIs, clearer test hints, or platform notes (iOS vs Android).

When adding a feature:

1. Add a hook under `src/hooks/`
2. Add a screen under `src/screens/`
3. Register the route in `src/navigation/types.ts` and `CombinedNavigator.tsx`
4. Add an entry to `src/constants/agoraFeatures.ts` and a channel in `channelNames.ts` if needed

---

## Resources

- [react-native-agora on GitHub](https://github.com/AgoraIO-Extensions/react-native-agora)
- [Agora Video SDK documentation](https://docs.agora.io/en/video-calling/overview/product-overview)
- [Agora Console](https://console.agora.io/) — App ID and token setup

---

## License

See the license file in this repository. Agora SDK usage is subject to [Agora’s terms](https://www.agora.io/en/terms-of-service/).
