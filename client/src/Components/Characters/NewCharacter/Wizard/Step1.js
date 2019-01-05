import React from 'react';
import {FormControl, FormGroup, ControlLabel, Checkbox, Radio, DropdownButton, MenuItem} from 'react-bootstrap';

export default class Step1 extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			clas: 'barbarian',
			race: 'human',
			alignment: 'good',
			subAlignment: 'lawful'
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.chooseRace = this.chooseRace.bind(this);
		this.chooseClass = this.chooseClass.bind(this);
		this.chooseAlignment = this.chooseAlignment.bind(this);
		this.chooseSubAlignment = this.chooseSubAlignment.bind(this);

	}
	chooseRace(e){
		this.setState({
			race: e
		})
	}
	chooseClass(e){
		this.setState({
			clas: e
		})
	}
	chooseAlignment(e){
		this.setState({
			alignment: e
		})
	}
	chooseSubAlignment(e){
		this.setState({
			subAlignment: e
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
		const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard']
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
					<FormGroup>
						<DropdownButton onSelect={this.chooseClass} title={this.state.clas.charAt(0).toUpperCase() + this.state.clas.slice(1)}>
							{classes.map(clas => (
								<MenuItem eventKey={clas.toLowerCase()}>{clas}</MenuItem>
							))}
						</DropdownButton>
    			</FormGroup>
					<FormGroup>
					<DropdownButton onSelect={this.chooseSubAlignment} title={this.state.subAlignment.charAt(0).toUpperCase() + this.state.subAlignment.slice(1)}>
						<MenuItem eventKey='lawful'>Lawful</MenuItem>
						<MenuItem eventKey='neutral'>Nuetral</MenuItem>
						<MenuItem eventKey='chaotic'>Chaotic</MenuItem>
					</DropdownButton>
						<DropdownButton onSelect={this.chooseAlignment} title={this.state.alignment.charAt(0).toUpperCase() + this.state.alignment.slice(1)}>
							<MenuItem eventKey='good'>Good</MenuItem>
							<MenuItem eventKey='neutral'>Neutral</MenuItem>
							<MenuItem eventKey='evil'>Evil</MenuItem>
						</DropdownButton>
					</FormGroup>
				</form>
				<button onClick={()=> this.props.previousStep()}>Back</button>
				<button onClick={()=> this.props.nextStep()}>Next</button>
			</div>
		)
	}
};
