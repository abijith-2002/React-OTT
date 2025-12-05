# Gradle Guard (Expo Managed Repository)

This repository hosts an Expo-managed app and intentionally does not include native Gradle projects.

If your CI or tooling attempts to run a Gradle build, use these instead:
- bash React-OTT/ci-use-expo-healthcheck.sh
- bash React-OTT/ci-run-expo-healthcheck.sh
- bash React-OTT/ci-gradle-check.sh
- bash React-OTT/gradle-ci-guard.sh

For convenience, these guard shims are present:
- React-OTT/gradlew and React-OTT/gradlew.bat: print guidance and exit with code 2
- React-OTT/build.gradle: fails fast with a clear message, pointing to the correct scripts

For native artifacts, use EAS Build or eject to a bare workflow.
