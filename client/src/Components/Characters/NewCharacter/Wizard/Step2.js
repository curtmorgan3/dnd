import React from 'react';
import {FormControl, Checkbox, Radio} from 'react-bootstrap';

export default class Step2 extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			class: '',
			race: '',
			alignment: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		})
	};
	handleSubmit(e){
		e.preventDefault();

	};

	render(){
		return(
			<div>
				<form>
					<FormControl type='text' name='name' value={this.state.name} />
				</form>
				<button onClick={()=> this.props.previousStep()}>Back</button>
				<button onClick={()=> this.props.nextStep()}>Next</button>
			</div>
		)
	}
};
