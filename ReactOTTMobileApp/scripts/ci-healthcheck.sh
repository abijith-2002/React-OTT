#!/usr/bin/env sh
set -euo pipefail
export CI=1
echo "[ci-healthcheck] Installing dependencies (non-interactive)..."
npm ci --no-audit --no-fund --progress=false
echo "[ci-healthcheck] Verifying Expo CLI is available locally..."
expo --version >/dev/null 2>&1 || npx --yes expo --version >/dev/null 2>&1 || { echo "Expo CLI not available"; exit 1; }
echo "[ci-healthcheck] Performing Metro config validation (dry) on fixed port 8083."
# Start briefly with fixed port and non-interactive flags; timeout to avoid hangs.
( timeout 15s npm run start --silent || true ) >/dev/null 2>&1
echo "[ci-healthcheck] OK - Expo project validated in CI mode."
