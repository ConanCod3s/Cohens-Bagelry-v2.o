import { app } from './Config'
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
export const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6LczvB0qAAAAAL0fmB_SF-ThIHRkBwGjDSo_GqsI'),
    isTokenAutoRefreshEnabled: true
});