/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox() {
    return (
        <Autocomplete fullWidth
            id="combo-box-demo"
            options={city}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
        />
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const city = [
    { title: 'Surat'},
    { title: 'Ahmedabad'},
    { title: 'Rajkot'},
    { title: 'Junagadh'},
    { title: 'Nadiad'},
    { title: "Baroda"},
    { title: 'Anand'},
    { title: 'Bhavnagar'},
    { title: 'Navsari'},
    { title: 'Keshod'},
    { title: 'Veraval'},
    { title: 'Gandhinagar'},
    { title: 'Jamnagar'},
    { title: 'Vasi'},
    { title: 'Botad' },
];