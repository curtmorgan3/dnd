import React from 'react';
import {FormGroup, DropdownButton, MenuItem} from 'react-bootstrap';
import { getClassStats } from '../../../../dnd-helpers.js';
import '../stylesheet.css';

export default class Step4 extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			skills: ['acrobatics', 'nature'], //Remove
			possibleSkills: [],
			num: 0
		}
		this.populateSkills = this.populateSkills.bind(this);
		this.addSkill = this.addSkill.bind(this);
	}

	populateSkills(){
		const classData = getClassStats(this.props.state.step1.clas);
		this.setState({
			possibleSkills: classData.possibleSkills.skills,
			num: classData.possibleSkills.num
		})
	}

	addSkill(e){
		if (this.state.skills.length < this.state.num){
			let skills = this.state.skills;
			skills.push(e);
			this.setState({
				skills
			});
		} else {
			window.alert('You dont have anymore skills!');
		}
	}
	removeSkill(skillToRemove){
		let skills = this.state.skills;
		skills = skills.filter(skill => skill !== skillToRemove)
		this.setState({
			skills
		})
	}

	nextStep(){
		const data = {
			skills: this.state.skills,
		}
		this.props.handleStepChange('step4', data);
		this.props.finishCharacter();
	};

	render(){
		return(
			<div>
				<button onClick={this.populateSkills}>Select Skills</button>
				<div>
					{this.state.skills.map(skill => (
						<div>
							<p>{skill}</p>
							<button onClick={()=>this.removeSkill(skill)}>Remove Skill</button>
						</div>
					))}
				</div>
				{this.state.possibleSkills.length > 0 ? (
					<form>
						<FormGroup>
							<DropdownButton title='Select Skills' onSelect={this.addSkill}>
							{this.state.possibleSkills.map(skill => (
								<MenuItem key={skill} eventKey={skill}>{skill}</MenuItem>
							))}
							</DropdownButton>
						</FormGroup>
					</form>
				) : null}
				<button onClick={()=> this.props.previousStep()}>Back</button>
				<button onClick={()=> this.nextStep()}>Save and Next Step</button>
			</div>
		)
	}
}
