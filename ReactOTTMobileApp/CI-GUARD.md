# CI Guard for Expo-managed App (App Folder)

This is an Expo-managed React Native app. There is no Gradle wrapper (`./gradlew`) or native `android/ios` projects by default.

Do NOT run Gradle tasks in CI for this project.

Use the non-interactive Expo scripts:
- npm run healthcheck
- npm run start           # fixed port 8083, CI=1, no prompts
- npm run start:port      # override: PORT=8090 npm run start:port
- npm run web             # web target on 8083, CI=1
- npm run web:healthcheck # web variant with non-interactive fixed port

If you need native artifacts, use EAS Build or eject to a bare workflow first.
