import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { getUserCharacters, getUserCampaigns, getCurrentUser } from './api-helpers.js';
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
import AddCampaignCharacters from './Components/Campaigns/AddCampaignCharacters';


import './App.css';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			token: '',
			redirect: false,
			characters: [],
			currentUser: {},
		}
		this.signOut = this.signOut.bind(this);
		this.logIn = this.logIn.bind(this);
	}

	async componentDidMount(){
		const token = await localStorage.getItem('dnd_token');
		let characters = [];
		let campaigns = [];
		let currentUser = {};
		if (token){
			try{
				characters = await getUserCharacters(token);
				campaigns = await getUserCampaigns(token);
				currentUser = await getCurrentUser();
			} catch(e){
				console.error(e)
			} finally {
				this.setState({
					token,
					characters,
					campaigns,
					currentUser,
				});
			}
		}
	}
	resetRedirect(){
		this.setState({
			redirect: false
		})
	}

	async logIn(token){
		let currentUser = {};
		try{
			currentUser = await getCurrentUser()
		}catch(e){
			console.error(e);
		}finally{
			await this.setState({
				redirect: true,
				token,
				currentUser,
			})
		}
		this.resetRedirect();
	}

	async signOut(){
		localStorage.removeItem('dnd_token');
		await this.setState({
			token: '',
			currentUser: {},
			redirect: true
		})
		this.resetRedirect();
	}

  render() {
    return (
			<Router>
      	<div className="App">
					{this.state.redirect ? (
						<Redirect to='/' />
					) : null }
					<NavBar signOut={this.signOut} />
					<Route exact path='/' render={props => (
						<Landing currentUser={this.state.currentUser} />
					)} />
					<Route path='/login' render={props => (
						<Login logIn={this.logIn}/>
					)}/>
					<Switch>
						<Route exact path='/campaigns' render={props => (
							<Campaigns campaigns={this.state.campaigns} />
						)} />
						<Route path='/campaigns/new' component={NewCampaign} />
						<Route path='/campaigns/:id/characters' component={CampaignCharacters} />
						<Route path='/campaigns/:id/add' component={AddCampaignCharacters} />

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
