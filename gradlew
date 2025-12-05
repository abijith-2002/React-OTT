#!/usr/bin/env sh
echo "[gradlew] This repository is an Expo-managed app and does not include a real Gradle wrapper."
echo "[gradlew] Do NOT run Gradle tasks here."
echo "[gradlew] Use the non-interactive Expo healthcheck instead:"
echo "  bash React-OTT/ci-use-expo-healthcheck.sh"
echo "  # or"
echo "  bash React-OTT/ci-run-expo-healthcheck.sh"
echo ""
echo "[gradlew] For native builds, use EAS Build or eject to a bare workflow."
exit 2
