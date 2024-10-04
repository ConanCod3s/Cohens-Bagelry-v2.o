import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Popover,
} from '@mui/material';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import { getCollection } from '../services/firebase/Calls';
import { OrderType } from '../utils/constants/Types';

const isOrder = (data: any): data is OrderType => {
    return data && typeof data.orderId === 'string' && Array.isArray(data.selections);
};

export default function OrderTablePopover() {
    const [rows, setRows] = useState<OrderType[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClose = () => setAnchorEl(null);

    const getData = async () => {
        try {
            const data = await getCollection('orders');
            const validOrders = data.filter(isOrder);
            setRows(validOrders);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    const openOrdersMenu = (e: React.MouseEvent<HTMLElement>) => {
        if (e.shiftKey) {
            getData();
            setAnchorEl(e.currentTarget);
        }
    };

    return (
        <Box>
            <BakeryDiningIcon
                sx={{
                    display: { xs: 'flex', md: 'flex' },
                    mr: 1,
                    transform: `rotate(-${Math.floor(Math.random() * 361)}deg)`,
                }}
                onClick={() => openOrdersMenu}
            />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="order table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell align="right">First Name</TableCell>
                                <TableCell align="right">Last Name</TableCell>
                                <TableCell align="right">Phone Number</TableCell>
                                <TableCell align="right">Date of Pick up</TableCell>
                                <TableCell align="right">Time of Pick up</TableCell>
                                <TableCell align="right">Selections</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.orderId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.orderId}
                                    </TableCell>
                                    <TableCell align="right">{row.firstName}</TableCell>
                                    <TableCell align="right">{row.lastName}</TableCell>
                                    <TableCell align="right">{row.phoneNumber}</TableCell>
                                    <TableCell align="right">{row.day}</TableCell>
                                    <TableCell align="right">{row.time}</TableCell>
                                    <TableCell align="right">
                                        {row.selections.map((sel, sakuin) => (
                                            <Box key={sakuin}>
                                                <div>{sel.type}: {sel.quantity}</div>
                                            </Box>
                                        ))}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Popover>
        </Box>
    );
}
