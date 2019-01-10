import React from 'react';
import { Link } from 'react-router-dom';
import './stylesheet.css';

export default function Campaigns(props){
	const userCampaigns = props.campaigns;
	return(
		<div className='campaign-wrapper'>
			<Link to='/campaigns/new'>Start a New Campaign</Link>
			<div>
				{userCampaigns ?
					userCampaigns.map(campaign => (
					<div key={campaign.id} className='campaign-unique'>
						<p>{campaign.name}</p>
						<Link className='campaign-link' to={`/campaigns/${campaign.id}/characters`}>View Details and Characters</Link>
					</div>
				)) : null}
			</div>
		</div>
	)
}
