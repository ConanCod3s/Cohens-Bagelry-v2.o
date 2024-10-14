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

// Extracted OrderCard component
const OrderCard = ({ order, isAdmin }: { order: OrderType, isAdmin: boolean }) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={order.orderId}>
        <Card sx={{ minWidth: 250, minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6">Order ID:</Typography>
                    <Typography variant="h6">{order.orderId}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography><strong>Date:</strong></Typography>
                    <Typography>{order.day}</Typography>
                </Stack>
                {order.selections.map((sel, index) => (
                    <Stack key={index} direction="row" justifyContent="space-between">
                        <Typography>{sel.value}:</Typography>
                        <Typography>{sel.quantity}</Typography>
                    </Stack>
                ))}
                <Stack direction="row" justifyContent="space-between" paddingBottom={2}>
                    <Typography><strong>Quantity:</strong></Typography>
                    <Typography>{order.totalQuantity}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center" padding="5px 0">
                    <Typography><strong>Order Status:</strong></Typography>
                    {isAdmin ? (
                        <ConfirmOrder {...order} />
                    ) : (
                        <Typography style={{ color: getStatusColor(order.orderStatus) }}>
                            {order.orderStatus}
                        </Typography>
                    )}
                </Stack>
                <Box sx={{ width: '100%', height: 1, background: 'lightgrey' }} />
                <Stack direction="row" justifyContent="space-between" paddingTop={2}>
                    <Typography><strong>Cost:</strong></Typography>
                    <Typography>${order.costData.cost.toFixed(2)}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography><strong>Fee:</strong></Typography>
                    <Typography>${order.costData.fee.toFixed(2)}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography><strong>Total:</strong></Typography>
                    <Typography>${order.costData.totalCost.toFixed(2)}</Typography>
                </Stack>
            </CardContent>
        </Card>
    </Grid>
);

// Helper function for order status color
const getStatusColor = (status: string) => {
    switch (status) {
        case 'Confirmed':
            return 'green';
        case 'Declined':
            return 'red';
        default:
            return 'grey';
    }
};

export default function OrderHistory() {
    const { userInfo, loggedIn } = useUser();
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            if (loggedIn && userInfo) {
                try {
                    setLoading(true);

                    const adminStatus = await callCheckIfAdmin(userInfo.uid);
                    setIsAdmin(adminStatus as boolean);

                    let ordersData = await getCollection('orders');
                    const validOrders = ordersData.filter(isValidOrder);

                    const filteredOrders = adminStatus
                        ? validOrders
                        : validOrders.filter(order => order.orderedByUid === userInfo.uid);

                    const sortedOrders = filteredOrders.sort((a, b) => {
                        const orderIdA = a.orderId.substring(3);
                        const orderIdB = b.orderId.substring(3);
                        return orderIdA.localeCompare(orderIdB);
                    });

                    setOrders(sortedOrders);
                } catch (error) {
                    console.error('Failed to fetch data:', error);
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
                    <OrderCard key={order.orderId} order={order} isAdmin={isAdmin} />
                ))}
            </Grid>
        </Box>
    );
};