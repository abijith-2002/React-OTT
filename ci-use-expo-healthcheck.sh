#!/usr/bin/env sh
set -euo pipefail

echo "[ci-use-expo-healthcheck] Detected Expo-managed app (no Gradle)."
echo "[ci-use-expo-healthcheck] Running non-interactive Expo healthcheck instead of any Gradle task."

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

bash "$SCRIPT_DIR/ci-run-expo-healthcheck.sh"

echo "[ci-use-expo-healthcheck] Completed Expo healthcheck successfully."
