import React from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { findUser, getAnyUserCharacters, addCharacterToCampaign } from '../../../api-helpers.js';
import { Redirect } from 'react-router-dom';
import './stylesheet.css';

export default class AddCampaignCharacters extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userToFind: {},
			userCharacters: [],
			username: '',
			finished: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCharacterAdd = this.handleCharacterAdd.bind(this);
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		})
	};
	async handleSubmit(e){
		e.preventDefault();
		let user = {};
		let characters = [];
		try{
			user = await findUser(this.state.username.toLowerCase());
			this.setState({
				userToFind: user[0]
			})
		}catch(e){
			console.error(e)
		}finally{
			characters = await getAnyUserCharacters(this.state.userToFind.id);
			console.log(characters);
			this.setState({
				userCharacters: characters
			})
		};
	}
	async handleCharacterAdd(e){
		await addCharacterToCampaign(this.props.match.params.id, e.target.value);
		this.setState({
			finished: true
		})
	}

	render(){
		return(
			<div className='add-characters-to-campaign'>
				{this.state.finished ? <Redirect to='/campaigns' /> : null}
				<form>
					<FormControl
						type="text"
						name='username'
						value={this.state.username}
						placeholder="Enter the username of the character's owner."
						onChange={this.handleChange}
						/>
					<Button onClick={this.handleSubmit} bsStyle="primary">Search</Button>
					{Object.keys(this.state.userToFind).includes('username') ? <h4>{this.state.userToFind.username}'s characters</h4> : null}
				</form>
				{this.state.userCharacters.length > 0 ? (
					<div className='add-characters-character-wrapper'>
						{this.state.userCharacters.map(character => (
							<div key={character.id} className='add-characters-character'>
								<p>{character.name}</p>
								<p>Level {character.level}</p>
								<p>{character.clas.toUpperCase()}</p>
								<button value={character.id} onClick={this.handleCharacterAdd}>Add {character.name} to campaign</button>
							</div>
						))}
					</div>
				) : null }
			</div>
		)
	}
}
