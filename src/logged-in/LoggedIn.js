import React from 'react';

import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';


export default () => {
    return (
    <React.Fragment>
        <Typography variant="h2">
            Logged in successfully!
        </Typography>
        <Typography variant="body1">
            If you are new to the app you can start <Link to="/expenses/add">adding your expenses</Link>.
        </Typography>
    </React.Fragment>);
}