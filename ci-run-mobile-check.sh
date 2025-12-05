#!/usr/bin/env sh
set -euo pipefail

echo "[ci-run-mobile-check] ReactOTTMobileApp is Expo-managed (no Gradle)."
echo "[ci-run-mobile-check] Redirecting CI check to Expo non-interactive healthcheck."

cd "$(dirname "$0")/ReactOTTMobileApp"

export CI=1
echo "[ci-run-mobile-check] Installing dependencies..."
npm ci --no-audit --no-fund --progress=false

echo "[ci-run-mobile-check] Running Expo CI healthcheck..."
sh ./scripts/ci-healthcheck.sh

echo "[ci-run-mobile-check] Completed Expo healthcheck successfully."
