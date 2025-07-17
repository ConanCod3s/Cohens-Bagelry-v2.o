// DeleteOrder component
import {Button} from "@mui/material";
import React from "react";
// import { handleDelete } from "../../../../services/firebase/Calls.tsx";
import {OrderType} from "../../../../utils/constants/Types.tsx";
import {handleDelete} from "../../../../services/firebase/Calls.tsx";

const DeleteOrder: React.FC<{ orderId: OrderType['orderId'] }> = ({orderId}) => {
    return (
        <Button variant="contained" color="error" onClick={() => console.log(handleDelete({orderId: orderId}))}>
            Delete Order
        </Button>
    );
};

export default DeleteOrder;
