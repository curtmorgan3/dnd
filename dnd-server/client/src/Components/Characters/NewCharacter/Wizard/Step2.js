import React from 'react';
import {FormGroup, DropdownButton, MenuItem} from 'react-bootstrap';
import {rollAbilities} from '../../../../dnd-helpers.js';
import '../stylesheet.css';

export default class Step2 extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			abilityScores: [],
			str: 0,
			dex: 0,
			con: 0,
			int: 0,
			wis: 0,
			cha: 0,
			finished: false,
		}
		this.selectStr = this.selectStr.bind(this);
		this.selectDex = this.selectDex.bind(this);
		this.selectCon = this.selectCon.bind(this);
		this.selectInt = this.selectInt.bind(this);
		this.selectWis = this.selectWis.bind(this);
		this.selectCha = this.selectCha.bind(this);
	}


	rollForAbilities(){
		const abilityScores = rollAbilities();
		this.setState({
			abilityScores
		})
	}
	resetAbilities(){
		let { abilityScores } = this.state;
		let selectedScores = [this.state.str,this.state.dex,this.state.con,this.state.int,this.state.wis,this.state.cha];
		selectedScores = selectedScores.filter(score => score !== 0);
		selectedScores.map(score => abilityScores.push(score));
		this.setState({
			abilityScores,
			str: 0,
			dex: 0,
			con: 0,
			int: 0,
			wis: 0,
			cha: 0
		})
	}
	selectStr(e){
		if(this.state.str !== 0){
			let { abilityScores } = this.state;
			abilityScores.push(this.state.str);
			this.setState({
				abilityScores,
				str: 0,
				dex: this.state.dex,
				con: this.state.con,
				int: this.state.int,
				wis: this.state.wis,
				cha: this.state.cha
			})
		}
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
		})
		if (this.state.abilityScores.length){
			this.setState({
				finished: true
			})
		}
	}
	selectDex(e){
		if(this.state.dex !== 0){
			let { abilityScores } = this.state;
			abilityScores.push(this.state.dex);
			this.setState({
				abilityScores,
				str: this.state.str,
				dex: 0,
				con: this.state.con,
				int: this.state.int,
				wis: this.state.wis,
				cha: this.state.cha
			})
		}
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
		})
		if (this.state.abilityScores.length){
			this.setState({
				finished: true
			})
		}
	}
	selectCon(e){
		if(this.state.con !== 0){
			let { abilityScores } = this.state;
			abilityScores.push(this.state.con);
			this.setState({
				abilityScores,
				str: this.state.str,
				dex: this.state.dex,
				con: 0,
				int: this.state.int,
				wis: this.state.wis,
				cha: this.state.cha
			})
		}
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
		})
		if (this.state.abilityScores.length){
			this.setState({
				finished: true
			})
		}
	}
	selectInt(e){
		if(this.state.int !== 0){
			let { abilityScores } = this.state;
			abilityScores.push(this.state.int);
			this.setState({
				abilityScores,
				str: this.state.str,
				dex: this.state.dex,
				con: this.state.con,
				int: 0,
				wis: this.state.wis,
				cha: this.state.cha
			})
		}
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
		})
		if (this.state.abilityScores.length){
			this.setState({
				finished: true
			})
		}
	}
	selectWis(e){
		if(this.state.wis !== 0){
			let { abilityScores } = this.state;
			abilityScores.push(this.state.wis);
			this.setState({
				abilityScores,
				str: this.state.str,
				dex: this.state.dex,
				con: this.state.con,
				int: this.state.int,
				wis: 0,
				cha: this.state.cha
			})
		}
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
		})
		if (this.state.abilityScores.length){
			this.setState({
				finished: true
			})
		}
	}
	selectCha(e){
		if(this.state.cha !== 0){
			let { abilityScores } = this.state;
			abilityScores.push(this.state.cha);
			this.setState({
				abilityScores,
				str: this.state.str,
				dex: this.state.dex,
				con: this.state.con,
				int: this.state.int,
				wis: this.state.wis,
				cha: 0
			})
		}
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
		})
		if (this.state.abilityScores.length){
			this.setState({
				finished: true
			})
		}
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
						:
						<button onClick={()=> this.resetAbilities()}>Reset</button>
					 }
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
