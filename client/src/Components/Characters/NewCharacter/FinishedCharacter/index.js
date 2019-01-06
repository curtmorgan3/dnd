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
			skillProfs: [],
			maxHP: 0,
			hp: 0,
		}
		//Bindings
	}

	componentDidMount(){
		const mods = getAbilityModifiers(this.state.abilities);
		const ac = getAC(mods.dex);
		const speed = getSpeed(this.state.race);
		const classStats = getClassStats(this.state.clas);
		const maxHP = classStats.hitDie + mods.con;
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
			maxHP ,
			hp: maxHP
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
					<h4>Abilities</h4>
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
				<div className='saving-throws'>
					<p>Inspiration: {this.state.inspiration}</p>
					<p>Proficiency Bonus: {this.state.proficiencyBonus}</p>
					<h4>Saving Throws</h4>
					<div>
						{this.state.savingThrows.includes('str') ? <p>Yes</p> : <p>No</p>}
						<p>Strength: {this.state.abilityMods.str}</p>
					</div>
					<div>
						{this.state.savingThrows.includes('dex') ? <p>Yes</p> : <p>No</p>}
						<p>Dexterity: {this.state.abilityMods.dex}</p>
					</div>
					<div>
						{this.state.savingThrows.includes('con') ? <p>Yes</p> : <p>No</p>}
						<p>Constituion: {this.state.abilityMods.con}</p>
					</div>
					<div>
						{this.state.savingThrows.includes('int') ? <p>Yes</p> : <p>No</p>}
						<p>Intelligence: {this.state.abilityMods.int}</p>
					</div>
					<div>
						{this.state.savingThrows.includes('wis') ? <p>Yes</p> : <p>No</p>}
						<p>Wisdom: {this.state.abilityMods.wis}</p>
					</div>
					<div>
						{this.state.savingThrows.includes('cha') ? <p>Yes</p> : <p>No</p>}
						<p>Charisma: {this.state.abilityMods.cha}</p>
					</div>
				</div>
				<div className='character-traits'>
					<div>
						<h4>Personality Traits</h4>
						<p>{this.state.personalityTraits}</p>
					</div>
					<div>
						<h4>Ideals</h4>
						<p>{this.state.ideals}</p>
					</div>
					<div>
						<h4>Bonds</h4>
						<p>{this.state.bonds}</p>
					</div>
					<div>
						<h4>Flaws</h4>
						<p>{this.state.flaws}</p>
					</div>
				</div>
				<div className='defense-stats'>
					<h4>Defensive Stats</h4>
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
						<p>Max Hit Points: {this.state.maxHP}</p>
						<p>Current Hit Points: {this.state.hp}</p>
					</div>
					<div className='hitDie-throws'>
						<div>
							<p>Hit Die</p>
							<p>d{this.state.hitDie}</p>
						</div>
						<div>
							<p>Death Saves</p>
							<p>Success: </p>
							<p>Failure: </p>
						</div>
					</div>
				</div>
				<div className='skills'>
					<h4>Skills</h4>
					<div>
						{this.state.skillProfs.includes('acrobatics') ? <p>Yes</p> : <p>No</p>}
						<p>Acrobatics: {this.state.abilityMods.dex} (dex)</p>
					</div>
					<div>
						{this.state.skillProfs.includes('animal_handling') ? <p>Yes</p> : <p>No</p>}
						<p>Animal Handling: {this.state.abilityMods.wis} (wis)</p>
					</div>
					<div>
						{this.state.skillProfs.includes('arcana') ? <p>Yes</p> : <p>No</p>}
						<p>Arcana: {this.state.abilityMods.int} (int)</p>
					</div>
					<div>
						{this.state.skillProfs.includes('athletics') ? <p>Yes</p> : <p>No</p>}
						<p>Athletics: {this.state.abilityMods.str} (str)</p>
					</div>
					<div>
						{this.state.skillProfs.includes('deception') ? <p>Yes</p> : <p>No</p>}
						<p>Deception: {this.state.abilityMods.cha} (cha)</p>
					</div>
					<div>
						{this.state.skillProfs.includes('history') ? <p>Yes</p> : <p>No</p>}
						<p>History: {this.state.abilityMods.int} (int)</p>
					</div>
					<div>
						{this.state.skillProfs.includes('insight') ? <p>Yes</p> : <p>No</p>}
						<p>Insight: {this.state.abilityMods.wis} (wis)</p>
					</div>
					<div>
						{this.state.skillProfs.includes('intimidation') ? <p>Yes</p> : <p>No</p>}
						<p>Intimidation: {this.state.abilityMods.cha} (cha)</p>
					</div>
					<div>
						{this.state.skillProfs.includes('investigation') ? <p>Yes</p> : <p>No</p>}
						<p>Investigation: {this.state.abilityMods.int} (int)</p>
					</div>
					<div>
						{this.state.skillProfs.includes('medicine') ? <p>Yes</p> : <p>No</p>}
						<p>Medicine: {this.state.abilityMods.wis} (wis)</p>
					</div>
					<div>
						{this.state.skillProfs.includes('nature') ? <p>Yes</p> : <p>No</p>}
						<p>Nature: {this.state.abilityMods.int} (int)</p>
					</div>
					<div>
						{this.state.skillProfs.includes('perception') ? <p>Yes</p> : <p>No</p>}
						<p>Perception: {this.state.abilityMods.wis} (wis)</p>
					</div>
					<div>
						{this.state.skillProfs.includes('performance') ? <p>Yes</p> : <p>No</p>}
						<p>Performance: {this.state.abilityMods.cha} (cha)</p>
					</div>
					<div>
						{this.state.skillProfs.includes('persuasion') ? <p>Yes</p> : <p>No</p>}
						<p>Persuasion: {this.state.abilityMods.cha} (cha)</p>
					</div>
					<div>
						{this.state.skillProfs.includes('religion') ? <p>Yes</p> : <p>No</p>}
						<p>Relgion: {this.state.abilityMods.int} (int)</p>
					</div>
					<div>
						{this.state.skillProfs.includes('sleight_of_hand') ? <p>Yes</p> : <p>No</p>}
						<p>Sleight of Hand: {this.state.abilityMods.dex} (dex)</p>
					</div>
					<div>
						{this.state.skillProfs.includes('stealth') ? <p>Yes</p> : <p>No</p>}
						<p>Stealth: {this.state.abilityMods.dex} (dex)</p>
					</div>
					<div>
						{this.state.skillProfs.includes('survival') ? <p>Yes</p> : <p>No</p>}
						<p>Survival: {this.state.abilityMods.wis} (wis)</p>
					</div>
				</div>
			</div>
		)
	}
};
