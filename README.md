# Cohen's Bagelry Ordering System

This project is a web-based ordering system for Cohen's Bagelry. It allows users to place bagel orders online, integrates with Google reCAPTCHA for bot protection, and sends email confirmations to customers. The project is built with TypeScript, React, Firebase, and integrates with Gmail OAuth2 for secure email communication.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Deployment](#deployment)
- [Contact](#contact)

---

## Features

- User authentication via Firebase
- Email order confirmation using Gmail OAuth2
- reCAPTCHA Enterprise validation to prevent bots
- Dynamic quantity and price calculations
- Responsive user interface
- Token management using Google Cloud Secret Manager

---

## Project Structure

The project is divided into two parts: the **frontend** (React) and the **backend** (Firebase Functions).

## Frontend

```plaintext
/src
  ├── components
  │   ├── forms
  │   │   ├── DateTime.tsx
  │   │   ├── Email.tsx
  │   │   ├── Password.tsx
  │   │   ├── PhoneNumber.tsx
  │   │   ├── Quantity.tsx
  │   │   └── Submit.tsx
  │   ├── login
  │   │   ├── emailVerification
  |   |   |   └── EmailVerification.tsx
  │   │   ├── LoginWithEmailAndPassword.tsx
  │   │   ├── LoginWithGoogle.tsx
  │   │   └── LoginWithOnlyEmail.tsx
  │   ├── signUp
  |   |   └── SignUpWithEmail.tsx
  │   ├── Footer.tsx
  │   ├── Header.tsx
  │   └── OrderTablePopover.tsx
  ├── constants
  │   ├── Constants.tsx
  │   └── Types.tsx
  ├── pages
  │   ├── 404.tsx
  │   ├── About.tsx
  │   ├── Contact.tsx
  │   ├── Home.tsx
  │   └── OrderPage.tsx
  ├── router
  │   ├── GetPages.tsx
  │   └── Router.tsx
  ├── services
  │   ├── firebase
  │   │   ├── Calls.tsx
  │   │   └── Config.tsx
  │   └── providers
  │       └── User.tsx
  └── theme
      └── Base.tsx
```

## Backend

```plaintext
/functions
  ├── src
  │   ├── calls
  |   |   ├── sendOrderEmail.ts
  │   │   └── emailFormating
  │   │       └── EmailBody.ts
  │   ├── oAuthClient
  │   │   └── getOAuthClient.ts
  │   ├── utils
  │   │   └── tokenManagement.ts
  │   ├── validation
  │   │   └── verifyRecaptcha.ts
  │   └── index.ts
  ├── .eslintrc.js
  ├── .gitignore
  ├── package.json
  ├── tsconfig.json
  └── README.md (this file)

```
## Misc/Unused

```plaintext
/oauth2-script
  ├── generate-token.js
  └── package.json
```

## Requirements

- **Node.js:** Ensure you have Node.js (v14 or above) installed.
- **Firebase CLI:** Install the Firebase CLI globally using:
    
```bash
npm install -g firebase-tools
```

- For running the React frontend, Vite is used as the bundler.

```bash
npm install -g vite
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Cohens-Bagelry.git
cd Cohens-Bagelry
```

### Install dependencies:

```bash
# Install dependencies for the frontend
cd frontend
npm install

# Install dependencies for the Firebase functions
cd ../functions
npm install
```
### Environment Variables

- Set the Firebase environment variables:

```bash
firebase functions:config:set gmail.client_id="your-client-id" \
    gmail.client_secret="your-client-secret" \
    gmail.refresh_token="your-refresh-token" \
    gmail.email="your-email" \
    recaptcha.api_key="your-recaptcha-api-key"
```

## Running the App

### Start the React frontend:
In the frontend folder, run:

```bash
npm run dev
```

The app will be available at http://localhost:3000.

## Deployment
## Deploying the React App

- For production, build the React app:

```bash
npm run build
```

- Firebase Hosting:

```bash
firebase deploy --only hosting
```

## Contact

For questions or issues regarding the app, feel free to contact:
- Dev: Jay
- Email: ConanCod3s@gmail.com
