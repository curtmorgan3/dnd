import React from 'react';
import {FormControl, Checkbox, Radio} from 'react-bootstrap';

export default class Step2 extends React.Component{
	constructor(props){
		super(props);
		this.state = {

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
				<h1>Attributes</h1>
				<h2>{this.props.state.step1.name}</h2>
				<h2>{this.props.state.step1.clas}</h2>
				<form>
					<FormControl type='text' name='name' value={this.state.name} />
				</form>
				<button onClick={()=> this.props.previousStep()}>Back</button>
				<button onClick={()=> this.props.nextStep()}>Next</button>
			</div>
		)
	}
};
