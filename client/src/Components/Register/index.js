import React from 'react';
import './stylesheet.css';
import { FormControl } from 'react-bootstrap';
import axios from 'axios';

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
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	async handleSubmit(e){
		e.preventDefault();
		const data = {user: {
			email: this.state.email,
			password: this.state.password,
			username: this.state.username
		}}
		try{
			const userPromise = await axios.post('/users', data);
			const userData = {auth: {
				email: userPromise.data.email,
				password: this.state.password
			}}
			const token = await axios.post('user_token', userData);
			console.log(token.data.jwt);
			localStorage.setItem('dnd_token', token.data.jwt)
		}catch (e){
			console.error(e);
		}
	}
	render(){
		return(
			<div className='register-form-wrapper'>
				<form className='register-form' onSubmit={this.handleSubmit}>
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
