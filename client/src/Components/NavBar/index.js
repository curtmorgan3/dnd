import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './stylesheet.css';

export default function NavBar(props){
	const loggedIn = localStorage.getItem('dnd_token') ? true : false;

	return(
		<div>
		{loggedIn ? (
			<Navbar inverse={true} className='navbar'>
				<Navbar.Header>
					<Navbar.Toggle />
  			</Navbar.Header>
				<Navbar.Collapse>
				<Nav>
					<NavItem>
						<Link to='/'>Home</Link>
					</NavItem>
					<NavItem>
						<Link to='/characters'>My Characters</Link>
					</NavItem>
					<NavItem>
						<Link to='/campaigns'>My Campaigns</Link>
					</NavItem>
					<NavItem onClick={() => props.signOut()}>
						Sign Out
					</NavItem>
				</Nav>
				</Navbar.Collapse>
			</Navbar>
		) : (
			<Navbar inverse={true} className='navbar'>
				<Navbar.Header>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
				<Nav>
					<NavItem>
						<Link to='/'>Home</Link>
					</NavItem>
					<NavItem>
						<Link to='/login'>Login</Link>
					</NavItem>
				</Nav>
				</Navbar.Collapse>
			</Navbar>
		)}

		</div>
	)
}
