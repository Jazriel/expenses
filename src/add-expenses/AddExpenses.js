import {DatePicker} from '@material-ui/pickers';
import {Button, TextField, Typography} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import React, {useContext, useState} from 'react';
import moment from 'moment';

import {NotificationsContext} from '../notifications/notifications';


export default ({onSubmit}) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [info, setInfo] = useState('');
    const [date, setDate] = useState(moment().format('L'));

    const alert = useContext(NotificationsContext);

    const useSetter = (setter) => (e) => setter(e.target.value);

    const onSubmit_ = (synthE) => {
        synthE.preventDefault();

        onSubmit({name, amount, category, info, date})
            .then(() => alert({message: 'Expense added', severity: 'success'}))
            .catch(() => alert({message: 'Technical issue', severity: 'error'}));

        // this should work along with new FormState but they don't :shrug:
        synthE.target.reset();
        setName('');
        setAmount('');
        setCategory('');
        setInfo('');
        setDate(moment().format('L'));
    }

    return (
    <form onSubmit={onSubmit_}>
        <div style={{
                border: "2px #3f51b5 solid",
                borderRadius: "4px",
                padding: "2rem",
                position: "relative",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridGap: "2rem",
            }}
        >
            <Typography style={{
                backgroundColor: "#fafafa",
                position: "absolute",
                top: "-14px",
                left: "1rem",
                padding: "0 3px",
            }}>
                Add expenses
            </Typography>
            <TextField label="Name" variant="filled" type="text"
                onBlur={useSetter(setName)}
            />
            <TextField label="Amount" variant="filled" type="number"
                onChange={useSetter(setAmount)}
            />
            <TextField label="Category" variant="filled" type="text"
                onBlur={useSetter(setCategory)}
            />
            <TextField label="Information" variant="filled" type="text"
                onBlur={useSetter(setInfo)}
            />
            <DatePicker autoOk disableFuture 
                variant="inline"
                format="DD/MM/yyyy"
                label="Date"
                value={date}
                onChange={(date) => {setDate(date)}}
            />

            <Button
                style={{
                    position: "absolute",
                    bottom: "-18px",
                    right: "1rem",
                }}
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<Add />}
            >
                Add expense
            </Button>
        </div>
    </form>);
}