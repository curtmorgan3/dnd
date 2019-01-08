import React from 'react';
import { getCampaignData, getCampaignCharacters } from '../../../api-helpers.js';
import { Link } from 'react-router-dom';

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

	render(){
		return(
			<div>
				<div>
					<h3>{this.state.campaign.name}</h3>
				</div>
				<div>
					<h5>Characters</h5>
					{this.state.characters.length > 0 ?
						this.state.characters.map(character => (
							<div key={character.id}>
								<p>{character.name}</p>
								<p>level {character.level}</p>
								<p>{character.clas}</p>
								<p>HP: {character.stats.hp}</p>
								<p>XP: {character.stats.xp}</p>
							</div>
						)) : null}
				</div>
				<Link to={`/campaigns/${this.state.campaign.id}/add`}>Add Characters to Campaign</Link>
			</div>
		)
	}
}
