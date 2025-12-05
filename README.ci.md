# CI Guidance (React-OTT workspace)

This repository contains an Expo-managed app. Native Gradle builds are not used here unless you eject or use EAS Build.

Do NOT run `./gradlew` in CI. Instead, use the non-interactive Expo healthcheck:

- From repository root:
  bash React-OTT/ci-run-expo-healthcheck.sh

- Or:
  cd React-OTT/ReactOTTMobileApp
  export CI=1
  npm ci --no-audit --no-fund --progress=false
  CI=1 sh ./scripts/ci-healthcheck.sh

If your CI system attempts a "mobile gradle check", configure it to skip Gradle for this container and invoke the Expo healthcheck script above.
