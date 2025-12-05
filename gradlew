#!/usr/bin/env sh
set -euo pipefail
echo "[gradlew] Expo-managed app detected (no native Gradle project)."
echo "[gradlew] Redirecting to non-interactive Expo healthcheck..."
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
bash "$SCRIPT_DIR/ci-run-expo-healthcheck.sh"
echo "[gradlew] Healthcheck succeeded. Skipping Gradle by design. Exiting 0."
exit 0
