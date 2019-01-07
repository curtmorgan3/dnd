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
		console.log('equipment');
		let { chosenEquipment } = this.state;
		let { equipmentPackage } = this.state;

		if (equipment.option){
			chosenEquipment.push(equipment);
			equipmentPackage = equipmentPackage.filter(equip => equip.name !== equipment.name)


			equipmentPackage.filter((piece, i) => {
				if(piece.suboption === equipment.suboption && piece.option === equipment.option){
					chosenEquipment.push(piece);
					equipmentPackage.splice(i, 1);
				}else if(piece.suboption !== equipment.suboption && piece.option === equipment.option){
					equipmentPackage.splice(i, 1);
				}
			})

			// equipmentPackage.forEach((equip,i) => {
			// 	if(equip.suboption === equipment.suboption && equip.option === equipment.option){
			// 		chosenEquipment.push(equip);
			// 		equipmentPackage.splice(i, 1);
			// 	}else if(equip.suboption !== equipment.suboption && equip.option === equipment.option){
			// 		equipmentPackage.splice(i, 1);
			// 	}
			// });
		} else {
			chosenEquipment.push(equipment);
			equipmentPackage = equipmentPackage.filter(equip => equip.name !== equipment.name);
		}
		this.setState({
			chosenEquipment,
			equipmentPackage
		})
	}

	nextStep(){
		const data = {
			equipmentPackage: {}
		};
		this.props.handleStepChange('step5', data);
		this.props.finishCharacter();
	};

	render(){
		return(
			<div>
				<h1>Step 5</h1>
				<button onClick={()=> this.populateEquipment()}>View Equipment Package</button>
				{this.state.equipmentPackage.length > 0 ? (
					this.state.equipmentPackage.map(equipment => {
						return(
							<div>
								<p onClick={()=> this.selectEquipment(equipment)}>{equipment.name}</p>
								<p>{equipment.num}</p>
							</div>
						)
					})
				) : null}
				<button onClick={()=> this.props.previousStep()}>Back</button>
				<button onClick={()=> this.nextStep()}>Save and Next Step</button>
			</div>
		)
	}
}
