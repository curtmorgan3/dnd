import React from 'react';
import { getCharacterData, updateCharacter } from '../../../api-helpers.js';
import { rollDice } from '../../../dnd-helpers.js';
import {FormGroup, Checkbox} from 'react-bootstrap';
import './stylesheet.css';

export default class CharacterSheet extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			level: 1,
			clas: '',
			xp: 0,
			background: '',
			race: '',
			primaryAbility: '',
			savingThrows: [],
			alignment: '',
			personalityTraits: '',
			ideals: '',
			bonds: '',
			flaws: '',
			abilities: {
				str: 0,
				dex: 0,
				con: 0,
				int: 0,
				wis: 0,
				cha: 0
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
			proficiencyBonus: 0,
			ac: 0,
			initiative: 0,
			speed: 0,
			hitDie: 0,
			armorProfs: [],
			weaponProfs: [],
			skillProfs: [],
			skills: {},
			maxHP: 0,
			hp: 0,
			equipment: [],
			languages: [],
			currency: {
				cp: 0,
				sp: 0,
				ep: 0,
				gp: 0,
				pp: 0
			}
		}
		this.saveCharacter = this.saveCharacter.bind(this);
	}

	async componentDidMount(){
		const characterData = await getCharacterData(this.props.match.params.id);
		const characterStats = JSON.parse(characterData.data);
		this.setState({
			name: characterData.name,
			level: characterData.level,
			xp: characterStats.xp,
			background: characterStats.background,
			race: characterStats.race,
			clas: characterData.clas,
			primaryAbility: characterStats.primaryAbility,
			savingThrows: characterStats.savingThrows,
			alignment: characterStats.alignment,
			speed: characterStats.speed,
			personalityTraits: characterStats.personalityTraits,
			ideals: characterStats.ideals,
			bonds: characterStats.bonds,
			flaws: characterStats.flaws,
			abilities: {
				str: characterStats.abilities.str,
				dex: characterStats.abilities.dex,
				con: characterStats.abilities.con,
				int: characterStats.abilities.int,
				wis: characterStats.abilities.wis,
				cha: characterStats.abilities.cha
			},
			abilityMods: {
				str: characterStats.abilityMods.str,
				dex: characterStats.abilityMods.dex,
				con: characterStats.abilityMods.con,
				int: characterStats.abilityMods.int,
				wis: characterStats.abilityMods.wis,
				cha: characterStats.abilityMods.cha,
			},
			features: characterStats.features,
			inspiration: characterStats.inspiration,
			proficiencyBonus: characterStats.proficiencyBonus,
			ac: characterStats.ac,
			initiative: characterStats.initiative,
			hitDie: characterStats.hitDie,
			armorProfs: characterStats.armorProfs,
			weaponProfs: characterStats.weaponProfs,
			skillProfs: characterStats.skillProfs,
			skills: characterStats.skills,
			maxHP: characterStats.maxHP,
			hp: characterStats.hp,
			equipment: characterStats.equipment,
			languages: characterStats.languages,
			currency:{
				cp: characterStats.currency.cp,
				sp: characterStats.currency.sp,
				ep: characterStats.currency.ep,
				gp: characterStats.currency.gp,
				pp: characterStats.currency.pp
			}
		})
	};

	increment(stat, num){
		const key = Object.keys(this.state).filter(prop => prop === stat);
		const prop = key[0];
		let currentValue = this.state[prop];
		let newValue = currentValue += (1 * num)
		if (prop === 'hp'){
			if (newValue >= this.state.maxHP - 1){
				newValue = this.state.maxHP;
			}
		}
		this.setState({
			[prop]: newValue
		});
		let moneyValue = this.state.currency[stat];
		moneyValue += (1 * num);
		switch(stat){
			case 'cp':
				this.setState({
					currency: {'cp': moneyValue, 'sp': this.state.currency.sp, 'ep': this.state.currency.ep, 'gp': this.state.currency.gp, 'pp': this.state.currency.pp}
				})
			break;
			case 'sp':
			this.setState({
				currency: {'cp': this.state.currency.cp, 'sp': moneyValue, 'ep': this.state.currency.ep, 'gp': this.state.currency.gp, 'pp': this.state.currency.pp}
			})
			break;
			case 'ep':
			this.setState({
				currency: {'cp': this.state.currency.cp, 'sp': this.state.currency.sp, 'ep': moneyValue, 'gp': this.state.currency.gp, 'pp': this.state.currency.pp}
			})
			break;
			case 'gp':
			this.setState({
				currency: {'cp': this.state.currency.cp, 'sp': this.state.currency.sp, 'ep': this.state.currency.ep, 'gp': moneyValue, 'pp': this.state.currency.pp}
			})
			break;
			case 'pp':
			this.setState({
				currency: {'cp': this.state.currency.cp, 'sp': this.state.currency.sp, 'ep': this.state.currency.ep, 'gp': this.state.currency.gp, 'pp': moneyValue}
			})
			break;
		}
	};

	decrement(stat, num){
		const key = Object.keys(this.state).filter(prop => prop === stat);
		const prop = key[0];
		let currentValue = this.state[prop];
		let newValue = currentValue -= (1 * num)
		if (prop === 'hp'){
			if (newValue <= 0){
				newValue = 0;
			}
		}
		this.setState({
			[prop]: newValue
		});

		let moneyValue = this.state.currency[stat];
		moneyValue -= (1 * num);
		switch(stat){
			case 'cp':
				this.setState({
					currency: {'cp': moneyValue, 'sp': this.state.currency.sp, 'ep': this.state.currency.ep, 'gp': this.state.currency.gp, 'pp': this.state.currency.pp}
				})
			break;
			case 'sp':
			this.setState({
				currency: {'cp': this.state.currency.cp, 'sp': moneyValue, 'ep': this.state.currency.ep, 'gp': this.state.currency.gp, 'pp': this.state.currency.pp}
			})
			break;
			case 'ep':
			this.setState({
				currency: {'cp': this.state.currency.cp, 'sp': this.state.currency.sp, 'ep': moneyValue, 'gp': this.state.currency.gp, 'pp': this.state.currency.pp}
			})
			break;
			case 'gp':
			this.setState({
				currency: {'cp': this.state.currency.cp, 'sp': this.state.currency.sp, 'ep': this.state.currency.ep, 'gp': moneyValue, 'pp': this.state.currency.pp}
			})
			break;
			case 'pp':
			this.setState({
				currency: {'cp': this.state.currency.cp, 'sp': this.state.currency.sp, 'ep': this.state.currency.ep, 'gp': this.state.currency.gp, 'pp': moneyValue}
			})
			break;
		}
	};

	async saveCharacter(){
		const id = this.props.match.params.id;
		const data = {
			name: this.state.name,
			level: this.state.level,
			clas: this.state.clas,
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
				abilities: {
					str: this.state.abilities.str,
					dex: this.state.abilities.dex,
					con: this.state.abilities.con,
					int: this.state.abilities.int,
					wis: this.state.abilities.wis,
					cha: this.state.abilitiescha,
				},
				abilityMods: {
					str: this.state.abilityMods.str,
					dex: this.state.abilityMods.dex,
					con: this.state.abilityMods.con,
					int: this.state.abilityMods.int,
					wis: this.state.abilityMods.wis,
					cha: this.state.abilityMods.cha,
				},
				features: this.state.features,
				inspiration: this.state.inspiration,
				proficiencyBonus: this.state.proficiencyBonus,
				ac: this.state.ac,
				initiative: this.state.initiative,
				hitDie: this.state.hitDie,
				armorProfs: this.state.armorProfs,
				weaponProfs: this.state.weaponProfs,
				skillProfs: this.state.skillProfs,
				skills: this.state.skills,
				maxHP: this.state.maxHP,
				hp: this.state.hp,
				equipment: this.state.equipment,
				languages: this.state.languages,
				currency:{
					cp: this.state.currency.cp,
					sp: this.state.currency.sp,
					ep: this.state.currency.ep,
					gp: this.state.currency.gp,
					pp: this.state.currency.pp
				}
			})
		}
		await updateCharacter(id, data);
	};

	rollSave(mod, dice){
		const result = rollDice(dice, 1);
		const sumOfResult = result.reduce((sum, i) => sum+=i );
		const total = sumOfResult + mod;
		window.alert(`Mod: ${mod}, dice: ${result}, total: ${total}`)
	}

	render(){
		return(
			<div className='character-sheet'>
				<div className='sheet-buttons'>
					<button onClick={this.saveCharacter}>Save Character</button>
				</div>
				<div className='sheet-pedigree'>
					<p id='sheet-pedigree-name'>Character Name: {this.state.name}</p>
					<div id='sheet-pedigree-other1'>
						<p>Class: {this.state.clas}</p>
						<p>Level: {this.state.level}</p>
						<p>Background: {this.state.background}</p>
					</div>
					<div id='sheet-pedigree-other2'>
						<p>Race: {this.state.race}</p>
						<p>Alignment: {this.state.alignment}</p>
						<div id='sheet-xp'>
							<p>Experience Points: {this.state.xp}</p>
							<button onClick={()=> this.increment('xp', 1)}>+</button>
							<button onClick={()=> this.increment('xp', 25)}>+25</button>
							<button onClick={()=> this.increment('xp', 50)}>+50</button>
						</div>
					</div>
				</div>
				<div className='sheet-abilities'>
					<h4>Abilities</h4>
					<div id='sheet-abil-str'>
						<p>Strength: {this.state.abilities.str}</p>
						<p onClick={()=>this.rollSave(this.state.abilityMods.str, 20)}>Modifier: {this.state.abilityMods.str}</p>
					</div>
					<div id='sheet-abil-dex'>
						<p>Dexterity: {this.state.abilities.dex}</p>
						<p onClick={()=>this.rollSave(this.state.abilityMods.dex, 20)}>Modifier: {this.state.abilityMods.dex}</p>
					</div>
					<div id='sheet-abil-con'>
						<p>Constitution: {this.state.abilities.con}</p>
						<p onClick={()=>this.rollSave(this.state.abilityMods.con, 20)}>Modifier: {this.state.abilityMods.con}</p>
					</div>
					<div id='sheet-abil-int'>
						<p>Intelligence: {this.state.abilities.int}</p>
						<p onClick={()=>this.rollSave(this.state.abilityMods.int, 20)}>Modifier: {this.state.abilityMods.int}</p>
					</div>
					<div id='sheet-abil-wis'>
						<p>Wisdom: {this.state.abilities.wis}</p>
						<p onClick={()=>this.rollSave(this.state.abilityMods.wis, 20)}>Modifier: {this.state.abilityMods.wis}</p>
					</div>
					<div id='sheet-abil-cha'>
						<p>Charisma: {this.state.abilities.cha}</p>
						<p onClick={()=>this.rollSave(this.state.abilityMods.cha, 20)}>Modifier: {this.state.abilityMods.cha}</p>
					</div>
				</div>
				<div className='sheet-saving-throws'>
					<p>Inspiration: {this.state.inspiration}</p>
					<p>Proficiency Bonus: {this.state.proficiencyBonus}</p>
					<h4>Saving Throws</h4>
					<div>
						{this.state.savingThrows.includes('str') ? <p>Yes</p> : <p>No</p>}
						{this.state.savingThrows.includes('str') ?
						<p onClick={()=>this.rollSave(this.state.abilityMods.str + this.state.proficiencyBonus, 20)}>Strength</p> :
						<p onClick={()=>this.rollSave(this.state.abilityMods.str, 20)}>Strength</p>}
					</div>
					<div>
						{this.state.savingThrows.includes('dex') ? <p>Yes</p> : <p>No</p>}
						{this.state.savingThrows.includes('dex') ?
						<p onClick={()=>this.rollSave(this.state.abilityMods.dex + this.state.proficiencyBonus, 20)}>Dexterity</p> :
						<p onClick={()=>this.rollSave(this.state.abilityMods.dex, 20)}>Dexterity</p>}
					</div>
					<div>
						{this.state.savingThrows.includes('con') ? <p>Yes</p> : <p>No</p>}
						{this.state.savingThrows.includes('con') ?
						<p onClick={()=>this.rollSave(this.state.abilityMods.con + this.state.proficiencyBonus, 20)}>Constitution</p> :
						<p onClick={()=>this.rollSave(this.state.abilityMods.con, 20)}>Constitution</p> }
					</div>
					<div>
						{this.state.savingThrows.includes('int') ? <p>Yes</p> : <p>No</p>}
						{this.state.savingThrows.includes('int') ?
						<p onClick={()=>this.rollSave(this.state.abilityMods.int + this.state.proficiencyBonus, 20)}>Intelligence</p> :
						<p onClick={()=>this.rollSave(this.state.abilityMods.int, 20)}>Intelligence</p> }
					</div>
					<div>
						{this.state.savingThrows.includes('wis') ? <p>Yes</p> : <p>No</p>}
						{this.state.savingThrows.includes('wis') ?
						<p onClick={()=>this.rollSave(this.state.abilityMods.wis + this.state.proficiencyBonus, 20)}>Wisdom</p> :
						<p onClick={()=>this.rollSave(this.state.abilityMods.wis, 20)}>Wisdom</p> }
					</div>
					<div>
						{this.state.savingThrows.includes('cha') ? <p>Yes</p> : <p>No</p>}
						{this.state.savingThrows.includes('cha') ?
						<p onClick={()=>this.rollSave(this.state.abilityMods.cha + this.state.proficiencyBonus, 20)}>Charisma</p> :
						<p onClick={()=>this.rollSave(this.state.abilityMods.cha, 20)}>Charisma</p> }
					</div>
				</div>
				<div className='sheet-character-traits'>
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
				<div className='sheet-defense-stats'>
					<h4>Defensive Stats</h4>
					<div className='sheet-ac-speed'>
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
					<div className='sheet-hit-points'>
						<p>Max Hit Points: {this.state.maxHP}</p>
						<button onClick={()=> this.decrement('hp', 1)}>-</button>
						<p>Current Hit Points: {this.state.hp}</p>
						<button onClick={()=> this.increment('hp', 1)}>+</button>
					</div>
					<div className='sheet-hitDie-throws'>
						<div>
							<p>Hit Die</p>
							<p>d{this.state.hitDie}</p>
						</div>
						<div className='sheet-death-throws'>
							<p>Death Saves</p>
							<p>Success: </p>
							<FormGroup>
								<Checkbox inline></Checkbox><Checkbox inline></Checkbox><Checkbox inline></Checkbox>
							</FormGroup>
							<p>Failure: </p>
							<FormGroup>
								<Checkbox inline></Checkbox><Checkbox inline></Checkbox><Checkbox inline></Checkbox>
							</FormGroup>
						</div>
					</div>
				</div>
				<div className='sheet-weapons'>
					<h4>Weapons</h4>
				</div>
				<div className='sheet-items'>
					<div className='sheet-currency'>
						<div>
							<button onClick={()=> this.decrement('cp', 1)}>-</button>
							<button onClick={()=> this.decrement('cp', 25)}>--</button>
							<button onClick={()=> this.decrement('cp', 50)}>---</button>
							<p>Copper: {this.state.currency.cp}</p>
							<button onClick={()=> this.increment('cp', 1)}>+</button>
							<button onClick={()=> this.increment('cp', 25)}>++</button>
							<button onClick={()=> this.increment('cp', 50)}>+++</button>
						</div>
						<div>
							<button onClick={()=> this.decrement('sp', 1)}>-</button>
							<button onClick={()=> this.decrement('sp', 25)}>--</button>
							<button onClick={()=> this.decrement('sp', 50)}>---</button>
							<p>Silver: {this.state.currency.sp}</p>
							<button onClick={()=> this.increment('sp', 1)}>+</button>
							<button onClick={()=> this.increment('sp', 25)}>++</button>
							<button onClick={()=> this.increment('sp', 50)}>+++</button>
						</div>
						<div>
							<button onClick={()=> this.decrement('ep', 1)}>-</button>
							<button onClick={()=> this.decrement('ep', 25)}>--</button>
							<button onClick={()=> this.decrement('ep', 50)}>---</button>
							<p>Electrum: {this.state.currency.ep}</p>
							<button onClick={()=> this.increment('ep', 1)}>+</button>
							<button onClick={()=> this.increment('ep', 25)}>++</button>
							<button onClick={()=> this.increment('ep', 50)}>+++</button>
						</div>
						<div>
							<button onClick={()=> this.decrement('gp', 1)}>-</button>
							<button onClick={()=> this.decrement('gp', 25)}>--</button>
							<button onClick={()=> this.decrement('gp', 50)}>---</button>
							<p>Gold: {this.state.currency.gp}</p>
							<button onClick={()=> this.increment('gp', 1)}>+</button>
							<button onClick={()=> this.increment('gp', 25)}>++</button>
							<button onClick={()=> this.increment('gp', 50)}>+++</button>
						</div>
						<div>
							<button onClick={()=> this.decrement('pp', 1)}>-</button>
							<button onClick={()=> this.decrement('pp', 25)}>--</button>
							<button onClick={()=> this.decrement('pp', 50)}>---</button>
							<p>Platinum: {this.state.currency.pp}</p>
							<button onClick={()=> this.increment('pp', 1)}>+</button>
							<button onClick={()=> this.increment('pp', 25)}>++</button>
							<button onClick={()=> this.increment('pp', 50)}>+++</button>
						</div>
					</div>
					<div className='sheet-equipment'>
						<h4>Equipment</h4>
						{this.state.equipment.map(piece => (
							<div className='sheet-equipment-piece'>
								<h6>{piece.name}</h6>
								<p>#{piece.num}</p>
							</div>
						))}
					</div>
				</div>
				<div className='sheet-skills'>
					<h4>Skills</h4>
					<div className='sheet-skill-list'>
						{Object.keys(this.state.skills).map((skill, i) => {
							let mod = this.state.skills[skill];
							return (
								<div key={skill} className='sheet-skill-box' onClick={()=>this.rollSave(mod, 20)}>
									{this.state.skillProfs.includes(skill) ? <p>Yes</p> : <p>No</p>}
									<p>{skill}</p>
									<p>{mod}</p>
								</div>
							)
						})}
					</div>
				</div>
				<div className='sheet-passive'>
				<div className='sheet-passive-wisdom'>
					<h4>Passive Wisdom:</h4>
					<p>{this.state.abilityMods.wis+10}</p>
				</div>
					<div className='sheet-languages'>
						<h4>Languages</h4>
						{this.state.languages.map(language => (
							<p>{language}</p>
						))}
					</div>
				</div>
				<div className='sheet-feats-traits'>
					<h4>Features and Traits</h4>
						{this.state.features.map(feat => (
						<p key={feat.id}>{feat.name}</p>
					))}
				</div>
			</div>
		)
	}
}
