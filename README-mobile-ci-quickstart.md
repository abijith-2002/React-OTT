# Mobile CI Quickstart (Expo Managed)

This app is Expo-managed (no ./gradlew). Do not run Gradle tasks.

Run the non-interactive Expo healthcheck instead:
  bash React-OTT/ci-use-expo-healthcheck.sh

If your CI must call a "gradle check" placeholder, point it to:
  bash React-OTT/gradle-check-guard.sh

For native artifacts, use EAS Build or eject to a bare workflow first.
