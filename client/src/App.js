import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './Components/Landing';
import Register from './Components/Register';
import Login from './Components/Login';
import NavBar from './Components/NavBar'
import './App.css';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			token: ''
		}
	}

	async componentDidMount(){
		const token = await localStorage.getItem('dnd_token');
		if (token){
			this.setState({
				token: token
			})
		}else {
			console.log('no token');
		}
	}
  render() {
    return (
			<Router>
      	<div className="App">
				<NavBar />
				<Route exact path='/' component={Landing} />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
      	</div>
			</Router>
    );
  }
}

export default App;
