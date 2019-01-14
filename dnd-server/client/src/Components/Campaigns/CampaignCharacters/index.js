import React from 'react';
import { getCampaignData, getCampaignCharacters, removeCharacterFromCampaign } from '../../../api-helpers.js';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './stylesheet.css';

export default class CampaignCharacters extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			campaign: {},
			characters: []
		}
	}

	async componentDidMount(){
		let campaign = {};
		let characters = [];
		try{
			campaign = await getCampaignData(this.props.match.params.id);
			characters = await getCampaignCharacters(this.props.match.params.id);
		} catch (e){
			console.error(e);
		} finally {
			this.setState({
				campaign,
				characters
			})
		}
	}

	async removeCharacter(id){
		console.log(id);
		let { characters } = this.state;
		characters = characters.filter(character => character.id !== id);
		await removeCharacterFromCampaign(this.state.campaign.id, id)
		this.setState({
			characters
		})
	}

	render(){
		return(
			<div className='campaign-characters-wrapper'>
				<Button bsStyle='success'><Link to={`/campaigns/${this.state.campaign.id}/add`}>Add Characters to Campaign</Link></Button>
				<div className='campaign-characters-name'>
					<h2>{this.state.campaign.name}</h2>
				</div>
				<div className='campaign-characters-characters'>
					{this.state.characters.length > 0 ?
						this.state.characters.map(character => (
							<div key={character.id} className='campaign-characters-unique'>
								<p>{character.name}</p>
								<p>Level {character.level}</p>
								<p>{character.clas.toUpperCase()}</p>
								<p>HP: {character.stats.hp}</p>
								<p>XP: {character.stats.xp}</p>
								<button onClick={()=>this.removeCharacter(character.id)}>Remove Character from Campaign</button>
							</div>
						)) : null}
				</div>
			</div>
		)
	}
}
