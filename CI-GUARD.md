# CI Guard for Expo-managed App (Root)

This workspace contains an Expo-managed app at React-OTT/ReactOTTMobileApp.

- There is no Gradle wrapper (`./gradlew`) or native `android/ios` folders here by design.
- Do NOT run any Gradle tasks in CI for this container.

Use the non-interactive Expo healthcheck instead:

Quick start (from workspace root):
  bash React-OTT/ci-run-expo-healthcheck.sh

Or run inside the app folder:
  cd React-OTT/ReactOTTMobileApp
  export CI=1
  npm ci --no-audit --no-fund --progress=false
  CI=1 sh ./scripts/ci-healthcheck.sh

Non-interactive starts (fixed port to avoid prompts):
  npm run start           # starts on 8083 (CI=1)
  npm run web             # web target on 8083 (CI=1)
  PORT=8090 npm run start:port  # override the port if needed (CI=1)

If your CI system still attempts a "gradle check", configure it to skip Gradle for this project and invoke the healthcheck above. Native builds should use EAS Build or an ejected (bare) workflow.
