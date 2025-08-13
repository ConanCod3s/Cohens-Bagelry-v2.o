import "firebase/auth";
import {app} from "./Config";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {getAuth, sendEmailVerification, signOut} from "firebase/auth";
import {
    collection,
    doc,
    getCountFromServer,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    where,
    deleteDoc
} from "firebase/firestore";

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export const AppImages: string[] = []

const urls = [
    "gs://cohens-bagelry-8c701.appspot.com/Step_1.jpg",
    "gs://cohens-bagelry-8c701.appspot.com/Step_2.jpg",
    "gs://cohens-bagelry-8c701.appspot.com/Step_3.jpg",
    "gs://cohens-bagelry-8c701.appspot.com/Step_4.jpg",
    "gs://cohens-bagelry-8c701.appspot.com/Step_5.1.jpg",
    "gs://cohens-bagelry-8c701.appspot.com/Step_5.2.jpg",
    "gs://cohens-bagelry-8c701.appspot.com/Step_6.jpg",
    "gs://cohens-bagelry-8c701.appspot.com/Step_7.1.jpg",
    "gs://cohens-bagelry-8c701.appspot.com/Step_7.2.jpg",
    "gs://cohens-bagelry-8c701.appspot.com/Step_8.1.jpg",
    "gs://cohens-bagelry-8c701.appspot.com/Step_8.2.jpg",
];

let cache: string[] | null = null;
let inFlight: Promise<string[]> | null = null;

export async function getAppImages(): Promise<string[]> {
    if (cache) return cache;
    if (inFlight) return inFlight;

    inFlight = Promise.all(urls.map((u) => getDownloadURL(ref(storage, u))))
        .then((downloadUrls) => {
            AppImages.splice(0, AppImages.length, ...downloadUrls);
            cache = AppImages;
            return cache;
        })
        .catch((err) => {
            console.error("Error fetching application images:", err);
            cache = null;
            throw err;
        })
        .finally(() => {
            inFlight = null;
        });

    return inFlight;
}

export const handleDelete = async (
    {
        id
    }: {
        id: string;
    }): Promise<void> => {

    try {
        await deleteDoc(doc(db, "orders", id));
    } catch (error) {
        console.error("Error deleting order: ", error);
    }
};

export const signUserOut = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

export const checkDocumentExists = async (
    {
        collectionName,
        documentId,
    }: {
        collectionName: string;
        documentId: string;
    }): Promise<boolean | null> => {
    try {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);

        return !!docSnap.exists();

    } catch (error) {
        console.error('Error checking document:', error);
        throw new Error('Error checking document existence');
    }
}

export const getDocIdByField = async (
    {
        collectionName,
        fieldName,
        value,
    }: {
        collectionName: string;
        fieldName: string;
        value: any;
    }): Promise<string | null> => {
    try {
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, where(fieldName, "==", value));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) return querySnapshot.docs[0].id;
        else return null;

    } catch (error) {
        console.error(`Error fetching document by ${fieldName}:`, error);
        return null;
    }
};

export const setFireBaseDoc = async (
    {
        collectionName,
        docId,
        props,
    }: {
        collectionName: string;
        docId?: string;
        props: any;
    }): Promise<void> => {
    try {
        if (!docId) {
            const newRef = doc(collection(db, collectionName));
            const data = collectionName === "customers" ? {uid: newRef.id, ...props} : props;
            await setDoc(newRef, data, {merge: true});
        } else {
            await setDoc(doc(db, collectionName, docId), props, {merge: true});
        }
    } catch (error) {
        console.error(`Error setting document in ${collectionName} collection:`, error);
    }
};

export const getDocumentById = async (
    {
        collectionName,
        docId,
    }: {
        collectionName: string;
        docId: string;
    }): Promise<any> => {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error(`Error getting document from ${collectionName} collection:`, error);
        throw error;
    }
};

export const getCount = async (collectionName: string): Promise<number> => {
    try {
        const countSnapshot = await getCountFromServer(collection(db, collectionName));
        return countSnapshot.data().count;
    } catch (error) {
        console.error(`Error getting document count from ${collectionName} collection:`, error);
        return 0;
    }
};

export const getCollection = async (collectionName: string): Promise<any[]> => {
    try {
        const snapshot = await getDocs(collection(db, collectionName));
        return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    } catch (error) {
        console.error(`Error getting collection from ${collectionName} collection:`, error);
        return [];
    }
};

export const emailVerification = async (): Promise<boolean> => {
    const user = auth.currentUser;

    if (user) {
        try {
            await sendEmailVerification(user);
            console.log("Verification email sent successfully");
            return true;
        } catch (error) {
            console.error("Error sending verification email:", error);
        }
    } else {
        console.error("No user is currently signed in");
    }
    return false;
};

export {auth, db, storage};