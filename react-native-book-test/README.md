# React Native Book API Test

This small Expo app tests the backend `GET /books` endpoint.

## Before running

Open `App.js` and replace:

```js
const BACKEND_URL = "http://192.168.1.100:5000";
```

with your backend URL.

- Physical phone: use your computer's local IPv4 address, not `localhost`.
- Android emulator: you can usually use `http://10.0.2.2:5000`.
- Deployed backend: use its full HTTPS URL.

## Run

```bash
npm install
npm start
```

Open the project with Expo Go and press **Load Books**.

The button calls `getBooks()`, which sends `GET /books`. Express matches that request with:

```js
bookRouter.get("/books", getBooks);
```
