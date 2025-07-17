// Extracted OrderCard component
import {OrderType} from "../../../utils/constants/Types.tsx";
import {Box, Card, CardContent, Grid, Stack, Typography} from "@mui/material";
import ConfirmOrder from "./admin/ConfirmOrder.tsx";
import DeleteOrder from "./admin/DeleteOrder.tsx";
import React from "react";

const getStatusColor = (status: string) => {

    switch (status) {
        case "Confirmed":
            return "green";
        case "Declined":
            return "red";
        default:
            return "grey";
    }
};

const KeyValueRow = ({label, value}: { label: string; value: string | number }) => (
    <Stack direction="row" justifyContent="space-between">
        <Typography><strong>{label}:</strong></Typography>
        <Typography>{value}</Typography>
    </Stack>
);

const OrderCard: React.FC<{ order: OrderType; isAdmin: boolean }> = ({order, isAdmin}) => (
    <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
            sx={{
                minWidth: 250,
                minHeight: 250,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <CardContent>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6">Order ID:</Typography>
                    <Typography variant="h6">{order.orderId}</Typography>
                </Stack>
                {isAdmin && (
                    <KeyValueRow label="Name" value={`${order.lastName}, ${order.firstName}`}/>
                )}
                <KeyValueRow label="Date" value={order.day}/>
                {order.selections.map((sel, index) => (
                    <KeyValueRow key={index} label={sel.value} value={sel.quantity}/>
                ))}
                <KeyValueRow label="Quantity" value={order.totalQuantity}/>
                <Stack direction="row" justifyContent="space-between" alignItems="center" padding="5px 0">
                    <Typography><strong>Order Status:</strong></Typography>
                    {isAdmin ? (
                        <ConfirmOrder {...order} />
                    ) : (
                        <Typography style={{color: getStatusColor(order.orderStatus)}}>
                            {order.orderStatus}
                        </Typography>
                    )}
                </Stack>
                <Box sx={{width: "100%", height: 1, background: "lightgrey"}}/>
                <KeyValueRow label="Cost" value={`$${order?.costData?.cost?.toFixed(2) || "0.00"}`}/>
                <KeyValueRow label="Fee" value={`$${order?.costData?.fee?.toFixed(2) || "0.00"}`}/>
                <KeyValueRow label="Total" value={`$${order?.costData?.totalCost?.toFixed(2) || "0.00"}`}/>
                {isAdmin && (
                    <Stack direction="row" justifyContent="center" paddingTop={2}>
                        <DeleteOrder {...order} />
                    </Stack>
                )}
            </CardContent>

        </Card>
    </Grid>
);

export default OrderCard;
