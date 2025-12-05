# Mobile CI Note

The ReactOTTMobileApp is built with the Expo managed workflow and does not include `./gradlew`.

If your CI attempts to run Gradle tasks, switch to the provided Expo CI script:
- bash ./ci-run-mobile-check.sh

This script installs dependencies, sets CI=1 (non-interactive), and performs a brief Expo healthcheck without starting a long-running process.

If you see: `Error running gradle check` or `./gradlew: No such file or directory`, update your pipeline to use:
- cd React-OTT/ReactOTTMobileApp
- CI=1 npm ci --no-audit --no-fund --progress=false
- CI=1 sh ./scripts/ci-healthcheck.sh
