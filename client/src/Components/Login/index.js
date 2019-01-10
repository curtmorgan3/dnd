import React from 'react';
import './stylesheet.css';
import { FormControl } from 'react-bootstrap';
import axios from 'axios';

export default class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			password: '',
			email: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	async handleSubmit(e){
		e.preventDefault();
		const data = {auth: {
			email: this.state.email,
			password: this.state.password
		}};
		try {
			const token = await axios.post('/user_token', data);
			localStorage.setItem('dnd_token', token.data.jwt);
			this.setState({
				password: '',
				email: ''
			})
			this.props.logIn(token.data.jwt);
		} catch (e) {
			console.error(e);
		}

	}
	render(){
		return(
			<div className='login-form-wrapper'>
				<h4>Log In and Return To Your Quest</h4>
				<form className='login-form' onSubmit={this.handleSubmit}>
				<FormControl
					type='email'
					name='email'
					value={this.state.email}
					placeholder='email address'
					onChange={this.handleChange}
				/>
					<FormControl
						type='password'
						name='password'
						value={this.state.password}
						placeholder='password'
						onChange={this.handleChange}
					/>
					<FormControl type='submit' value='Submit' />
				</form>
			</div>
		)
	}
}
