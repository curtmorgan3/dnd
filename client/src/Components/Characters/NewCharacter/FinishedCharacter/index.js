import React from 'react';
import './stylesheet.css';
import { getAbilityModifiers, getAC, getSpeed, getClassStats } from '../../../../dnd-helpers.js';

export default class FinishedCharacter extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: this.props.data.step1.name,
			level: 0,
			xp: 0,
			background: '',
			race: this.props.data.step1.race,
			clas: this.props.data.step1.clas,
			primaryAbility: '',
			savingThrows: [],
			alignment: this.props.data.step1.alignment,
			personalityTraits: this.props.data.step3.personality,
			ideals: this.props.data.step3.ideals,
			bonds: this.props.data.step3.bonds,
			flaws: this.props.data.step3.flaws,
			abilities: {
				str: this.props.data.step2.str,
				dex: this.props.data.step2.dex,
				con: this.props.data.step2.con,
				int: this.props.data.step2.int,
				wis: this.props.data.step2.wis,
				cha: this.props.data.step2.cha
			},
			abilityMods: {
				str: 0,
				dex: 0,
				con: 0,
				int: 0,
				wis: 0,
				cha: 0,
			},
			inspiration: 0,
			proficiencyBonus: 2,
			ac: 0,
			initiative: 0,
			hitDie: 0,
			armorProfs: [],
			weaponProfs: [],

		}
		//Bindings
	}

	componentDidMount(){
		const mods = getAbilityModifiers(this.state.abilities);
		const ac = getAC(mods.dex);
		const speed = getSpeed(this.state.race);
		const classStats = getClassStats(this.state.clas);
		this.setState({
			abilityMods: {
				str: mods.str,
				dex: mods.dex,
				con: mods.con,
				int: mods.int,
				wis: mods.wis,
				cha: mods.cha
			},
			ac,
			initiative: mods.dex,
			speed,
			hitDie: classStats.hitDie,
			primaryAbility: classStats.primaryAbility,
			savingThrows: classStats.savingThrows,
			armorProfs: classStats.armorProfs,
			weaponProfs: classStats.weaponProfs,
		})
	}

	render(){
		return(
			<div className='new-character-confirm'>
				<div className='pedigree'>
					<p id='pedigree-name'>Character Name: {this.state.name}</p>
					<div id='pedigree-other1'>
						<p>Class: {this.state.clas}</p>
						<p>Level: {this.state.level}</p>
						<p>Background: {this.state.backgroun}</p>
					</div>
					<div id='pedigree-other2'>
						<p>Race: {this.state.race}</p>
						<p>Alignment: {this.state.alignment}</p>
						<p>Experience Points: {this.state.xp}</p>
					</div>
				</div>
				<div className='abilities'>
					<div id='abil-str'>
						<p>Strength: {this.state.abilities.str}</p>
						<p>Modifier: {this.state.abilityMods.str}</p>
					</div>
					<div id='abil-dex'>
						<p>Dexterity: {this.state.abilities.dex}</p>
						<p>Modifier: {this.state.abilityMods.dex}</p>
					</div>
					<div id='abil-con'>
						<p>Constitution: {this.state.abilities.con}</p>
						<p>Modifier: {this.state.abilityMods.con}</p>
					</div>
					<div id='abil-int'>
						<p>Intelligence: {this.state.abilities.int}</p>
						<p>Modifier: {this.state.abilityMods.int}</p>
					</div>
					<div id='abil-wis'>
						<p>Wisdom: {this.state.abilities.wis}</p>
						<p>Modifier: {this.state.abilityMods.wis}</p>
					</div>
					<div id='abil-cha'>
						<p>Charisma: {this.state.abilities.cha}</p>
						<p>Modifier: {this.state.abilityMods.cha}</p>
					</div>
				</div>
				<div className='prof-insp'>
					<p>Inspiration: {this.state.inspiration}</p>
					<p>Proficiency Bonus: {this.state.proficiencyBonus}</p>
				</div>
				<div className='character-traits'>
					<div>
						<p>Personality Traits</p>
						<p>{this.state.personalityTraits}</p>
					</div>
					<div>
						<p>Ideals</p>
						<p>{this.state.ideals}</p>
					</div>
					<div>
						<p>Bonds</p>
						<p>{this.state.bonds}</p>
					</div>
					<div>
						<p>Flaws</p>
						<p>{this.state.flaws}</p>
					</div>
				</div>
				<div className='defense-stats'>
					<div className='ac-speed'>
						<div>
							<p>Armor Class</p>
							<p>{this.state.ac}</p>
						</div>
						<div>
							<p>Initiative</p>
							<p>+{this.state.initiative}</p>
						</div>
						<div>
							<p>Speed</p>
							<p>{this.state.speed}</p>
						</div>
					</div>
					<div className='hit-points'>
					</div>
					<div className='hitDie-throws'>
					</div>
				</div>
			</div>
		)
	}
};
