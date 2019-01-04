import React from 'react';
import Register from '../Register';

export default function Landing(props){
	const loggedIn = localStorage.getItem('dnd_token') ? true : false;


	return(
		<div>
			{loggedIn ? (
				<h1>Logged In</h1>
			) : (
				<div>
					<h1>Welcome to Table Top Companion</h1>
					<Register />
				</div>
			)}
		</div>
	)
}
