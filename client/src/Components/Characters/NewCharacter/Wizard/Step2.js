import React from 'react';
import {FormGroup, DropdownButton, MenuItem} from 'react-bootstrap';
import {rollAbilities} from '../../../../dnd-helpers.js';
import '../stylesheet.css';

export default class Step2 extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			abilityScores: [],
			str: 15, //Remove all scores
			dex: 12,
			con: 14,
			int: 12,
			wis: 10,
			cha: 8,
			finished: false,
			started: false

		}
		this.selectStr = this.selectStr.bind(this);
		this.selectDex = this.selectDex.bind(this);
		this.selectCon = this.selectCon.bind(this);
		this.selectInt = this.selectInt.bind(this);
		this.selectWis = this.selectWis.bind(this);
		this.selectCha = this.selectCha.bind(this);
	}

	componentDidMount(){
		if (this.state.abilityScores.length <= 1 && this.state.started){
			this.setState({
				finished: true
			})
			// console.log('finished');
		}else{
			// console.log('not finished');
		}
	}
	rollForAbilities(){
		const abilityScores = rollAbilities();
		this.setState({
			abilityScores
		})
	}
	selectStr(e){
		const length = this.state.abilityScores.length;
		const newScores = this.state.abilityScores.filter(score => score !== e)
		if (newScores.length !== length - 1){
			for (let i = 0; i< length - newScores.length; i++){
				newScores.push(e);
			}
		}
		this.setState({
			str: e,
			abilityScores: newScores,
			started: true
		})
	}
	selectDex(e){
		const length = this.state.abilityScores.length;
		const newScores = this.state.abilityScores.filter(score => score !== e)
		if (newScores.length !== length - 1){
			for (let i = 0; i< length - newScores.length; i++){
				newScores.push(e);
			}
		}
		this.setState({
			dex: e,
			abilityScores: newScores,
			started: true
		})
	}
	selectCon(e){
		const length = this.state.abilityScores.length;
		const newScores = this.state.abilityScores.filter(score => score !== e)
		if (newScores.length !== length - 1){
			for (let i = 0; i< length - newScores.length; i++){
				newScores.push(e);
			}
		}
		this.setState({
			con: e,
			abilityScores: newScores,
			started: true
		})
	}
	selectInt(e){
		const length = this.state.abilityScores.length;
		const newScores = this.state.abilityScores.filter(score => score !== e)
		if (newScores.length !== length - 1){
			for (let i = 0; i< length - newScores.length; i++){
				newScores.push(e);
			}
		}
		this.setState({
			int: e,
			abilityScores: newScores,
			started: true
		})
	}
	selectWis(e){
		const length = this.state.abilityScores.length;
		const newScores = this.state.abilityScores.filter(score => score !== e)
		if (newScores.length !== length - 1){
			for (let i = 0; i< length - newScores.length; i++){
				newScores.push(e);
			}
		}
		this.setState({
			wis: e,
			abilityScores: newScores,
			started: true
		})
	}
	selectCha(e){
		const length = this.state.abilityScores.length;
		const newScores = this.state.abilityScores.filter(score => score !== e)
		if (newScores.length !== length - 1){
			for (let i = 0; i< length - newScores.length; i++){
				newScores.push(e);
			}
		}
		this.setState({
			cha: e,
			abilityScores: newScores,
			started: true
		})
	}
	nextStep(){
		if (this.state.abilityScores.length > 0 ){
			window.alert('Select all your abilities!');
		}else {
			const data = {
				str: this.state.str,
				dex: this.state.dex,
				con: this.state.con,
				int: this.state.int,
				wis: this.state.wis,
				cha: this.state.cha
			}
			this.props.handleStepChange('step2', data);
			this.props.nextStep();
		}
	};
	render(){
		return(
			<div>
				<div className='step2-ability-header'>
					<h1>Abilities</h1>
					<h4>{this.props.state.step1.name}</h4>
					<h4>{this.props.state.step1.clas}</h4>
					{this.state.abilityScores.length < 1 && !this.state.finished ?
						<button onClick={()=> this.rollForAbilities()}>Roll Abilities</button>
						: null }
				</div>
				<div className='step2-ability-scores'>
					{this.state.abilityScores.map((score, i) => (
						<p key={i}>{score}</p>
					))}
				</div>
				<form>
					<FormGroup>
						<DropdownButton title={`Strength: ${this.state.str}`} onSelect={this.selectStr}>
							{this.state.abilityScores.map((score, i) => (
								<MenuItem key={i} eventKey={score}>{score}</MenuItem>
							))}
						</DropdownButton>
						<DropdownButton title={`Dexterity: ${this.state.dex}`} onSelect={this.selectDex}>
							{this.state.abilityScores.map((score, i) => (
								<MenuItem key={i} eventKey={score}>{score}</MenuItem>
							))}
						</DropdownButton>
						<DropdownButton title={`Constitution: ${this.state.con}`} onSelect={this.selectCon}>
							{this.state.abilityScores.map((score, i) => (
								<MenuItem key={i} eventKey={score}>{score}</MenuItem>
							))}
						</DropdownButton>
						<DropdownButton title={`Intelligence: ${this.state.int}`} onSelect={this.selectInt}>
							{this.state.abilityScores.map((score, i) => (
								<MenuItem key={i} eventKey={score}>{score}</MenuItem>
							))}
						</DropdownButton>
						<DropdownButton title={`Wisdom: ${this.state.wis}`} onSelect={this.selectWis}>
							{this.state.abilityScores.map((score, i) => (
								<MenuItem key={i} eventKey={score}>{score}</MenuItem>
							))}
						</DropdownButton>
						<DropdownButton title={`Charisma: ${this.state.cha}`} onSelect={this.selectCha}>
							{this.state.abilityScores.map((score, i) => (
								<MenuItem key={i} eventKey={score}>{score}</MenuItem>
							))}
						</DropdownButton>
					</FormGroup>
				</form>
				<button onClick={()=> this.props.previousStep()}>Back</button>
				<button onClick={()=> this.nextStep()}>Save and Next Step</button>
			</div>
		)
	}
};
