import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { Stack } from '@mui/material';

export default function DateTimeForPickup({ defaultValue, setDay, setTime }: any) {

    const minHour = 5; // 5 AM
    const maxHour = 10; // 10 AM

    const shouldDisableTime = (value: any, view: 'hours' | 'minutes' | 'seconds') => {
        if (view === 'hours') {
            const hour = value.hour();
            return hour < minHour || hour > maxHour;
        }
        return false;
    };

    return (
        <div style={{ display: 'grid', textAlign: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                Select a Day and Time to request pickup
                <Stack direction="row" spacing={1}>
                    <DateField defaultValue={defaultValue} onChange={setDay} />
                    <TimeField
                        defaultValue={defaultValue}
                        onChange={setTime}
                        shouldDisableTime={shouldDisableTime}
                    />
                </Stack>
            </LocalizationProvider>
        </div>
    );
}
