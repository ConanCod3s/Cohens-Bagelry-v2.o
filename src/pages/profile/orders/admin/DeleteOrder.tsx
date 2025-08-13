// DeleteOrder component
import {Button} from "@mui/material";
import React from "react";
import {handleDelete} from "../../../../services/firebase/Calls.tsx";

const DeleteOrder: React.FC<{ id: string }> = ({id}) => {
    return (
        <Button variant="contained" color="error" onClick={() => handleDelete({id})}>
            Delete Order
        </Button>
    );
};

export default DeleteOrder;
