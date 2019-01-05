import React from 'react';
import {FormControl, FormGroup, ControlLabel, Checkbox, Radio, DropdownButton, MenuItem} from 'react-bootstrap';

export default class Step1 extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			class: '',
			race: 'human',
			alignment: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.chooseRace = this.chooseRace.bind(this);
	}
	chooseRace(e){
		this.setState({
			race: e
		})
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
		const races = ['Human', 'Dwarf', 'Elf', 'Halfling', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling']
		return(
			<div>
				<form>
					<FormGroup>
						<ControlLabel>Name</ControlLabel>
						<FormControl type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup>
						<DropdownButton onSelect={this.chooseRace} title={this.state.race.charAt(0).toUpperCase() + this.state.race.slice(1)}>
							{races.map(race => (
								<MenuItem eventKey={race.toLowerCase()}>{race}</MenuItem>
							))}
						</DropdownButton>
    			</FormGroup>
				</form>
				<button onClick={()=> this.props.previousStep()}>Back</button>
				<button onClick={()=> this.props.nextStep()}>Next</button>
			</div>
		)
	}
};
