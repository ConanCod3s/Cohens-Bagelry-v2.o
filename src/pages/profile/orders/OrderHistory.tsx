import {useEffect, useState} from 'react';
import {Box, CircularProgress, Grid, Typography,} from '@mui/material';
import {OrderType} from '../../../utils/constants/Types.tsx';
import {getCollection} from '../../../services/firebase/Calls.tsx';
import {callCheckIfAdmin} from '../../../services/firebase/httpsCallables/AdminCheck.tsx';
import {useUser} from '../../../services/providers/User.tsx';
import OrderCard from "./OrderCard.tsx";

export default function OrderHistory() {
    const {userInfo, loggedIn} = useUser();
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            if (loggedIn && userInfo) {
                try {
                    setLoading(true);

                    const adminStatus = await callCheckIfAdmin(userInfo.uid as string);
                    setIsAdmin(Boolean(adminStatus));

                    const ordersData = await getCollection({ collection: 'orders' });

                    const sortedOrders = ordersData.sort((a, b) => {
                        const orderIdA = a.orderId.substring(3);
                        const orderIdB = b.orderId.substring(3);
                        return orderIdA.localeCompare(orderIdB);
                    });

                    setOrders(sortedOrders);
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [loggedIn, userInfo]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress/>
            </Box>
        );
    }

    if (orders.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography>No orders found</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{padding: 2}}>
            <Grid container spacing={2}>
                {orders.map((order) => (
                    <OrderCard key={order.orderId} order={order} isAdmin={isAdmin}/>
                ))}
            </Grid>
        </Box>
    );
}