import { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import { AvailableType } from '../../utils/constants/Types';

interface Error {
    key: string;
    msg: string;
}

interface Props {
    availableTypes: AvailableType[];
    sakuin: number;
    setAvailableTypes: (types: AvailableType[]) => void;
    type: AvailableType;
}

export default function Quantity({ availableTypes, setAvailableTypes, type, sakuin }: Props) {
    const [error, setError] = useState<Error | null>(null);

    const updateAvailableTypes = (sakuin: number, newQuantity: number) => {
        const updatedTypes = availableTypes.map((prevType, i) =>
            i === sakuin ? { ...prevType, quantity: newQuantity } : prevType
        );
        setAvailableTypes(updatedTypes);
    };

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);

        const totalBagels = availableTypes
            .filter(t => t.type !== 'sourdough')
            .reduce((a, b) => a + b.quantity, 0);

        if (type.type === 'sourdough') {
            if (value > 1) {
                setError({ key: `${type.label}${sakuin}`, msg: 'You can only select 1 loaf of sourdough.' });
                return;
            }
        }
        else if (totalBagels - type.quantity + value > 12) {
            setError({ key: `${type.label}${sakuin}`, msg: 'Maximum total bagels (excluding sourdough) is 12.' });
            return;
        }

        if (value < 0) {
            setError({ key: `${type.label}${sakuin}`, msg: 'Please select a number greater than 0' });
        } else {
            updateAvailableTypes(sakuin, value);
            setError(null);
        }
    };

    return (
        <TextField
            id="outlined-number"
            label="Quantity"
            type="number"
            helperText={error && error.key === `${type.label}${sakuin}` ? error.msg : ''}
            error={!!error && error.key === `${type.label}${sakuin}`}
            onChange={handleQuantityChange}
            InputLabelProps={{ shrink: true }}
            value={type.quantity}
            sx={{ zIndex: 0 }}
        />
    );
}
