# CI Integration for Expo-managed Mobile App

This project is an Expo-managed React Native app (no native android/ios folders and no ./gradlew).

Do not run Gradle tasks in CI. Instead, use the non-interactive Expo healthcheck:

From the React-OTT workspace root:
  bash React-OTT/ci-use-expo-healthcheck.sh

This runs:
  - npm ci (non-interactive) inside React-OTT/ReactOTTMobileApp
  - A quick Expo healthcheck that validates Metro config and startup without keeping a long-running process

If your CI previously attempted to run a Gradle task, replace it with the script above.

For native artifacts, use EAS Build or eject to the bare workflow first.
