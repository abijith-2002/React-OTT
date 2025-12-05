# CI Usage (Workspace Root)

This repository contains an Expo-managed mobile app in `React-OTT/ReactOTTMobileApp`. There is no Gradle wrapper (`./gradlew`) or native projects by default.

Use the provided helper to run a quick non-interactive healthcheck:
- bash React-OTT/ci-run-expo-healthcheck.sh

Alternatively, from inside React-OTT/ReactOTTMobileApp you can run:
- npm run healthcheck
- npm run start           # non-interactive on fixed port 8083 (CI=1)
- npm run start:port      # PORT=8090 npm run start:port to override port (CI=1)
- npm run web             # non-interactive web target on fixed port (CI=1)

Equivalent manual steps:
- cd React-OTT/ReactOTTMobileApp
- export CI=1
- npm ci --no-audit --no-fund --progress=false
- CI=1 sh ./scripts/ci-healthcheck.sh

If your pipeline previously attempted a Gradle task and failed with:
- `Error running gradle check`
- `./gradlew: No such file or directory`
then switch to the steps above or use EAS Build for native artifacts. Do not run `./gradlew`; it is intentionally absent in an Expo-managed project.
