#!/usr/bin/env sh
set -euo pipefail

echo "[ci-mobile-check-override] Expo-managed app detected. Skipping any Gradle tasks."
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

bash "$SCRIPT_DIR/ci-run-expo-healthcheck.sh"

echo "[ci-mobile-check-override] Completed Expo healthcheck successfully."
exit 0
