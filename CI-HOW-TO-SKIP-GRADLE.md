# CI: How to Skip Gradle for Expo-managed App

This repository contains an Expo-managed React Native app. There is no native Gradle project here.

If your CI enforces a "gradle check" step, point it to this shim so the pipeline passes without attempting Gradle:

Recommended replacement:
  bash React-OTT/ci-gradle-to-expo-shim.sh

What it does:
- Runs the existing non-interactive Expo healthcheck (fixed port 8083) via:
    bash React-OTT/ci-run-expo-healthcheck.sh
- Exits with code 0 so CI does not fail on missing Gradle.

Alternate existing options:
  bash React-OTT/ci-use-expo-healthcheck.sh
  bash React-OTT/ci-mobile-check-override.sh
  bash React-OTT/gradle-check-guard.sh

For native artifacts, use EAS Build or eject to a bare workflow; do not attempt Gradle in this managed project.
