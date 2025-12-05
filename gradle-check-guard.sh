#!/usr/bin/env sh
set -euo pipefail

echo "[gradle-check-guard] This is an Expo-managed app. Gradle wrapper is not included."
echo "[gradle-check-guard] Use Expo healthcheck instead. Running it for you now..."

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
bash "$SCRIPT_DIR/ci-use-expo-healthcheck.sh"

echo "[gradle-check-guard] Finished Expo healthcheck successfully."
exit 0
