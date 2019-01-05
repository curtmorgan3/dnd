import React from 'react';
import {FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

export default class Step3 extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			personality: '',
			ideals: '',
			bonds: '',
			flaws: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.nextStep = this.nextStep.bind(this);
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		})
	};
	nextStep(){
		const data = {
			personality: this.state.personality,
			ideals: this.state.ideals,
			bonds: this.state.bonds,
			flaws: this.state.flaws
		}
		this.props.handleStepChange('step3', data);
		this.props.finishCharacter();
	}

	render(){
		return(
			<div>
				<form>
					<FormGroup>
						<ControlLabel>Personality Traits</ControlLabel>
						<FormControl componentClass='textarea' name='personality' value={this.state.name} onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Ideals</ControlLabel>
						<FormControl componentClass='textarea' name='ideals' value={this.state.name} onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Bonds</ControlLabel>
						<FormControl componentClass='textarea' name='bonds' value={this.state.name} onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Flaws</ControlLabel>
						<FormControl componentClass='textarea' name='flaws' value={this.state.name} onChange={this.handleChange}/>
					</FormGroup>
				</form>
				<button onClick={()=> this.props.previousStep()}>Back</button>
				<button onClick={()=> this.nextStep()}>Save and Submit</button>
			</div>
		)
	}
};
