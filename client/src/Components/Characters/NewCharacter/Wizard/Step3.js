import React from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

export default class Step3 extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			personality: '',
			ideals: '',
			bonds: '',
			flaws: '',
			languages: [],
			availableLanguages: ['common', 'dwarvish', 'elvish', 'giant', 'gnomish', 'goblin', 'halfling', 'orc'],
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.nextStep = this.nextStep.bind(this);
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		})
	};
	handleSelect(e){
		const selection = e.target.value;
		console.log(selection);
		let languages = this.state.languages;
		if (!languages.includes(selection)){
			languages.push(selection);
		}
		this.setState({
			languages
		})
	}
	nextStep(){
		const data = {
			personality: this.state.personality,
			ideals: this.state.ideals,
			bonds: this.state.bonds,
			flaws: this.state.flaws,
			languages: this.state.languages
		}
		this.props.handleStepChange('step3', data);
		this.props.nextStep();
	}

	render(){
		return(
			<div className='step3'>
				<form className='step3-form'>
					<FormGroup>
						<ControlLabel>Personality Traits</ControlLabel>
						<FormControl componentClass='textarea' name='personality' value={this.state.personality} onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Ideals</ControlLabel>
						<FormControl componentClass='textarea' name='ideals' value={this.state.ideals} onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Bonds</ControlLabel>
						<FormControl componentClass='textarea' name='bonds' value={this.state.bonds} onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Flaws</ControlLabel>
						<FormControl componentClass='textarea' name='flaws' value={this.state.flaws} onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup controlId="formControlsSelectMultiple">
      			<ControlLabel>Multiple select</ControlLabel>
						<FormControl componentClass="select" multiple onChange={this.handleSelect} >
						{this.state.availableLanguages.map(language => (
							<option eventKey={language} value={language}>{language}</option>
						))}
      			</FormControl>
    			</FormGroup>
				</form>
				<button onClick={()=> this.props.previousStep()}>Back</button>
				<button onClick={()=> this.nextStep()}>Save and Submit</button>
			</div>
		)
	}
};
