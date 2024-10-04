import { Fragment } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Quantity from '../../../components/forms/Quantity';
import { AvailableType } from '../../../utils/constants/Types';

interface BagelsProps {
    selections: AvailableType[];
    setSelections: (newSelections: AvailableType[]) => void;
}

export default function Bagels({ selections, setSelections }: BagelsProps) {
    return (
        <Fragment>
            {selections.map((type, sakuin) => {
                if (type.type === 'bagel')
                    return <Grid container direction="row" sx={{ padding: 1, backgroundColor: sakuin % 2 > 0 ? 'lightgrey' : '', borderRadius: 2 }} key={type.label + sakuin}>
                        <Grid container item xs={8} textAlign="start" direction="row" justifyContent="space-between" alignContent="center">
                            <Typography>{type.label}</Typography>
                            <Typography textAlign="end" paddingRight={2}>{`$ ${(type.cost).toFixed(2)}/ea`}</Typography>
                        </Grid>
                        <Grid item xs={4} textAlign="end">
                            <Box
                                component={Quantity}
                                type={type}
                                sakuin={sakuin}
                                availableTypes={selections}
                                setAvailableTypes={setSelections}
                            />
                        </Grid>
                    </Grid>
            })}
        </Fragment>
    );
}
