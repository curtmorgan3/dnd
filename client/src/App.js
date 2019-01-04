import React, { Component } from 'react';
import Register from './Components/Register';
import Login from './Components/Login';
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
			console.log(this.state.token);
		}else {
			console.log('no token');
		}
	}
  render() {
    return (
      <div className="App">
				<Login />
      </div>
    );
  }
}

export default App;
