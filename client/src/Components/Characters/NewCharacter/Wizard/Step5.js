import React from 'react';
import {FormGroup, DropdownButton, MenuItem} from 'react-bootstrap';
import { getClassStats } from '../../../../dnd-helpers.js';

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
		equipmentPackage = equipmentPackage.filter(equip => equip.unique !== equipment.unique)

		equipmentPackage.forEach((equip,i) => {
			if(equip.suboption === equipment.suboption){
				if(equip.option === equipment.option){
					chosenEquipment.push(equip);
					equipmentPackage = equipmentPackage.filter(piece => piece.unique !== equip.unique)
				};
			}else if(equip.suboption !== equipment.suboption){
				if(equip.option === equipment.option){
					equipmentPackage = equipmentPackage.filter(piece => piece.unique !== equip.unique)
				}
			}
		});
		this.setState({
			chosenEquipment,
			equipmentPackage
		})
	}

	nextStep(){
		const data = {
			equipment: this.state.chosenEquipment
		};
		this.props.handleStepChange('step5', data);
		this.props.finishCharacter();
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
