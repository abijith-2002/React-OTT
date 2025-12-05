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

Optional non-interactive starts (fixed port 8083 to avoid prompts):
  npm run start
  npm run web
  PORT=8090 npm run start:port

If your CI system attempts a "mobile gradle check", configure it to skip Gradle for this container and invoke the Expo healthcheck script above. The Gradle wrapper is intentionally not present in this repository.
