import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { getUserCharacters, getUserCampaigns } from './api-helpers.js';
import NavBar from './Components/NavBar';
import Landing from './Components/Landing';
import Register from './Components/Register';
import Login from './Components/Login';
import Characters from './Components/Characters';
import NewCharacter from './Components/Characters/NewCharacter';
import CharacterSheet from './Components/Characters/CharacterSheet';
import Campaigns from './Components/Campaigns';
import NewCampaign from './Components/Campaigns/NewCampaign';
import CampaignCharacters from './Components/Campaigns/CampaignCharacters';

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
		let characters = [];
		let campaigns = [];
		if (token){
			try{
				characters = await getUserCharacters(token);
				campaigns = await getUserCampaigns(token);
			} catch(e){
				console.error(e)
			} finally {
				this.setState({
					token,
					characters,
					campaigns
				});
			}
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
					<Switch>
						<Route exact path='/campaigns' render={props => (
							<Campaigns campaigns={this.state.campaigns} />
						)} />
						<Route path='/campaigns/new' component={NewCampaign} />
						<Route path='/campaigns/:id/characters' component={CampaignCharacters} />
						)} />
					</Switch>
					<Switch>
						<Route exact path='/characters' render={props => (
							<Characters characters={this.state.characters} />
						)}/>
						<Route path='/characters/new' component={NewCharacter} />
						<Route path='/characters/:id' component={CharacterSheet} />
					</Switch>
				</div>
			</Router>
    );
  }
}

export default App;
