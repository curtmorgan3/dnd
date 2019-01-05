import React from 'react';
import StepWizard  from 'react-step-wizard';
import Step1 from './Wizard/Step1.js';
import Step2 from './Wizard/Step2.js';
import './stylesheet.css';

export default class NewCharacter extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			step1: {},
			step2: {},
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleStepChange = this.handleStepChange.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
	}
	handleStepChange(step, data){
		this.setState({
			[step]: data
		})
	}

	render(){
		return(
			<div className='new-character-wrapper'>
				<StepWizard>
					<Step1 handleStepChange={this.handleStepChange}
								 state={this.state}
					/>
					<Step2 handleStepChange={this.handleStepChange}
								 state={this.state}
					/>
				</StepWizard>
			</div>
		)
	}
}
