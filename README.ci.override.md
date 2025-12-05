# CI Override Guidance (Expo-managed app)

This repository is an Expo-managed app. There is no native Gradle project or ./gradlew to run.

If your CI is attempting a "gradle check" step and fails with:
  Error: This is an Expo-managed app. Gradle wrapper is not included.

Update the pipeline to run the Expo healthcheck instead of Gradle:

From repo root:
  bash React-OTT/ci-run-expo-healthcheck.sh

Or inside the app folder:
  cd React-OTT/ReactOTTMobileApp
  export CI=1
  npm ci --no-audit --no-fund --progress=false
  CI=1 sh ./scripts/ci-healthcheck.sh

Alternate shims that already exist (pick one):
  bash React-OTT/ci-use-expo-healthcheck.sh
  bash React-OTT/ci-mobile-check-override.sh
  bash React-OTT/gradle-check-guard.sh

These are non-interactive and validate the Expo project on a fixed port (8083). Native builds should use EAS Build or eject to a bare workflow; do not attempt Gradle in this managed project.
