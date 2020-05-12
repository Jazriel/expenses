import React from 'react';

import {TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';


export default function ({label, options, className}) {
    return (<Autocomplete
      className={className}
      options={options}
      getOptionLabel={(option) => option}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
    />);
}
