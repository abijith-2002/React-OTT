# CI Notes (Expo Managed)

- Do NOT invoke `./gradlew`. This project is Expo-managed and has no native Android/iOS projects by default.
- Use:
  - `CI=1 npm ci`
  - `CI=1 npm run start` (Metro server; non-interactive)
  - `CI=1 npm run web` (web target; non-interactive)
- If native builds are required, use EAS Build or eject to bare workflow first.

A dummy `gradlew` is included to fail fast with a clear message if mistakenly invoked.
