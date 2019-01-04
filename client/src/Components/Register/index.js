import React from 'react';
import './stylesheet.css';
import { FormControl } from 'react-bootstrap';

export default class Register extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			password_con: '',
			email: ''
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	render(){
		return(
			<div className='register-form-wrapper'>
				<form className='register-form'>
					<FormControl
						type='text'
						name='username'
						value={this.state.username}
						placeholder='Choose a username'
						onChange={this.handleChange}
					/>
					<FormControl
						type='password'
						name='password'
						value={this.state.password}
						placeholder='Enter a password'
						onChange={this.handleChange}
					/>
					<FormControl
						type='password'
						name='password_con'
						value={this.state.password_con}
						placeholder='Reenter password'
						onChange={this.handleChange}
					/>
					<FormControl
						type='email'
						name='email'
						value={this.state.email}
						placeholder='Enter your email address'
						onChange={this.handleChange}
					/>
					<FormControl type='submit' value='Submit' />
				</form>
			</div>
		)
	}
}
