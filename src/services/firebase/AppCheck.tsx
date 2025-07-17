import {app} from './Config'
import {initializeAppCheck, ReCaptchaEnterpriseProvider} from "firebase/app-check";

export const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider('6LcXhx0qAAAAALl55axxthrjssNtH6N6hP4TzJh1'),
    isTokenAutoRefreshEnabled: true
});