import React from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { postNewCampaign } from '../../../api-helpers.js';
import './stylesheet.css';

export default class NewCampaign extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
		}
	};

	render(){
		return(
			<div className='new-campaign-wrapper'>
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
			</div>
		)
	}
}
