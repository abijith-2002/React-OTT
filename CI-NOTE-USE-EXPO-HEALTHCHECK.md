# CI Note: Use Expo Healthcheck (No Gradle)

This repository contains an Expo-managed app under `React-OTT/ReactOTTMobileApp`.
There is no native Gradle project or wrapper for CI to use by default.

Use one of these non-interactive healthcheck scripts instead of any Gradle step:
- bash React-OTT/ci-use-expo-healthcheck.sh
- bash React-OTT/ci-run-expo-healthcheck.sh
- bash React-OTT/ci-mobile-check-override.sh
- bash React-OTT/ci-gradle-check.sh   (alias for CI that expects a 'gradle check' task)

These scripts:
- set CI=1 (fully non-interactive)
- install dependencies with npm ci (non-interactive)
- validate the Expo project quickly without starting a long-running server
- avoid any prompts about ports by using a fixed port (8083) with an override via PORT when needed
