# Mobile CI Quickstart (Expo Managed)

This app is Expo-managed (no ./gradlew). Do not run Gradle tasks.

Run the non-interactive Expo healthcheck instead:
  bash React-OTT/ci-use-expo-healthcheck.sh

If your CI must call a "gradle check" placeholder, point it to any of these:
  bash React-OTT/gradle-check-guard.sh
  bash React-OTT/ci-mobile-skip-gradle-and-healthcheck.sh
  bash React-OTT/ci-mobile-check-override.sh

Manual (inside app dir) if needed:
  cd React-OTT/ReactOTTMobileApp
  export CI=1
  npm ci --no-audit --no-fund --progress=false
  CI=1 sh ./scripts/ci-healthcheck.sh

For native artifacts, use EAS Build or eject to a bare workflow first.
