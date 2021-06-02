import React, { useState } from 'react';
import logo from '../img/Freddys_Logo.svg';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Redirect} from 'react-router';

import axios from 'axios'


 export default function SignIn(props) {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [msg, setMsg] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();

    const data ={
      username : username,
      password: password
    }
    console.log(JSON.stringify(data))
axios.post('https://freddy.codesubmit.io/login',data)
.then(res => {
  localStorage.setItem('token',res.data.access_token)
  localStorage.setItem('refreshToken',res.data.refresh_token)
  console.log('logged')
  
  const config = {
    headers: { Authorization: `Bearer  ` + localStorage.getItem('token') }
  };
  axios.get('https://freddy.codesubmit.io/dashboard', config)
    .then(res => {
      console.log(res)

props.handler(true,res.data);


    })
    .catch(err => {
      console.log(err);

    })
  
})
.catch(err =>
  {
    console.log(err)
    setMsg("check userename and password");
    console.log(msg)
  })

  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid black',
      padding: '20px'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  
    logo: {
      height: '100%',
      width: '100%',
    },
    
  
  }));
  const classes = useStyles();
  if(props.status === "logout"){
    localStorage.clear();
    window.location.reload(); 
  }
  return (
    <Container component="main" maxWidth="xs">
      
    <CssBaseline />
      <div className={classes.paper}>
      <Grid item container justify="center" spacing={2}>
        <Grid item xs={6}>
        <Typography component="h1" variant="h5">
        Freddy's Artisanal Halloween Candy Shop</Typography>
        </Grid>  
        <Grid item xs={6}>
            <img src={logo} className="App-logo" alt="logo"  className={classes.logo} />
        </Grid >
     
        </Grid>
       <Typography>{msg}</Typography>
        <form className={classes.form} onSubmit={handleSubmit} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userename"
            label="Username"
            name="userename"
            autoComplete="userename"
            autoFocus
            onChange={e => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
         
        </form>
      </div>
      </Container>
  )
  
}
