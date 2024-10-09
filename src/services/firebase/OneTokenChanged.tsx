import { appCheck } from "./AppCheck";
import { onTokenChanged } from "firebase/app-check";

export default onTokenChanged(appCheck, (token) => {
    if (token) {
        console.log("App Check token updated:", token);
    } else {
        console.error("App Check token is missing or invalid.");
    }
}, (error) => {
    console.error("Error with App Check token update:", error);
});
