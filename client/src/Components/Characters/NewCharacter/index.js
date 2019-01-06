import React from 'react';
import StepWizard  from 'react-step-wizard';
import FinishedCharacter from './FinishedCharacter';
import Step1 from './Wizard/Step1.js';
import Step2 from './Wizard/Step2.js';
import Step3 from './Wizard/Step3.js';
import Step4 from './Wizard/Step4.js';
import './stylesheet.css';

export default class NewCharacter extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			step1: {},
			step2: {},
			step3: {},
			step4: {},
			finished: false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleStepChange = this.handleStepChange.bind(this);
		this.finishCharacter = this.finishCharacter.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
	}
	handleStepChange(step, data){
		this.setState({
			[step]: data
		})
	}
	finishCharacter(){
		this.setState({
			finished: true
		})
	}

	render(){
		return(
			<div className='new-character-wrapper'>
				{!this.state.finished ? (
					<StepWizard>
						<Step1 handleStepChange={this.handleStepChange}
									 state={this.state}
						/>
						<Step2 handleStepChange={this.handleStepChange}
									 state={this.state}
						/>
						<Step3 handleStepChange={this.handleStepChange}
									 state={this.state}
						/>
						<Step4 handleStepChange={this.handleStepChange}
									 state={this.state}
									 finishCharacter={this.finishCharacter}
						/>
					</StepWizard>
				) : (
					<FinishedCharacter data={this.state}/>
				)}

			</div>
		)
	}
}
