import { httpsCallable } from 'firebase/functions';
import { getFunctions } from 'firebase/functions';

const functions = getFunctions();
const checkIfAdmin = httpsCallable(functions, 'checkIfAdmin');

export const callCheckIfAdmin = async (userInfo: any) => {
    try {
        const response = await checkIfAdmin(userInfo);
        return response.data
    } catch (error) {
        console.error('Error calling checkIfAdmin:', error);
        return false;
    }
};
