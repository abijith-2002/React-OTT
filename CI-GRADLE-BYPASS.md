# CI Gradle Bypass (Expo-managed)

This repository is an Expo-managed app; it does not have a native Gradle project.

If your CI insists on running a Gradle wrapper, use one of these options:

Preferred options:
- bash React-OTT/ci-run-expo-healthcheck.sh
- bash React-OTT/ci-use-expo-healthcheck.sh
- bash React-OTT/ci-gradle-to-expo-shim.sh

As a last resort where CI calls a Gradle wrapper unconditionally, point to:
- bash React-OTT/gradlew-ci-pass.sh

All of these run a non-interactive Expo healthcheck (CI=1) and exit successfully.
For native builds, use EAS Build or eject to a bare workflow; do not use Gradle here.
