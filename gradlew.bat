@echo off
setlocal enabledelayedexpansion
echo [gradlew] Expo-managed app detected (no native Gradle project).
echo [gradlew] Redirecting to non-interactive Expo healthcheck...
bash React-OTT/ci-run-expo-healthcheck.sh
if errorlevel 1 (
  echo [gradlew] Healthcheck failed. See logs above.
  exit /b 1
)
echo [gradlew] Healthcheck succeeded. Skipping Gradle by design. Exiting 0.
exit /b 0
