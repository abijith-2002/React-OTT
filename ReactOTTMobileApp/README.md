# React OTT Mobile App (Expo Managed)

This app uses the Expo managed workflow (SDK 54). Managed apps do not include native Android/iOS directories or a Gradle wrapper (`./gradlew`) by default. All development and running is done with Expo commands.

Key points:
- There is no `android` or `ios` native folder or `./gradlew` in this repository.
- CI or tooling that tries to run `./gradlew` will fail with: `./gradlew: No such file or directory`. This is expected for Expo managed projects.
- Use npm scripts with Expo to run the app:
  - Install: `npm ci` (or `npm install`)
  - Start Metro: `CI=1 npm run start` (non-interactive)
  - Web: `CI=1 npm run web`
  - Android (on connected device/emulator via Expo Go): `CI=1 npm run android`
  - iOS (on macOS with Simulator via Expo Go): `CI=1 npm run ios`

Non-interactive usage:
- The scripts are configured to use the local Expo CLI.
- Set `CI=1` in the environment when running in CI to force fully non-interactive behavior (e.g., auto-confirm port changes).

Environment variables:
- The app reads the following public variables from `.env` if present:
  - EXPO_PUBLIC_TRUST_PROXY
  - EXPO_PUBLIC_LOG_LEVEL
  - EXPO_PUBLIC_HEALTHCHECK_PATH
  - EXPO_PUBLIC_FEATURE_FLAGS
  - EXPO_PUBLIC_EXPERIMENTS_ENABLED

If native builds are needed in the future (bare workflow), you can eject from Expo to generate native projects. Until then, do not attempt `./gradlew` in CI.
