# CI Gradle Guard (Expo Managed)

This project is an Expo-managed app. There is no Gradle wrapper or native `android/ios` projects by default.

If your CI attempts to run a Gradle step, use this guard which redirects to the non-interactive Expo healthcheck:

Quick fix in CI:
- bash React-OTT/gradle-ci-guard.sh

Existing options:
- bash React-OTT/ci-use-expo-healthcheck.sh
- bash React-OTT/ci-run-expo-healthcheck.sh

Inside app directory (manual):
- cd React-OTT/ReactOTTMobileApp
- export CI=1
- npm ci --no-audit --no-fund --progress=false
- CI=1 sh ./scripts/ci-healthcheck.sh

These validate the Metro/Expo project startup non-interactively on a deterministic port (8083) without trying to run any Gradle tasks.
