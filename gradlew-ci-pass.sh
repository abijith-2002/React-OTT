#!/usr/bin/env sh
# Gradle CI Pass-Through for Expo-managed app.
# Some CI providers insist on calling a Gradle wrapper. This script provides
# guidance and runs the Expo healthcheck, then exits with 0 to avoid false failures.
set -euo pipefail

echo "[gradlew-ci-pass] Expo-managed app detected (no native Gradle project)."
echo "[gradlew-ci-pass] Running Expo non-interactive healthcheck instead of Gradle..."
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
bash "$SCRIPT_DIR/ci-run-expo-healthcheck.sh"

echo "[gradlew-ci-pass] Healthcheck OK. Skipping Gradle by design. Exiting successfully."
exit 0
