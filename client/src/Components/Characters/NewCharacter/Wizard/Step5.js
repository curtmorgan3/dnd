import React from 'react';
import {FormGroup, DropdownButton, MenuItem} from 'react-bootstrap';
import { getClassStats } from '../../../../dnd-helpers.js';
import { getEquipmentById } from '../../../../api-helpers.js';

export default class Step5 extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			equipmentPackage: [],
			chosenEquipment: [],
		}
	}

	populateEquipment(){
		const classData = getClassStats(this.props.state.step1.clas);
		this.setState({
			equipmentPackage: classData.startingEquipment
		})
	}


	selectEquipment(equipment){
		let { chosenEquipment } = this.state;
		let { equipmentPackage } = this.state;

		chosenEquipment.push(equipment);
		equipmentPackage = equipmentPackage.filter(equip => equip.id !== equipment.id)

		equipmentPackage.forEach((equip,i) => {
			if(equip.suboption === equipment.suboption){
				if(equip.option === equipment.option){
					chosenEquipment.push(equip);
					equipmentPackage = equipmentPackage.filter(piece => piece.id !== equip.id)
				};
			}else if(equip.suboption !== equipment.suboption){
				if(equip.option === equipment.option){
					equipmentPackage = equipmentPackage.filter(piece => piece.id !== equip.id)
				}
			}
		});
		this.setState({
			chosenEquipment,
			equipmentPackage
		})
	}

	async nextStep(){
		let equipment = this.state.chosenEquipment;
		let newEquipment = [];
		try{
			equipment.forEach( async piece  => {
				const newPiece = await getEquipmentById(piece.id);
				const weaponData = JSON.parse(newPiece.data);
				const deserialized = {
					name: newPiece.name,
					id: newPiece.id,
					category: newPiece.category,
					equipment_category: weaponData.equipment_category,
					weapon_category: weaponData.weapon_category,
					armor_category: weaponData.armor_category,
					gear_category: weaponData.gear_category,
					damageDiceType: weaponData.damageDiceType,
					damageDiceNum: weaponData.damageDiceNum,
					damageType: weaponData.damage_type,
					armorType: weaponData.armorType,
					armorDexBonus: weaponData.armorDexBonus,
					armorStrMin: weaponData.armorStrMin,
					armorStealthDisadvantage: weaponData.armorStealthDisadvantage,
					worthNum: weaponData.worthNum,
					worthType: weaponData.worthType,
					weight: weaponData.weight,
					num: 1,
					proficiencyRequired: false,
					range: weaponData.range,
					rangeLong: weaponData.rangeLong,
					properties: weaponData.properties
				}
				newEquipment.push(deserialized);
			})
		}catch (e){
			console.error(e);
		}finally{
			const data = {
				equipment: newEquipment
			};
			this.props.handleStepChange('step5', data);
			this.props.finishCharacter();
		}
	};

	render(){
		return(
			<div>
				<h1>Equipment</h1>
				<div className='step5-chosen-equipment'>
				{this.state.chosenEquipment.map(equipment => {
						return(
							<div>
								<p>{equipment.name}</p>
								<p>Quantity: {equipment.num}</p>
							</div>
						)
					})
				}
				</div>
				<button onClick={()=> this.populateEquipment()}>View Equipment Package</button>
				<div className='step5-equipment-package-wrapper'>
				{this.state.equipmentPackage.length > 0 ? (
					this.state.equipmentPackage.map(equipment => {
						return(
							<div className={`step5-option-${equipment.option}-${equipment.suboption}`}
							>
								<p onClick={()=> this.selectEquipment(equipment)}>{equipment.name}</p>
								<p>Quanitity: {equipment.num}</p>
							</div>
						)
					})
				) : null}
				</div>
				<p>Choose One Group (Border Type) Per Color</p>
				<button onClick={()=> this.props.previousStep()}>Back</button>
				<button onClick={()=> this.nextStep()}>Save and Next Step</button>
			</div>
		)
	}
}
