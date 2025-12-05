# CI Guard for Expo-managed App

This project is Expo-managed; there is no Gradle wrapper in this repository.

If your CI expects to run a "Gradle check" step, replace that step with:

- bash React-OTT/ci-mobile-skip-gradle-and-healthcheck.sh

What it does:
- Prints a clear notice that Gradle is not applicable.
- Runs the non-interactive Expo healthcheck to validate the app can start.
- Exits with code 0 when successful.

If you truly need native build artifacts, use EAS Build or eject to the bare workflow first.
