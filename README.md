# Project Repository

This is the initial README file for the project.

## Note on Expo Managed Workflow

This project uses Expo (JavaScript/TypeScript managed workflow) for React Native.  
- Expo projects do **not** have a `gradlew` file or Android native folder by default.
- All builds, runs, and tests are handled via `expo` commands (`npm start`, `expo start`, etc.).
- If you see errors about missing `./gradlew`, they can be ignored unless you are attempting a bare workflow or ejecting from Expo.

CI/mobile analysis tools that expect a Gradle build may report: `./gradlew: No such file or directory`. This is expected for an Expo-managed app and not an error condition for running the app. Use:
- `CI=1 npm ci` (or `npm install`) to install deps
- `CI=1 npm run start` to launch the Expo dev server in non-interactive mode
- `CI=1 npm run web` to run the web target non-interactively
- For Android/iOS via Expo Go on devices/simulators: `CI=1 npm run android` or `CI=1 npm run ios`