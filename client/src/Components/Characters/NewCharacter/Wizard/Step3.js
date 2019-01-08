import React from 'react';
import {FormControl, FormGroup, ControlLabel, DropdownButton, MenuItem} from 'react-bootstrap';

export default class Step3 extends React.Component{
	constructor(props){
		super(props);
		this.state = { //Remove
			personality: 'Hailing from the Dragonlance setting, Tika Waylan was a brash teenager who had a rough childhood. The daughter of a thief, she ran away from home and practiced her father’s trade on the streets of Solace. When she tried to rob the proprietor of the Inn of the Last Home, he caught her and took her under his wing, giving her a job as a barmaid. But when the dragonarmies laid waste to the town of Solace and destroyed the inn, necessity forced Tika into adventure alongside the friends she’d known from her childhood. Her skill as a fighter (a frying pan remains one of her favorite weapons) combined with her history on the streets gave her skills invaluable in her adventuring career.',
			ideals: 'Tika is nineteen years old at the start of her adventuring career and has auburn hair, green eyes, fair skin with freckles, and a mole on her right hip. Artemis is a small man, compact and all wiry muscle. He has angular features and high cheekbones, and he always seems in need of a shave. His raven-black hair is thick and full, but his eyes are gray and lifeless—betraying the emptiness of his life and soul.',
			bonds: 'Give your character two personality traits. Personality traits are small, simple ways to help you set your character apart from every other character. Your personality traits should tell you something interesting and fun about your character. They should be self-descriptions that are specific about what makes your character stand out. “I’m smart” is not a good trait, because it describes a lot of characters. “I’ve read every book in Candlekeep” tells you something specific about your character’s interests and disposition.',
			flaws: 'Tika Waylan’s bond is to the Inn of the Last Home. The inn’s proprietor gave her a new chance at life, and her friendship with her adventuring companions was forged during her time working there. Its destruction by the marauding dragonarmies gives Tika a very personal reason to hate them with a fiery passion. Her bond might be phrased as “I will do whatever it takes to punish the dragonarmies for the destruction of the Inn of the Last Home.”',
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
			<div>
				<form>
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
