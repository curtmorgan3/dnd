import React from 'react';
import { Link } from 'react-router-dom';

export default function Campaigns(props){

	return(
		<div>
			<Link to='/campaigns/new'>Start a New Campaign</Link>
		</div>
	)
}
