import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default function NavBar(props){

	return(
		<div>
		<Navbar inverse='true'>
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
		</div>
	)
}
