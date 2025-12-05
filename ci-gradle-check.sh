#!/usr/bin/env sh
# Alias used by CI systems that expect to run a "gradle check".
# In this Expo-managed app, redirect to the non-interactive Expo healthcheck.
set -euo pipefail

echo "[ci-gradle-check] Expo-managed app detected (no native Gradle build)."
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
bash "$SCRIPT_DIR/ci-use-expo-healthcheck.sh"

echo "[ci-gradle-check] Completed Expo healthcheck successfully. Gradle step skipped by design."
exit 0
