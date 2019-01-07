import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { getUserCharacters } from './api-helpers.js';
import NavBar from './Components/NavBar';
import Landing from './Components/Landing';
import Register from './Components/Register';
import Login from './Components/Login';
import Characters from './Components/Characters';
import NewCharacter from './Components/Characters/NewCharacter';
import CharacterSheet from './Components/Characters/CharacterSheet';
import './App.css';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			token: '',
			redirect: false,
			characters: [],
		}
		this.signOut = this.signOut.bind(this);
		this.logIn = this.logIn.bind(this);
	}

	async componentDidMount(){
		const token = await localStorage.getItem('dnd_token');
		if (token){
			const characters = await getUserCharacters(token);
			this.setState({
				token,
				characters
			});
		}
	}
	logIn(token){
		this.setState({
			token: token,
			redirect: true
		})
		this.setState({
			redirect: false
		})
	}

	signOut(){
		localStorage.removeItem('dnd_token');
		this.setState({
			token: '',
			redirect: true
		})
		this.setState({
			redirect: false
		})
	}

  render() {
    return (
			<Router>
      	<div className="App">
					{this.state.redirect ? (
						<Redirect to='/' />
					) : null }
					<NavBar signOut={this.signOut} />
					<Route exact path='/' component={Landing} />
					<Route path='/login' render={props => (
						<Login logIn={this.logIn}/>
					)}/>
					<Route path='/register' component={Register} />
					<Route exact path='/characters' render={props => (
						<Characters characters={this.state.characters} />
					)}/>
					<Route path='/characters/new' component={NewCharacter} />
					<Route path='/characters/:id' component={CharacterSheet} />
				</div>
			</Router>
    );
  }
}

export default App;
