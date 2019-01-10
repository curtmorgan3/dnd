import React from 'react';
import { Link } from 'react-router-dom';
import { getUserCampaigns } from '../../api-helpers.js';
import './stylesheet.css';

export default class Campaigns extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userCampaigns: []
		}
	}
	async componentDidMount(){
		const userCampaigns = await getUserCampaigns();
		this.setState({
			userCampaigns
		})
	}

	render(){
		return(
			<div className='campaign-wrapper'>
				<Link to='/campaigns/new'>Start a New Campaign</Link>
				<div className='campaign-each-wrapper'>
					{this.state.userCampaigns.length > 0 ?
						this.state.userCampaigns.map(campaign => (
						<div key={campaign.id} className='campaign-unique'>
							<p>{campaign.name}</p>
							<Link className='campaign-link' to={`/campaigns/${campaign.id}/characters`}>View Details and Characters</Link>
						</div>
					)) : null}
				</div>
			</div>
		)
	}
}
