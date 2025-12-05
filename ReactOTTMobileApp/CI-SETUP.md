# CI Setup for Expo-managed ReactOTTMobileApp

This app is Expo-managed and does not include native Android/iOS projects or a Gradle wrapper. Do NOT run `./gradlew` in CI.

Recommended steps:
1) cd React-OTT/ReactOTTMobileApp
2) export CI=1
3) npm ci --no-audit --no-fund --progress=false
4) Run a quick non-interactive healthcheck:
   CI=1 sh ./scripts/ci-healthcheck.sh

Optional:
- To validate the web target non-interactively: CI=1 npm run web

If your CI pipeline expects a "mobile build" step, replace it with the healthcheck above or use EAS Build for native artifacts.
