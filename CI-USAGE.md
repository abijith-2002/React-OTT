# CI Usage for ReactOTTMobileApp (Expo Managed)

The `ReactOTTMobileApp` is Expo-managed and does not include `./gradlew`. Skip Gradle checks.

Recommended CI steps:
- cd React-OTT/ReactOTTMobileApp
- export CI=1
- npm ci --no-audit --no-fund --progress=false
- npm run start (non-interactive in CI; auto-accepts prompts)
- npm run web (optional)

If your CI must run a healthcheck, use:
  CI=1 sh ./scripts/ci-healthcheck.sh
