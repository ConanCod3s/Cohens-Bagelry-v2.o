import { useState, useEffect, Fragment } from 'react';
import { Stack, Typography, Tabs, Tab, TextField, Grid, Divider } from '@mui/material';
import PhoneNumber from '../../components/forms/PhoneNumber';
import Submit from '../../components/forms/Submit';
import Email from '../../components/forms/Email';
import DateTimeForPickup from '../../components/forms/DateTime';
import dayjs from 'dayjs';
import { useUser } from '../../services/providers/User';
import LoginContainer from '../../components/LoginContainer';
import { AvailableType } from '../../utils/constants/Types';
import { bagels, sourdough } from '../../utils/constants/Constants';
import Bagels from './bagels/Bagels';
import Sourdough from './sourdough/Sourdough';

export default function OrderPage() {
    const { userInfo, loggedIn } = useUser();

    const [value, setValue] = useState<number>(1);
    const [success, setSuccess] = useState<boolean>(false);
    const [selections, setSelections] = useState<AvailableType[]>([...bagels, ...sourdough]);
    const [email, setEmail] = useState<string>(userInfo?.email ?? '');
    const [lastName, setLastName] = useState<string>(userInfo?.lastName ?? '');
    const [firstName, setFirstName] = useState<string>(userInfo?.firstName ?? '');
    const [phoneNumber, setPhoneNumber] = useState<string>(userInfo?.phoneNumber ?? '');
    const [day, setDay] = useState<dayjs.Dayjs>(dayjs().add(2, 'day').startOf('day').set('hour', 5).set('minute', 0));
    const [time, setTime] = useState<dayjs.Dayjs>(dayjs().add(2, 'day').startOf('day').set('hour', 5).set('minute', 0));

    const [totalCost, setTotalCost] = useState<number>(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        const cost = selections.reduce((acc, obj) => acc + (obj.quantity * obj.cost), 0);
        setTotalCost(cost);
    }, [selections]);

    const differenceToNextDollar = (Math.ceil(totalCost * 2) / 2) - totalCost;

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <div style={{ minHeight: 650 }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                        >
                            <Tab value={1} label="Bagels" />
                            <Tab value={2} label="Sourdough" />
                        </Tabs>

                        {value === 1 && (<Bagels
                            selections={selections}
                            setSelections={setSelections}
                        />)}

                        {value === 2 && (<Sourdough
                            selections={selections}
                            setSelections={setSelections}
                        />)}
                    </div>
                    <Divider sx={{ paddingTop: 5 }} />
                    <Grid container >
                        <Grid item xs={8}>
                            <Typography>Cost:</Typography>
                        </Grid>
                        <Grid item xs={4} textAlign="end">
                            <Typography>$ {(totalCost).toFixed(2)}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container >
                        <Grid item xs={8}>
                            <Typography>Additional Fee:</Typography>
                        </Grid>
                        <Grid item xs={4} textAlign="end">
                            <Typography>$ {(differenceToNextDollar).toFixed(2)}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container >
                        <Grid item xs={8}>
                            <Typography>Total:</Typography>
                        </Grid>
                        <Grid item xs={4} textAlign="end">
                            <Typography>$ {(totalCost + differenceToNextDollar).toFixed(2)}</Typography>
                        </Grid>
                        <Typography variant='caption'>* Prices will fluctuate as the recipes are refined!</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} sx={{ display: 'grid', justifyContent: 'space-around' }}>
                    {loggedIn ? (
                        <Stack spacing={2} justifyContent="center">
                            <TextField
                                id="first-name"
                                label="First Name"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                            <TextField
                                id="last-name"
                                label="Last Name"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                            <PhoneNumber userPhoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
                            <Email userEmail={email} setEmail={setEmail} />
                            <DateTimeForPickup defaultValue={day} setDay={setDay} setTime={setTime} />
                            <Submit
                                setSuccess={setSuccess}
                                success={success}
                                saveInfo
                                uid={userInfo?.uid ?? ''}
                                day={dayjs(day)}
                                time={dayjs(time)}
                                selections={selections.filter((item) => item.quantity > 0)}
                                email={email}
                                phoneNumber={phoneNumber}
                                firstName={firstName}
                                lastName={lastName}
                                totalCost={totalCost}
                            />
                        </Stack>
                    ) : (
                        <LoginContainer />
                    )}
                </Grid>
            </Grid>
            {
                success && (
                    <Typography sx={{ textAlign: 'center', paddingTop: 2, paddingBottom: 10 }}>
                        Once your order has been placed, please allow 24 hours for me to contact you and to confirm.
                    </Typography>
                )
            }
        </Fragment >
    );
}
