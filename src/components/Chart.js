import * as React from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';


const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });



  
  var data = [];
  var chartData = [];


function Switcher(props) {
    const [state, setState] = React.useState({
        checked: false,
        title:'Revenue (last 7 days)',
      });
      const handleChange = (event) => {
        if(event.target.checked){
            setState({
                title:'Revenue (last 12 months)',
                [event.target.name]: event.target.checked 
            })
        }else{
            setState({
                title:'Revenue (last 7 days)',
                [event.target.name]: event.target.checked 
            })
        }
 
        props.handler(event.target.checked)

          };

    return(
      <Grid container justify="space-between" >
          <Typography item lg={10}>{state.title}</Typography>
        <Grid item lg={2} ><FormControlLabel 
        control={<IOSSwitch checked={state.checked} onChange={handleChange} name="checked" />}
        label="Year"
      /></Grid>
      </Grid>
    )
}



export default class ChartMaker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this)

    this.state = {
      data,
      chartData,
    };
  }

  handler(bool) {
      console.log(bool)

    this.setState({
        check: bool,
    })
  }
  render() {



    if(!this.state.check){
        this.setState({
            chartData: this.props.week

        })
    }else{
        this.setState({
            chartData: this.props.year

        })    }
  
    return (
        <div>
            <Switcher handler = {this.handler} />

      <Paper>

        <Chart
          data={this.state.chartData}
        >
          <ArgumentAxis />
          <ValueAxis max={12} />

          <BarSeries
            valueField="total"
            argumentField="date"
          />
          <Animation />
        </Chart>
      </Paper>
      </div>
    );
  }
}
