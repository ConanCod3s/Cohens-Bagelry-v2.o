import {getFunctions, httpsCallable} from 'firebase/functions';

const functions = getFunctions();
const checkIfAdmin = httpsCallable(functions, 'checkIfAdmin');

export const callCheckIfAdmin = async (uid: string) => {
    try {
        const response = await checkIfAdmin(uid);
        return response.data
    } catch (error) {
        return false;
    }
};
