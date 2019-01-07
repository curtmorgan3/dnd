import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default function NavBar(props){
	const loggedIn = localStorage.getItem('dnd_token') ? true : false;

	return(
		<div>
		{loggedIn ? (
			<Navbar inverse={true}>
				<Nav>
					<NavItem>
						<Link to='/'>Home</Link>
					</NavItem>
					<NavItem>
						<Link to='/characters'>My Characters</Link>
					</NavItem>
					<NavItem onClick={() => props.signOut()}>
						Sign Out
					</NavItem>
				</Nav>
			</Navbar>
		) : (
			<Navbar inverse={true}>
				<Nav>
					<NavItem>
						<Link to='/'>Home</Link>
					</NavItem>
					<NavItem>
						<Link to='/login'>Login</Link>
					</NavItem>
					<NavItem>
						<Link to='/register'>Register</Link>
					</NavItem>
				</Nav>
			</Navbar>
		)}

		</div>
	)
}
