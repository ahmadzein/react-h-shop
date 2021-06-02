import React from 'react';
import { Grid } from '@material-ui/core';
import Chart from '../components/Chart';
import Stats from '../components/Stats';
import BestSellers from '../components/BestSellers'
import { Typography } from '@material-ui/core';

function Dashboard(props) {
    var orders =0;
    var total = 0;
    
    const week = props.data.sales_over_time_week;
    const year = props.data.sales_over_time_year;
    const tops = props.data.bestsellers.slice(0, 3);
    const chartWeek=[];
    const chartYear=[];

    Object.keys(week).map((key) => {
        orders += week[key].orders;
        total += week[key].total;
        chartWeek.push({date:key,total:week[key].total  })
      })
      Object.keys(year).map(function (key) {
              console.log(key);
              chartYear.push({ date: key, total: year[key].total });
          })
console.log(chartYear);
const todaysSalesNumber  = week[1].orders;
const todaysSalesTotal  = week[1].total;
const weekSalesNumber  = orders;
const weekSalesTotal  = total;
const monthSalesNumber  = props.data.sales_over_time_year[1].orders;
const monthsSalesTotal  = props.data.sales_over_time_year[1].total;
    return(
      <div>
<Grid container justify="space-between" > 
<Stats item name="Today" number={todaysSalesNumber} total={todaysSalesTotal}/>
<Stats item name="Last Week" number={weekSalesNumber} total={weekSalesTotal}/>
<Stats item name="Last Month" number={monthSalesNumber} total={monthsSalesTotal}/>
</Grid>
      <Chart week={chartWeek} year={chartYear}/>
      <Typography variant="h5">Best Sellers</Typography>
      <BestSellers tops={tops}/>
      </div>
    )
}



export default Dashboard;
