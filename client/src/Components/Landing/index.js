import React from 'react';
import Register from '../Register';
import { Jumbotron } from 'react-bootstrap';
import './stylesheet.css';

export default function Landing(props){
	const loggedIn = localStorage.getItem('dnd_token') ? true : false;


	return(
		<div className='landing'>
			{loggedIn && props.currentUser ? (
				<div className='jumbotron'>
					<Jumbotron>
						<h1>Welcome back, {props.currentUser.username}</h1>
					</Jumbotron>
				</div>
			) : (
				<div className='jumbotron'>
					<Jumbotron>
						<h1>Welcome to Table Top Companion</h1>
					</Jumbotron>
					<h4>Register to Start Adventuring</h4>
					<Register />
				</div>
			)}
		</div>
	)
}
