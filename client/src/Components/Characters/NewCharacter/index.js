import React from 'react';
import { FormControl } from 'react-bootstrap';
import StepWizard  from 'react-step-wizard';
import Step1 from './Wizard/Step1.js';
import Step2 from './Wizard/Step2.js';
import './stylesheet.css';

export default class NewCharacter extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			step1: {},
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
	}

	render(){
		return(
			<div className='new-character-wrapper'>
				<StepWizard>
					<Step1 />
					<Step2 />
				</StepWizard>
			</div>
		)
	}
}
