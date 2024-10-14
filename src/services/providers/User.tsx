import { createContext, useContext, useState, useEffect } from 'react';
import { auth, getDocumentById } from '../firebase/Calls';
import { onAuthStateChanged } from "firebase/auth";
import { UserInfoType, UserContextType, UserProviderType } from '../../utils/constants/Types';
import { useSnackbar } from 'notistack';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderType) => {
    const [loggedIn, setLogin] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
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