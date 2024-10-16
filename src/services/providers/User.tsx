import { createContext, useContext, useState, useEffect } from 'react';
import { auth, getDocumentById } from '../firebase/Calls';
import { getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import { UserInfoType, UserContextType, UserProviderType } from '../../utils/constants/Types';
import { useSnackbar } from 'notistack';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderType) => {
    const [loggedIn, setLogin] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const handleRedirect = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    const user = result.user;
                    setUserInfo({
                        uid: user.uid,
                        firstName: null,
                        lastName: null,
                        displayName: user.displayName,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                    });
                    setLogin(true);
                } else {
                    console.warn('No redirect result, possible state issue.');
                }
            } catch (error) {
                console.error('Error handling redirect:', error);
                enqueueSnackbar('Authentication process failed. Please try logging in again.', { variant: 'error' });
            }
        };

        handleRedirect().then(() => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    try {
                        const userData = await getDocumentById({
                            collectionName: 'customers',
                            docId: user.uid,
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

            return () => unsubscribe();
        }).catch((error) => {
            console.error('Unexpected error during handleRedirect:', error);
        });
    }, [enqueueSnackbar]);

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
