import React from 'react';
import { FormControl } from 'react-bootstrap';
import './stylesheet.css';

export default class NewCharacter extends React.Component{
	constructor(props){
		super(props);
		this.state = {

		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render(){
		return(
			<div className='new-character-wrapper'>
				<form className='new-character-form' onSubmit={this.handleSubmit}>
					<FormControl
					/>
					<FormControl
					/>
					<FormControl type='submit' value='Submit' />
						</form>
			</div>
		)
	}
}
