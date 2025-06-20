# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Clone the repository
git clone <repo-url>

2. Install dependencies
Install Node JS from this link
[Node JS](https://nodejs.org/en)

```bash
npm install
```

3. Initialize firebase
```bash
firebase init
```

4. Set up a local secret (XAI API KEY from grok 3)
```bash
firebase functions:secrets:set XAI_API_KEY
```

- enter your xAI API key from https://x.ai/api

5. Open 2 terminals & Start the app

- On first terminal
```bash
firebase emulators:start
```

-on second terminal
```bash
npx expo start
```
   OR
```
npm run start
```

6. Test the App
For Web Testing
- Type the local host link into your preferred browser (e.g. http://localhost:8081)

For Mobile Testing
- Download Expo Go app from App Store/Google Play Store
On IOS
- Scan the QR code from the camera app and it will load in the Expo Go app
On Andriod
- Open the Expo Go app on your Android device
- Select the "Open in Expo Go" option or tap on "Scan QR Code". 
