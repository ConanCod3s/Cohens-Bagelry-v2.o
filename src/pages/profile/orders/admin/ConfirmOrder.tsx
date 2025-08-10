import {useState} from "react";
import {OrderType} from "../../../../utils/constants/Types.tsx";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {getDocIdByField, setFireBaseDoc} from "../../../../services/firebase/Calls.tsx";

export default function ConfirmOrder({...order}: OrderType) {
    const [status, setStatus] = useState<OrderType['orderStatus']>(order.orderStatus);

    const handleChange = async (event: SelectChangeEvent) => {
        const newStatus = event.target.value as OrderType['orderStatus'];
        setStatus(newStatus);

        try {
            const docId = await getDocIdByField({
                collectionName: 'orders',
                fieldName: 'orderId',
                value: order.orderId,
            });

            if (docId) {
                await setFireBaseDoc({
                    collectionName: 'orders',
                    docId: docId,
                    props: {
                        orderStatus: newStatus
                    }
                });
            } else {
                console.error("No document found with the given orderId");
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    return (
        <FormControl sx={{minWidth: 120}} size="small">
            <InputLabel>Status</InputLabel>
            <Select
                value={status}
                label="Status"
                onChange={handleChange}
                variant={'standard'}>
                <MenuItem value={'Pending'}>Pending</MenuItem>
                <MenuItem value={'Confirmed'}>Confirmed</MenuItem>
                <MenuItem value={'Declined'}>Declined</MenuItem>
            </Select>
        </FormControl>
    );
}