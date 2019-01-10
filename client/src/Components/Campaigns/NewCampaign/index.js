import React from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { postNewCampaign } from '../../../api-helpers.js';
import './stylesheet.css';

export default class NewCampaign extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			completed: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		this.setState({
			completed: false
		})
	}
	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		})
	};
	async handleSubmit(e){
		e.preventDefault();
		const data = {
			name: this.state.name
		}
		try{
			await postNewCampaign(data);
		} catch (e) {
			console.error(e)
		}finally{
			this.setState({
				completed: true
			})
		}
	};

	render(){
		return(
			<div className='new-campaign-wrapper'>
				{this.state.completed ? (
					<Redirect to='/campaigns' />
				) : (
					<form>
						<FormControl
							type='text'
							name='name'
							value={this.state.name}
							placeholder='Campaign Name'
							onChange={this.handleChange}
						>
						</FormControl>
						<Button onClick={this.handleSubmit} bsStyle="success">Start Campaign</Button>
					</form>
				)}
			</div>
		)
	}
}
