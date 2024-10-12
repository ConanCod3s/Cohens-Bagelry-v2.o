

import { useState, useEffect, Fragment } from 'react';
import { Typography, Tabs, Tab, Grid, Divider } from '@mui/material';
import dayjs from 'dayjs';
import { useUser } from '../../services/providers/User';
import LoginContainer from '../../components/LoginContainer';
import { AvailableType } from '../../utils/constants/Types';
import { bagels, sourdough } from '../../utils/constants/Constants';
import Bagels from './typeTabs/bagels/Bagels';
import Sourdough from './typeTabs/sourdough/Sourdough';
import PaymentWindow from './paymentWindow/PaymentWindow';
import Information from './information/Information';
import { workingWindow } from '../../theme/Base';

export default function OrderPage() {
    const { userInfo, loggedIn } = useUser();

    const [value, setValue] = useState<number>(1);
    const [success, setSuccess] = useState<boolean>(false);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [selections, setSelections] = useState<AvailableType[]>([...bagels, ...sourdough]);
    const [email, setEmail] = useState<string>(userInfo?.email ?? '');
    const [lastName, setLastName] = useState<string>(userInfo?.lastName ?? '');
    const [firstName, setFirstName] = useState<string>(userInfo?.firstName ?? '');
    const [phoneNumber, setPhoneNumber] = useState<string>(userInfo?.phoneNumber ?? '');
    const [day, setDay] = useState<dayjs.Dayjs>(dayjs().add(2, 'day').startOf('day').set('hour', 5).set('minute', 0));
    const [time, setTime] = useState<dayjs.Dayjs>(dayjs().add(2, 'day').startOf('day').set('hour', 5).set('minute', 0));

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        const cost = selections.reduce((acc, obj) => acc + (obj.quantity * obj.cost), 0);
        setTotalCost(cost);
    }, [selections]);

    const differenceToNextDollar = Math.ceil(totalCost) - totalCost;

    return (
        <Fragment>
            <Grid container spacing={2} height={workingWindow}>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <div style={{ minHeight: 650 }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                        >
                            <Tab value={1} label="Bagels" />
                            <Tab value={2} label="Sourdough" />
                        </Tabs>

                        {value === 1 && (
                            <Bagels
                                selections={selections}
                                setSelections={setSelections}
                            />
                        )}

                        {value === 2 && (
                            <Sourdough
                                selections={selections}
                                setSelections={setSelections}
                            />
                        )}
                    </div>
                    <Divider sx={{ paddingTop: 5 }} />
                    <Grid container>
                        <Grid item xs={8}>
                            <Typography>Cost:</Typography>
                        </Grid>
                        <Grid item xs={4} textAlign="end">
                            <Typography>$ {(totalCost).toFixed(2)}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={8}>
                            <Typography>Additional Fee:</Typography>
                        </Grid>
                        <Grid item xs={4} textAlign="end">
                            <Typography>$ {(differenceToNextDollar).toFixed(2)}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={8}>
                            <Typography>Total:</Typography>
                        </Grid>
                        <Grid item xs={4} textAlign="end">
                            <Typography>$ {(totalCost + differenceToNextDollar).toFixed(2)}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container item xs={12} sm={12} md={4} lg={4} sx={{ display: 'grid', justifyContent: 'space-around' }}>
                    <Grid item>
                        {loggedIn ? (

                            success ? (
                                <Typography sx={{ textAlign: 'center', paddingTop: 2, paddingBottom: 10 }}>
                                    Once your order has been placed, please allow 24 hours for me to contact you to confirm.
                                </Typography>
                            ) :
                                <PaymentWindow
                                    email={email}
                                    setEmail={setEmail}
                                    firstName={firstName}
                                    setFirstName={setFirstName}
                                    lastName={lastName}
                                    setLastName={setLastName}
                                    phoneNumber={phoneNumber}
                                    setPhoneNumber={setPhoneNumber}
                                    uid={userInfo?.uid ?? ''}
                                    selections={selections.filter((item) => item.quantity > 0)}
                                    totalCost={totalCost}
                                    day={day}
                                    setDay={setDay}
                                    time={time}
                                    setTime={setTime}
                                    success={success}
                                    setSuccess={setSuccess}
                                />
                        ) : (
                            <LoginContainer />
                        )}
                        <Grid item sx={{ height: '10em', width: '100%' }}>
                            <Information />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Fragment>
    );
}
