import React, { Component } from 'react';
import axios from 'axios'
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Pagination } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import Moment from 'react-moment';

const styles = theme => ({
    table: {
      minWidth: 650,
    },
    red:{
        color:'red'
    },
    green:{
        color:'green'
    }
  });
  

  
    





  class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = { rows: [], searchTerm: '' ,pages:1};
      }
   async  GetOrders(term='',page =1) {
    const config = {
        headers: { Authorization: `Bearer  ` + localStorage.getItem('token') }
      };
    return axios.get('https://freddy.codesubmit.io/orders?page='+page+'&q='+term, config).then(res => {

        console.log(res.data.orders)

       this.setState({rows:res.data.orders,pages: Math.ceil(res.data.total/50)});
      })
      .catch(err => {
        console.log(err)
  
      })
        
    
      
  }


      componentDidMount(){
        this.GetOrders()
      }
  
      async handleSubmit(e){
        e.preventDefault();
        this.GetOrders(this.state.searchTerm,1);
    
      }
      async changePage(e,value){
        this.GetOrders(this.state.searchTerm,value);

      }


 render(){
    const { classes } = this.props;

    return (
        <div><Grid container justify="space-between" >
        <Typography item lg={9}>Orders</Typography>
      <Grid item lg={3} container alignItems="center" justify="flex-end">
          <SearchIcon fontSize="large" item lg={2}/>
          <form className={classes.form} onSubmit={this.handleSubmit.bind(this)} >
      <TextField item lg={10} id="outlined-search" label="Search field" type="search" variant="outlined"  onChange={e => this.setState({searchTerm: e.target.value})} />
</form>

      </Grid>
    </Grid>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.product.name}
              </TableCell>
              <TableCell align="right"><Moment format="ddd DD/MM/YYYY" >{row.created_at}</Moment></TableCell>
              <TableCell align="right">{row.total}</TableCell>
              <TableCell align="right"  className={(row.status === 'delivered' ? classes.green : (row.status === 'processing' ? classes.red : ''))} >{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination count={this.state.pages} onChange={this.changePage.bind(this)} />

      </div>
    );
 }
  
}
export default withStyles(styles)(Orders)