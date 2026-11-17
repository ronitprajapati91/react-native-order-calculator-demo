# DemoOrderCalc

A small React Native demo that shows how to share UI code while keeping business logic in native code. The order total (subtotal plus tax) is calculated in **Kotlin** on Android and **Swift** on iOS, and the screens are written in **TypeScript**.

## Features

- **Home**: enter a subtotal and tax rate to see the total, and save it to history
- **History**: list of saved totals (kept in memory only, cleared when the app closes)
- **Settings**: set the default tax rate used on the Home screen

## Project structure

```
DemoOrderCalc/
├── App.tsx                          # navigation setup
├── src/
│   ├── context/OrderContext.tsx     # in-memory state (tax default, history)
│   ├── hooks/useOrderTotal.ts       # calls the native calculation
│   ├── native/orderCalc.ts          # typed wrapper around the native module
│   └── screens/
│       ├── HomeScreen.tsx
│       ├── HistoryScreen.tsx
│       └── SettingsScreen.tsx
├── android/app/src/main/java/com/demoordercalc/
│   ├── OrderCalcModule.kt           # tax logic in Kotlin (BigDecimal, HALF_UP)
│   └── OrderCalcPackage.kt          # registers the module
└── ios/DemoOrderCalc/
    ├── OrderCalc.swift              # tax logic in Swift (NSDecimalNumber)
    └── OrderCalc.m                  # exposes the Swift class to React Native
```

## How it works

1. The screen calls `useOrderTotal` with the subtotal and tax rate.
2. The hook calls `calculateTotal` in `src/native/orderCalc.ts`.
3. That calls the native module on each platform, which returns the total rounded to two decimals.

Money math is done with decimal types (`BigDecimal` on Android, `NSDecimalNumber` on iOS), not floating-point numbers.

## Requirements

- Node.js (LTS)
- Xcode and CocoaPods (for iOS)
- Android Studio with an Android emulator or a device with USB debugging on (for Android)

Follow the [React Native environment setup guide](https://reactnative.dev/docs/set-up-your-environment) if you haven't set these up.

## Getting started

```bash
git clone <your-repo-url>
cd DemoOrderCalc
npm install
```

### Android

```bash
npx react-native run-android
```

### iOS

```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

If the app shows **"OrderCalc native module not found"**, the native code isn't registered. Do a full rebuild (not a Metro reload) and check that the native files are included in the build.

## Notes

- Data is kept in memory only. Closing the app clears the history and resets the default tax.
- This is a demo, so there are no tests or input validation beyond rejecting negative numbers in the native code.