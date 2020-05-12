import React, {useState} from 'react';

import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@material-ui/core';

import {DatePicker} from '@material-ui/pickers';

import SplitButton from '../../components/SplitButton';
import Select from '../select/Select';

export default function({categories = [], subcategories = [], onFormCompleteClick}) {
    // todo: hook categories and subcategories

    const [category, setCategory] = useState('');
    const [subcategory, setSubategory] = useState('');
    const [periodType, setPeriodType] = useState('');
    const [date, setDate] = useState(new Date());
    const [periodStart, setPeriodStart] = useState(new Date());
    const [periodEnd, setPeriodEnd] = useState(new Date());
    
    const handleWithSetter = (setter) => (e) => {setter(e.target.value)};
    
    const year = periodType === 'year';
    const month = periodType === 'month';
    const period = periodType === 'period';

    const handleGenerateButtonClick = (chartType) => {
        onFormCompleteClick({
            category,
            chartType,
            date,
            periodEnd,
            periodStart,
            periodType,
            subcategory,
        });
    };

    return (
        <React.Fragment>
            <div className="u-flex-row u-space-around">
                <div className="u-flex-column u-space-between">
                    <Select value={category} onChange={handleWithSetter(setCategory)} label="Category" options={['a', 'b']}/>
                    <Select value={subcategory} onChange={handleWithSetter(setSubategory)} label="Subcategory" options={['a', 'b']}/>
                </div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Period choice</FormLabel>
                    <RadioGroup aria-label="period" name="period" value={periodType} onChange={handleWithSetter(setPeriodType)}>
                        <FormControlLabel value="year" control={<Radio color="primary"/>} label="Year" />
                        <FormControlLabel value="month" control={<Radio color="primary"/>} label="Year and month" />
                        <FormControlLabel value="period" control={<Radio color="primary"/>} label="Period" />
                    </RadioGroup>
                </FormControl>
                <div className="u-flex-column u-space-between" style={{width: '140px'}}>
                    {year ? <DatePicker
                        className="u-zoom"
                        variant="inline"
                        views={["year"]}
                        label="Year only"
                        disableFuture={true}
                        value={date}
                        onChange={setDate}
                    /> : null}
                    {month ? <DatePicker
                        className="u-zoom"
                        variant="inline"
                        views={["year", "month"]}
                        label="Year and Month"
                        disableFuture={true}
                        value={date}
                        onChange={setDate}
                    /> : null}
                    {period ? 
                    <React.Fragment>
                        <DatePicker
                            className="u-zoom"
                            variant="inline"
                            label="Period start"
                            disableFuture={true}
                            value={periodStart}
                            onChange={setPeriodStart}
                        />
                        <DatePicker
                            className="u-zoom"
                            variant="inline"
                            label="Period end"
                            disableFuture={true}
                            value={periodEnd}
                            onChange={setPeriodEnd}
                        />
                    </React.Fragment> : null}
                </div>
                <div></div> {/*for spacing*/}
            </div>
            <div className="u-flex-row u-space-around u-margin-top">
                <SplitButton options={['Bar chart', 'Table']} initialIndex='1' onClick={handleGenerateButtonClick} />
            </div>
        </React.Fragment>
    );
}