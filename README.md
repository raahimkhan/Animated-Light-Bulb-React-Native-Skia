# 💡 React Native Skia Animated Light Bulb

An animated swinging light bulb built entirely with [React Native Skia](https://shopify.github.io/react-native-skia/).  
No external images, SVGs, or animation libraries used. I purely utilized Skia along with a touch of math and logic.

## 📦 Installation and Run Instructions

1. Clone the repository

2. Navigate to the cloned directory

3. Install node modules: `npm install` or `npm install --force` if dependencies issues arise

4. For EAS cloud build, use the following command to generate iOS simulator and Android emulator
development builds: `eas build --profile development --platform all`

5. If you prefer local builds, then execute the command `npm run prebuild` to generate the `android` and
`ios` native directories. After that execute the commands `npm run ios` and `npm run android`
to generate iOS simulator and Android emulator development builds

**Note:** If you are going with local builds, then make sure to follow the [Skia Installation Instructions for Android and iOS Local Builds](https://shopify.github.io/react-native-skia/docs/getting-started/installation/)
