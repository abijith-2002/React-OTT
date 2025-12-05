#!/usr/bin/env sh
set -euo pipefail

echo "[ci-mobile] This is an Expo-managed app. Gradle wrapper is not included."
echo "[ci-mobile] Skipping Gradle checks and running Expo healthcheck instead."

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Run the existing non-interactive healthcheck
bash "$SCRIPT_DIR/ci-run-expo-healthcheck.sh"

echo "[ci-mobile] Completed Expo healthcheck successfully. Skipped Gradle as intended."
exit 0
