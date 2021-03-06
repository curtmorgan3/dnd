import React from 'react';
import { getCharacterData, updateCharacter } from '../../../api-helpers.js';
import { rollDice } from '../../../dnd-helpers.js';
import {FormGroup, Checkbox, Alert} from 'react-bootstrap';
import './stylesheet.css';

export default class CharacterSheet extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			roll: {result: 0, mod: 0, total: 0},
			attack: {result: 0, mod: 0, total: 0, weaponToAttack: {}},
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
			},
			weapons: []
		}
		this.saveCharacter = this.saveCharacter.bind(this);
		this.handleUnequip = this.handleUnequip.bind(this);
		this.handleEquip = this.handleEquip.bind(this);
		this.handleAttack = this.handleAttack.bind(this);
		this.handleDiscard = this.handleDiscard.bind(this);
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
			weapons: characterStats.weapons,
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
			default :
			return null
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
			default:
			return null
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
				weapons: this.state.weapons,
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
		this.setState({
			roll: {result, mod, total}
		})
	};

	rollAttack(mod, dice, weaponToAttack){
		const result = rollDice(dice, 1);
		const sumOfResult = result.reduce((sum, i) => sum+=i );
		const total = sumOfResult + mod;
		this.setState({
			attack: {result: sumOfResult, mod, total, weaponToAttack}
		})
	}

	handleUnequip(e){
		let weapons = this.state.weapons;
		let equipment = this.state.equipment;
		let weaponToRemove = {};
		this.state.weapons.forEach(weapon => {
			if (weapon.id === parseInt(e.target.value)){
				weaponToRemove = weapon;
			};
		});
		weapons = weapons.filter(weapon => weapon.id !== weaponToRemove.id);
		equipment.push(weaponToRemove);
		this.setState({
			weapons,
			equipment
		})
	};

	handleEquip(e){
		let weapons = this.state.weapons;
		let equipment = this.state.equipment;
		let equipmentToRemove = {};
		this.state.equipment.forEach(piece => {
			if (piece.id === parseInt(e.target.value)){
				equipmentToRemove = piece;
			};
		});
		equipment = equipment.filter(piece => piece.id !== equipmentToRemove.id);
		weapons.push(equipmentToRemove);
		this.setState({
			weapons,
			equipment
		})
	}

	handleDiscard(e){
		console.log(e.target.value);
		let equipment = this.state.equipment;
		equipment = equipment.filter(piece => piece.id !== parseInt(e.target.value));
		console.log(equipment);
		this.setState({
			equipment
		})
	}

	getAttackMod(type){
		let simple = type.toLowerCase();
		if (simple.includes('melee')){
			return 'str'
		}else if (simple.includes('range') || simple.includes('finesse')){
			return 'dex'
		}
	}

	handleAttack(e){
		let weapons = this.state.weapons;
		let mod = 0;
		weapons.forEach(weapon => {
			if(weapon.id === parseInt(e.target.value)){
				const modType = this.getAttackMod(weapon.weapon_category);
				mod = this.state.abilityMods[modType]
				this.rollAttack(mod, 20, weapon);
			}
		});
	}

	handleAlertDismiss(){
		this.setState({
			attack: {result: 0, mod: 0, total: 0, weaponToAttack: {}, damage: 0}
		})
	}

	rollDamage(){
		let result = rollDice(this.state.attack.weaponToAttack.damageDiceType, this.state.attack.weaponToAttack.damageDiceNum);
		let reducedResult = result.reduce((acc, sum) => acc + sum);
		reducedResult += this.state.attack.mod;
		this.setState({
			attack: {
				damage: reducedResult,
				result: this.state.attack.result,
				mod: this.state.attack.mod,
				weaponToAttack: this.state.attack.weaponToAttack,
				total: this.state.attack.total
			}
		})
	}

	render(){
		return(
			<div className='character-sheet'>
				<div className='sheet-buttons'>
					<button onClick={this.saveCharacter}>Save Character</button>
					<p>You rolled a {this.state.roll.result} + {this.state.roll.mod} = {this.state.roll.total}</p>
				</div>
				<div className='sheet-pedigree'>
				<div className='sheet-banner'>
					{this.state.attack.result > 0 ?
						<Alert className='sheet-attack-roll' onDismiss={()=>this.handleAlertDismiss()}
							>You rolled a {this.state.attack.result} + {this.state.attack.mod} = {this.state.attack.total}
							<button className='sheet-alert-button' onClick={()=>this.rollDamage()}>Hit</button>
							<button className='sheet-alert-button' onClick={()=>this.handleAlertDismiss()}>Miss</button></Alert>
							: null}
					{this.state.attack.damage > 0 ?
						<Alert className='sheet-attack-roll' onDismiss={()=>this.handleAlertDismiss()}
							>{this.state.attack.weaponToAttack.name} used for {this.state.attack.damage} damage!
							<button className='sheet-alert-button' onClick={()=>this.handleAlertDismiss()}>Dismiss</button></Alert>
					: null}
				</div>
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
					<div id='sheet-abil-str' onClick={()=>this.rollSave(this.state.abilityMods.str, 20)}>
						<p>Strength: {this.state.abilities.str}</p>
						<p>Modifier: {this.state.abilityMods.str}</p>
					</div>
					<div id='sheet-abil-dex' onClick={()=>this.rollSave(this.state.abilityMods.dex, 20)}>
						<p>Dexterity: {this.state.abilities.dex}</p>
						<p>Modifier: {this.state.abilityMods.dex}</p>
					</div>
					<div id='sheet-abil-con' onClick={()=>this.rollSave(this.state.abilityMods.con, 20)}>
						<p>Constitution: {this.state.abilities.con}</p>
						<p>Modifier: {this.state.abilityMods.con}</p>
					</div>
					<div id='sheet-abil-int' onClick={()=>this.rollSave(this.state.abilityMods.int, 20)}>
						<p>Intelligence: {this.state.abilities.int}</p>
						<p>Modifier: {this.state.abilityMods.int}</p>
					</div>
					<div id='sheet-abil-wis' onClick={()=>this.rollSave(this.state.abilityMods.wis, 20)}>
						<p>Wisdom: {this.state.abilities.wis}</p>
						<p>Modifier: {this.state.abilityMods.wis}</p>
					</div>
					<div id='sheet-abil-cha' onClick={()=>this.rollSave(this.state.abilityMods.cha, 20)}>
						<p>Charisma: {this.state.abilities.cha}</p>
						<p>Modifier: {this.state.abilityMods.cha}</p>
					</div>
				</div>
				<div className='sheet-saving-throws'>
					<div className='sheet-inspiration'>
						<span>Inspiration: {this.state.inspiration}</span>
						<button onClick={()=> this.decrement('inspiration', 1)}>-</button>
						<button onClick={()=> this.increment('inspiration', 1)}>+</button>
					</div>
					<p>Proficiency Bonus: {this.state.proficiencyBonus}</p>
					<h4>Saving Throws</h4>
					<div>
						{this.state.savingThrows.includes('str') ? <p>✓</p> : <p>X</p>}
						{this.state.savingThrows.includes('str') ?
						<p onClick={()=>this.rollSave(this.state.abilityMods.str + this.state.proficiencyBonus, 20)}>Strength</p> :
						<p onClick={()=>this.rollSave(this.state.abilityMods.str, 20)}>Strength</p>}
					</div>
					<div>
						{this.state.savingThrows.includes('dex') ? <p>✓</p> : <p>X</p>}
						{this.state.savingThrows.includes('dex') ?
						<p onClick={()=>this.rollSave(this.state.abilityMods.dex + this.state.proficiencyBonus, 20)}>Dexterity</p> :
						<p onClick={()=>this.rollSave(this.state.abilityMods.dex, 20)}>Dexterity</p>}
					</div>
					<div>
						{this.state.savingThrows.includes('con') ? <p>✓</p> : <p>X</p>}
						{this.state.savingThrows.includes('con') ?
						<p onClick={()=>this.rollSave(this.state.abilityMods.con + this.state.proficiencyBonus, 20)}>Constitution</p> :
						<p onClick={()=>this.rollSave(this.state.abilityMods.con, 20)}>Constitution</p> }
					</div>
					<div>
						{this.state.savingThrows.includes('int') ? <p>✓</p> : <p>X</p>}
						{this.state.savingThrows.includes('int') ?
						<p onClick={()=>this.rollSave(this.state.abilityMods.int + this.state.proficiencyBonus, 20)}>Intelligence</p> :
						<p onClick={()=>this.rollSave(this.state.abilityMods.int, 20)}>Intelligence</p> }
					</div>
					<div>
						{this.state.savingThrows.includes('wis') ? <p>✓</p> : <p>X</p>}
						{this.state.savingThrows.includes('wis') ?
						<p onClick={()=>this.rollSave(this.state.abilityMods.wis + this.state.proficiencyBonus, 20)}>Wisdom</p> :
						<p onClick={()=>this.rollSave(this.state.abilityMods.wis, 20)}>Wisdom</p> }
					</div>
					<div>
						{this.state.savingThrows.includes('cha') ? <p>✓</p> : <p>X</p>}
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
						<div className='sheet-weapons-table'>
							<p>Name |</p>
							<p> Attack Bonus |</p>
							<p> Damage Type |</p>
							<p> Worth</p>
						</div>
							{this.state.weapons.length > 0 ?
								this.state.weapons.map(weapon => (
									<div key={weapon.id} className='sheet-equipped-weapon'>
										<p>{weapon.name}</p>
										<p>{weapon.damageDiceNum}d{weapon.damageDiceType}</p>
										<p>{weapon.damageType}</p>
										<p>{weapon.worthNum}{weapon.worthType}</p>
										<button value={weapon.id} onClick={this.handleAttack}>Attack</button>
										<button value={weapon.id} onClick={this.handleUnequip}>Unequip</button>
									</div>
								)) : null}
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
						<div className='sheet-add-equipment'>
							<h4>Equipment</h4>
							<button>Add Equipment</button>
						</div>
						{this.state.equipment.map(piece => (
							<div className='sheet-equipment-piece'>
								<h6>{piece.name}</h6>
								<p>#{piece.num}</p>
								<button value={piece.id} onClick={this.handleDiscard}>Discard</button>
								<button value={piece.id} onClick={this.handleEquip}>Equip</button>
								<button>-</button>
								<button>+</button>
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
									{this.state.skillProfs.includes(skill) ? <p>✓</p> : <p>X</p>}
									<p>{skill.toUpperCase()}</p>
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
