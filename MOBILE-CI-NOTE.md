# Mobile CI Note

The ReactOTTMobileApp is built with the Expo managed workflow and does not include `./gradlew`.

If your CI attempts to run Gradle tasks, switch to the provided Expo CI script:
- bash ./ci-run-mobile-check.sh

This script installs dependencies, sets CI=1 (non-interactive), and performs a brief Expo healthcheck without starting a long-running process.
