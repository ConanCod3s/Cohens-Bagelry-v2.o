import { createContext, useContext, useState, useEffect } from 'react';
import { auth, getDocumentById } from '../firebase/Calls';
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { UserInfoType, UserContextType, UserProviderType } from '../../utils/constants/Types';
import { useSnackbar } from 'notistack';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderType) => {
    const [loggedIn, setLogin] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
    const { enqueueSnackbar } = useSnackbar();



    useEffect(() => {

    }, []);

    useEffect(() => {
        const handleRedirect = async () => {
            try {
                const result = await getRedirectResult(auth);
                console.log('**************result', result)
                if (result) {
                    // User is signed in, handle the result
                    const user = result.user;
                    console.log('User logged in:', user);
                }
            } catch (error) {
                console.error('Error handling redirect:', error);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userData = await getDocumentById({
                        collectionName: 'customers',
                        docId: user.uid
                    });
                    setLogin(true);
                    setUserInfo(userData as UserInfoType);
                } catch (error) {
                    enqueueSnackbar('Error fetching user data.', { variant: 'error' });
                    setLogin(false);
                    setUserInfo(null);
                }
            } else {
                setLogin(false);
                setUserInfo(null);
            }
        });

        handleRedirect();

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ loggedIn, userInfo }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};