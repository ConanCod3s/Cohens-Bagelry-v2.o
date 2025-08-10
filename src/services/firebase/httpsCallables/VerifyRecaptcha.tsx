import {getFunctions, httpsCallable} from 'firebase/functions';

const functions = getFunctions();
const verifyRecaptcha = httpsCallable(functions, 'verifyRecaptcha');

export const callVerifyRecaptcha = async (token: any) => {
    try {
        const response: any = await verifyRecaptcha(token);
        return response.data.success
    } catch (error) {
        console.error('Error calling verifyRecaptcha:', error);
        return false;
    }
};