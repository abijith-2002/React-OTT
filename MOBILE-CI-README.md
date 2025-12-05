# Mobile CI README (Expo Managed App)

This repository contains an Expo-managed React Native app in React-OTT/ReactOTTMobileApp.
There is intentionally no Gradle wrapper (./gradlew) or native android/ios folders.

If your CI attempts to run a "Gradle check" or any ./gradlew command, it will fail. 
Use the non-interactive Expo healthcheck instead:

Quick start from repository root:
  bash React-OTT/ci-run-expo-healthcheck.sh

Equivalent manual steps:
  cd React-OTT/ReactOTTMobileApp
  export CI=1
  npm ci --no-audit --no-fund --progress=false
  CI=1 sh ./scripts/ci-healthcheck.sh

Useful scripts (non-interactive, fixed port):
  npm run start            # starts on port 8083 without prompts
  PORT=8090 npm run start:port
  npm run web

Notes:
- This validates the project can start with Expo and that Metro configuration is healthy.
- For native build artifacts, use EAS Build or eject to the bare workflow first.
- The app depends on Expo and React Navigation peer dependencies which are already included here:
  - react-native-safe-area-context
  - react-native-screens
