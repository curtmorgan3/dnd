import React from 'react';
import { Link } from 'react-router-dom';

export default function Campaigns(props){
	const userCampaigns = props.campaigns;
	return(
		<div>
			<div>
				{userCampaigns ?
					userCampaigns.map(campaign => (
					<div key={campaign.id}>
						<p>{campaign.name}</p>
						<Link to={`/campaigns/${campaign.id}/characters`}>View Details and Characters</Link>
					</div>
				)) : null}

			</div>
			<Link to='/campaigns/new'>Start a New Campaign</Link>
		</div>
	)
}
