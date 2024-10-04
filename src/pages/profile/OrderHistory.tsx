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

const isValidOrder = (data: any): data is OrderType => {
    return data && typeof data.orderId === 'string' && Array.isArray(data.selections);
};

export default function OrderHistory() {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
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
                                <Typography variant="h5" gutterBottom>
                                    Order ID: {order.orderId}
                                </Typography>
                                <Typography style={{ font: 'bold' }} gutterBottom>
                                    Date: {order.day}
                                </Typography>
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
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
