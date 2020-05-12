import React, { useState } from 'react';
import moment from 'moment';

import Selection from './selection/Selection';


export default () => {
    const [chart, setChart] = useState(null);

    const parsePeriod = ({periodType, periodStart, periodEnd, date}) => {
        if (periodType === 'year') {
            const date_ = moment(date);
            return {from: date_, to: date_.add(1, 'years')};
        } else if (periodType === 'month') {
            const date_ = moment(date);
            return {from: date_, to: date_.add(1, 'months')};
        } else {
            return {from: moment(periodStart), to: moment(periodEnd)};
        }
    }

    const generateChart = ({
        category,
        chartType,
        date,
        periodEnd,
        periodStart,
        periodType,
        subcategory,
    }) => {
        const {from, to} = parsePeriod({date, periodEnd, periodStart, periodType});
        if (chartType === 'Table') {
            // todo fetch data from periodStart to periodEnd
            // use earliest to start columns 
            // const data = [];
            // const dates = data.map(getDate);
            // const years = [...new Set(dates.map(getYear))].sort();
            // const {year: [months]} = getMonthsEachYear;
            // const {year: [month: {days}]} = getDaysEachMonth;


        }
    };

    return (
        <React.Fragment>
            <Selection onFormCompleteClick={generateChart}/>
            {chart}
        </React.Fragment>
    );
}