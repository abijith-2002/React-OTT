#!/usr/bin/env sh
# Purpose: If CI insists on invoking a "gradle check" for the mobile app, use this shim instead.
# It redirects to the non-interactive Expo healthcheck and exits with success.
set -euo pipefail

echo "[ci-gradle-to-expo-shim] Expo-managed app detected (no native Gradle project)."
echo "[ci-gradle-to-expo-shim] Running non-interactive Expo healthcheck instead of Gradle..."

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
bash "$SCRIPT_DIR/ci-run-expo-healthcheck.sh"

echo "[ci-gradle-to-expo-shim] Healthcheck completed successfully. Skipping Gradle by design."
exit 0
