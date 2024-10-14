import { httpsCallable } from 'firebase/functions';
import { getFunctions } from 'firebase/functions';

const functions = getFunctions();
const checkIfAdmin = httpsCallable(functions, 'checkIfAdmin');

export const callCheckIfAdmin = async (uid: any) => {
    try {
        const response = await checkIfAdmin(uid);
        return response.data
    } catch (error) {
        return false;
    }
};
