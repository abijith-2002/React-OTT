#!/usr/bin/env sh
set -euo pipefail

echo "[root-healthcheck] Starting Expo non-interactive healthcheck..."
cd "$(dirname "$0")/ReactOTTMobileApp"

export CI=1
echo "[root-healthcheck] Installing dependencies (non-interactive)..."
npm ci --no-audit --no-fund --progress=false

echo "[root-healthcheck] Running Expo CI healthcheck..."
sh ./scripts/ci-healthcheck.sh

echo "[root-healthcheck] Completed Expo healthcheck successfully."
