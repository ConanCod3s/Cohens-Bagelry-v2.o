// Import necessary Firebase services and functions
import "firebase/auth";
import { app } from "./Config";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { GoogleAuthProvider, getAuth, sendEmailVerification, signOut } from "firebase/auth";
import { getFirestore, collection, setDoc, doc, getDoc, getCountFromServer, getDocs } from "firebase/firestore";

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

// Initialize global variables
export const staff: any[] = [];
export const users: any[] = [];
export const events: any[] = [];
export const athletes: any[] = [];
export const downloadedItems: any[] = [];
export let appImages: string[] = [];

// Fetch application images
export const getAppImages = async () => {
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

    const promises = urls.map(getURL);
    appImages = await Promise.all(promises);
}

// Sign out the current user
export const signUserOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Error signing out:', error);
    }
};

// Get the download URL for a given image path
export const getURL = async (imgPath: string): Promise<string> => {
    const storageRef = ref(storage, imgPath);

    try {
        return await getDownloadURL(storageRef);
    } catch (error) {
        console.error('Error getting download URL:', error);
        return "";
    }
}

export const setUserProfile = async ({ collectionName, docId, props }: {
    collectionName: string,
    docId: string,
    props: object
}) => {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) await setDoc(docRef, { ...props }, { merge: true });
    else await setDoc(docRef, { ...props });
}

export const setFireBaseDoc = async ({ collectionName, docId, props }: {
    collectionName: string,
    docId?: string,
    props: any
}) => {
    try {
        if (!docId) {
            const newRef = doc(collection(db, collectionName));
            const data = collectionName === "customers" ? { uid: newRef.id, ...props } : props;
            await setDoc(newRef, data);
        } else {
            await setDoc(doc(db, collectionName, docId), props);
        }
    } catch (error) {
        console.error('Error setting document:', error);
    }
}

// Get a document from Firestore by its ID
export const getDocumentById = async ({ collectionName, docId }: {
    collectionName: string,
    docId: string
}) => {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch (error) {
        console.error('Error getting document:', error);
        throw error;
    }
}

// Get the count of documents in a collection
export const getCount = async (collectionName: string) => {
    try {
        const countSnapshot = await getCountFromServer(collection(db, collectionName));
        return countSnapshot.data().count;
    } catch (error) {
        console.error('Error getting document count:', error);
        return 0;
    }
}

// Retrieve all documents from a collection
export const getCollection = async (collectionName: string) => {
    try {
        const snapshot = await getDocs(collection(db, collectionName));
        return snapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error('Error getting collection:', error);
        return [];
    }
}

export const emailVerification = async () => {
    const user = auth.currentUser;
    let isSuccessfull: boolean = false;

    if (user) {
        try {
            await sendEmailVerification(user);
            console.log('Verification email sent successfully');
            isSuccessfull = !isSuccessfull
        } catch (error) {
            console.error('Error sending verification email:', error);
        }
    } else {
        console.error('No user is currently signed in');
    }
    return isSuccessfull;
};


export { auth, db, googleProvider, storage };
