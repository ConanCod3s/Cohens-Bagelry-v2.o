// services/firebase/authService.js

import { auth, googleProvider } from './Calls';
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';

export const handleFirebaseRedirectResult = async () => {
    return await getRedirectResult(auth);
};

export const loginWithGoogleRedirect = async () => {
    // await setPersistence(auth, browserLocalPersistence);
    return signInWithRedirect(auth, googleProvider);
};
