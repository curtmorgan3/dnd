import React from 'react';
import { getCampaignData, getCampaignCharacters } from '../../../api-helpers.js';

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
					{this.state.characters.length > 1 ?
						this.state.characters.map(character => (
							<div key={character.id}>
								<p>{character.name}</p>
								<p>level {character.level}</p>
								<p>{character.clas}</p>
							</div>
						)) : <p>Loading...</p>
					}
				</div>
			</div>
		)
	}
}
