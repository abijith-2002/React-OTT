#!/usr/bin/env sh
# Guard script to prevent erroneous Gradle checks for an Expo-managed app.
# Redirects CI to the non-interactive Expo healthcheck and exits successfully.
set -euo pipefail

echo "[gradle-ci-guard] Expo-managed app detected. Gradle wrapper is intentionally not included."
echo "[gradle-ci-guard] Running Expo non-interactive healthcheck instead of any Gradle task..."

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
bash "$SCRIPT_DIR/ci-use-expo-healthcheck.sh"

echo "[gradle-ci-guard] Expo healthcheck completed successfully. Skipping Gradle as intended."
exit 0
