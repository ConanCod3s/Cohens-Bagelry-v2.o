import { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Grid,
    Stack,
} from '@mui/material';
import { OrderType } from '../../utils/constants/Types';
import { getCollection } from '../../services/firebase/Calls';
import { callCheckIfAdmin } from '../../services/firebase/httpsCallables/AdminCheck';
import { useUser } from '../../services/providers/User';
import ConfirmOrder from './admin/ConfirmOrder';

const isValidOrder = (data: any): data is OrderType => {
    return data && typeof data.orderId === 'string' && Array.isArray(data.selections);
};

export default function OrderHistory() {
    const { userInfo, loggedIn } = useUser();
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {

        const fetchAdminStatus = async () => {
            const response = await callCheckIfAdmin(userInfo?.uid);
            setIsAdmin((response as boolean));
        };

        const fetchOrders = async () => {
            try {
                const data = await getCollection('orders');
                const validOrders = data.filter(isValidOrder);
                const sortedOrders = validOrders.sort((a, b) => {
                    const orderIdA = a.orderId.substring(3);
                    const orderIdB = b.orderId.substring(3);
                    return orderIdA.localeCompare(orderIdB);
                });
                setOrders(sortedOrders);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
        if (loggedIn && userInfo) fetchAdminStatus();
    }, []);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
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
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                {orders.map((order) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={order.orderId}>
                        <Card sx={{ minWidth: 250, minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <CardContent>
                                <Stack direction={'row'} justifyContent={'space-between'}>
                                    <Typography variant="h6">
                                        Order ID:
                                    </Typography>
                                    <Typography variant="h6">
                                        {order.orderId}
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'} justifyContent={'space-between'}>
                                    <Typography style={{ font: 'bold' }} >
                                        Date:
                                    </Typography>
                                    <Typography >
                                        {order.day}
                                    </Typography>
                                </Stack>
                                {order.selections.map((sel, index) => (
                                    <Stack key={index} direction={'row'} justifyContent={'space-between'}>
                                        <Typography >
                                            {sel.value}:
                                        </Typography>
                                        <Typography >
                                            {sel.quantity}
                                        </Typography>
                                    </Stack>
                                ))}
                                <Stack direction={'row'} justifyContent={'space-between'}>
                                    <Typography>
                                        <strong>Quantity:</strong>
                                    </Typography>
                                    <Typography>
                                        {order.totalQuantity}
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'} justifyContent={'space-between'}>
                                    <Typography>
                                        <strong>Total Cost:</strong>
                                    </Typography>
                                    <Typography>
                                        ${order.totalCost.toFixed(2)}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction={'row'}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                    padding={'5px 0px'}>
                                    <Typography>
                                        <strong>Order Status:</strong>
                                    </Typography>
                                    {isAdmin ?
                                        <ConfirmOrder {...order} /> :
                                        <Typography style={{ color: order.orderStatus === 'Confirmed' ? 'green' : order.orderStatus === 'Declined' ? 'red' : 'grey' }}>
                                            {order.orderStatus}
                                        </Typography>}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
