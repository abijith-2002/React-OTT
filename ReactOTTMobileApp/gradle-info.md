This repository is an Expo-managed React Native app. There is intentionally no Gradle wrapper here.

If your CI tries to run `./gradlew`, adjust it to:
- Use `CI=1 npm ci && CI=1 npm run start` for development server checks, or
- Use Expo Application Services (EAS) for native builds instead of invoking Gradle directly.

Reason: Expo managed workflow abstracts native projects until ejecting or using EAS build.
