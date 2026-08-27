# ClinikAI OS – Mobile App




This repository contains the **ClinikAI OS mobile application** built with Expo and React Native.

> **Current status:** Proof of Concept (POC) / early development  
> The application is actively being developed, so some screens and features are not connected to the backend yet.

## 1. What you need

Install:

- Node.js 20 or later
- npm
- Git
- VS Code (recommended)

Check your versions:

```powershell
node -v
npm -v
```

The current development environment uses:

```text
Node.js v20.20.2
npm 10.8.2
```

## 2. Get the project

If using Git:

```powershell
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd clinikai-mobile
```

If the project is already on your computer, open the `clinikai-mobile` folder in VS Code.

## 3. Install dependencies

Run from the project root:

```powershell
npm install
```

## 4. Start ClinikAI OS

```powershell
npx expo start
```

Expo will show a QR code and terminal shortcuts.

```text
a  → Android
w  → Web
r  → Reload
j  → Debugger
```

## 5. Run on Android

### Physical Android phone

1. Install Expo Go.
2. Connect the phone and computer to the same Wi-Fi.
3. Run:

```powershell
npx expo start
```

4. Scan the QR code with Expo Go.

### Android Emulator

Make sure an Android emulator is configured, then run:

```powershell
npx expo start
```

and press:

```text
a
```

## 6. Run on iOS

You can test with Expo Go on an iPhone.

For native iOS builds, a macOS environment is required.

## 7. Run on the web

Run:

```powershell
npx expo start
```

and press:

```text
w
```

The main target is Android/iOS; web is useful for quick UI testing.

## 8. Current project structure

```text
clinikai-mobile/
│
├── assets/
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── (auth)/
│   │       ├── register.tsx
│   │       ├── login.tsx
│   │       └── verify-otp.tsx
│   │
│   ├── features/
│   │   └── authentication/
│   │       ├── types/
│   │       │   └── patient-registration.types.ts
│   │       └── validation/
│   │           └── patient-registration.validation.ts
│   │
│   └── ...
│
├── app.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

The structure will grow as ClinikAI OS features are implemented.

## 9. Current application flow

The current POC is being developed around:

```text
Welcome Screen
      │
      ├── Get Started
      │       ↓
      │   Registration
      │       ↓
      │   OTP Verification
      │
      └── Login
```

Patient registration currently includes:

- Full name
- Mobile number
- Email address
- Date of birth
- Terms/consent acknowledgement

Client-side validation is implemented. Backend authentication and OTP services will be connected later.

## 10. TypeScript check

Before committing work, run:

```powershell
npx tsc --noEmit
```

The goal is:

```text
Found 0 errors.
```
