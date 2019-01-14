import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getUserCampaigns, deleteCampaign } from '../../api-helpers.js';
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
				<Link to='/campaigns/new'><Button bsStyle='primary'>Start a New Campaign</Button></Link>
				<div className='campaign-each-wrapper'>
					{this.state.userCampaigns.length > 0 ?
						this.state.userCampaigns.map(campaign => (
						<div key={campaign.id} className='campaign-unique'>
							<p>{campaign.name}</p>
							<Button bsStyle='success'><Link className='campaign-link' to={`/campaigns/${campaign.id}/characters`}>View Details and Characters</Link></Button>
							<Button bsStyle='danger' onClick={()=>deleteCampaign(campaign.id)}>Delete Campaign</Button>
						</div>
					)) : null}
				</div>
			</div>
		)
	}
}
