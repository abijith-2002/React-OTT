# Mobile CI README (Expo Managed App)

This repository contains an Expo-managed React Native app at:
- React-OTT/ReactOTTMobileApp

Important:
- There is no Gradle wrapper (`./gradlew`) or native android/ios projects by default.
- Any CI step that runs a Gradle check will fail by design.

Use the non-interactive Expo healthcheck instead of Gradle:
- From repository root:
  bash React-OTT/ci-run-expo-healthcheck.sh

Convenience CI entrypoints (use any one):
- bash React-OTT/ci-use-expo-healthcheck.sh
- bash React-OTT/ci-mobile-skip-gradle-and-healthcheck.sh
- bash React-OTT/ci-mobile-check-override.sh
- bash React-OTT/gradle-check-guard.sh

What these scripts do:
- Set CI=1 for non-interactive mode.
- Install dependencies with: npm ci --no-audit --no-fund --progress=false
- Run a brief Expo healthcheck via React-OTT/ReactOTTMobileApp/scripts/ci-healthcheck.sh
- Avoids starting long-running processes and avoids interactive prompts.

If your CI previously called a "gradle check" step, replace it with one of the scripts above.
For native builds, use EAS Build or eject to the bare workflow; do not invoke `./gradlew` here.
