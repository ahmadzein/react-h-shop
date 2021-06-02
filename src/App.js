import React, { Component } from 'react';
import './App.css';
import Account from './pages/Account'
import SignIn from './pages/SignIn'
import Footer from './components/Footer'
import axios from 'axios';
import { Switch, Route, BrowserRouter, Redirect} from "react-router-dom";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true, dashboard: undefined, open: false };
    this.handler = this.handler.bind(this)
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };





  state = {};

  handler(bool, dash) {
    console.log(bool)
    console.log('hand')

    this.setState({
      logged: bool,
      dashboard: dash
    })
  }
  componentDidMount() {
    const config = {
      headers: { Authorization: `Bearer  ` + localStorage.getItem('token') }
    };
    axios.get('https://freddy.codesubmit.io/dashboard', config)
      .then(res => {
        console.log(res)
        this.setState({
          dashboard: res.data
        });
        this.setState({ isLoading: false });


      })
      .catch(err => {
        console.log('not signed in')
        this.setState({ isLoading: false });

      })

  }


  async RefreshToken(){
    console.log('refreshers')
    console.log(localStorage.getItem('refreshToken'));
    console.log(localStorage.getItem('token'));
    const config = {
      headers: { Authorization: `Bearer  ` + localStorage.getItem('refreshToken') }
    };
    axios.post('https://freddy.codesubmit.io/refresh', config)
      .then(res => {
        console.log(res)
  
  localStorage.setItem('token',res.data.access_token)
  
  
      })
      .catch(err => {
        console.log(err)
  
      })
  
          this.handleClickOpen();
        
  }

  render() {
    const { isLoading, dashboard } = this.state;
    if (isLoading) {
      return <div className="App">Loading...</div>;
    }
    if (dashboard) {

      return <>
      <BrowserRouter>
      <Switch>
      <Redirect from="/account/logout" to="/"/>

      <Route  exact path="/">
          <Account data={dashboard.dashboard} />
          </Route>
           
          </Switch>
          </BrowserRouter>
        <Footer />

      </>
    }
    return (

      <div className="App">
         <BrowserRouter>
      <Switch>
      <Redirect from="/account/logout" to="/"/>

      <Route  exact path="/">
      <SignIn handler={this.handler} />
          </Route>
           
          </Switch>
          </BrowserRouter>

        <Footer />

      </div>
    );
  }
}


export default App;
