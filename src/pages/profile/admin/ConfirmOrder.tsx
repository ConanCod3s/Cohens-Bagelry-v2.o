import { useState } from "react";
import { OrderType } from "../../../utils/constants/Types";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

export default function ConfirmOrder({ ...order }: OrderType) {
    const [status, setStatus] = useState<OrderType['orderStatus']>(order.orderStatus);

    const handleChange = (event: SelectChangeEvent) => {
        const newStatus = event.target.value as OrderType['orderStatus'];
        setStatus(newStatus);
    };

    return (
        <FormControl sx={{ minWidth: 120 }} size="small" >
            <InputLabel>Status</InputLabel>
            <Select
                value={status}
                label="Status"
                onChange={handleChange}>
                <MenuItem value={'Pending'}>Pending</MenuItem>
                <MenuItem value={'Confirmed'}>Confirmed</MenuItem>
                <MenuItem value={'Declined'}>Declined</MenuItem>
            </Select>
        </FormControl>
    );
}