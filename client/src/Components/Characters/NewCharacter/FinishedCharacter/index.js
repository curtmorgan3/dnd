import React from 'react';
import './stylesheet.css';
import { getAbilityModifiers, getAC, getSpeed, getClassStats, getSkillModifiers, getStartingGold, getCharacterFeatures } from '../../../../dnd-helpers.js';
import { postNewCharacter } from '../../../../api-helpers.js';

export default class FinishedCharacter extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: this.props.data.step1.name,
			level: 1,
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
			features: [],
			inspiration: 0,
			proficiencyBonus: 2,
			ac: 0,
			initiative: 0,
			speed: 0,
			hitDie: 0,
			armorProfs: [],
			weaponProfs: [],
			skillProfs: this.props.data.step4.skills,
			skills: {},
			maxHP: 0,
			hp: 0,
			equipment: this.props.data.step5.equipment,
			languages: this.props.data.step3.languages,
			gold: 0,
		}
		//Bindings
		this.saveCharacter = this.saveCharacter.bind(this);
	}

	componentDidMount(){
		const mods = getAbilityModifiers(this.state.abilities);
		const abilityMods = {
			str: mods.str,
			dex: mods.dex,
			con: mods.con,
			int: mods.int,
			wis: mods.wis,
			cha: mods.cha
		};
		const skills = getSkillModifiers(this.state.skillProfs, abilityMods, this.state.proficiencyBonus)
		const ac = getAC(mods.dex);
		const speed = getSpeed(this.state.race);
		const classStats = getClassStats(this.state.clas);
		const {dice, num, multi}= classStats.startingCoin;
		const gold = getStartingGold(dice, num, multi);
		const maxHP = classStats.hitDie + mods.con;
		this.setState({
			abilityMods,
			ac,
			initiative: mods.dex,
			speed,
			hitDie: classStats.hitDie,
			primaryAbility: classStats.primaryAbility,
			savingThrows: classStats.savingThrows,
			armorProfs: classStats.armorProfs,
			weaponProfs: classStats.weaponProfs,
			maxHP ,
			hp: maxHP,
			skills,
			gold
		})
	}

	async saveCharacter(){
		let features = [];
		try{
			features = await getCharacterFeatures(this.state.clas, this.state.level);
		}finally{
			const stats = {
				name: this.state.name,
				clas: this.state.clas,
				level: this.state.level,
				data: JSON.stringify({
					xp: this.state.xp,
					background: this.state.background,
					race: this.state.race,
					primaryAbility: this.state.primaryAbility,
					savingThrows: this.state.savingThrows,
					alignment: this.state.alignment,
					personalityTraits: this.state.personalityTraits,
					ideals: this.state.ideals,
					bonds: this.state.bonds,
					flaws: this.state.flaws,
					abilities: this.state.abilities,
					abilityMods: this.state.abilityMods,
					features: features,
					inspiration: this.state.inspiration,
					initiative: this.state.initiative,
					speed: this.state.speed,
					proficiencyBonus: this.state.proficiencyBonus,
					ac: this.state.ac,
					hp: this.state.hp,
					maxHP: this.state.maxHP,
					hitDie: this.state.hitDie,
					armorProfs: this.state.armorProfs,
					weaponProfs: this.state.weaponProfs,
					skillProfs: this.state.skillProfs,
					skills: this.state.skills,
					equipment: this.state.equipment,
					languages: this.state.languages,
					currency: {
						cp: 0,
						sp: 0,
						ep: 0,
						gp: this.state.gold,
						pp: 0
					}
				})
			}
			await postNewCharacter(stats);
		}
	}

	render(){
		return(
			<div className='new-character-confirm'>
				<div className='new-character-confirm-buttons'>
					<button onClick={this.saveCharacter}>Save Character</button>
				</div>
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
					<div className='skill-list'>
						{Object.keys(this.state.skills).map((skill, i) => {
							let mod = this.state.skills[skill];
							return (
								<div key={skill} className='skill-box'>
									{this.state.skillProfs.includes(skill) ? <p>Yes</p> : <p>No</p>}
									<p>{skill}</p>
									<p>{mod}</p>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		)
	}
};
