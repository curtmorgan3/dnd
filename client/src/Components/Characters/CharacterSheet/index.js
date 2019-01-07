import React from 'react';
import { getCharacterData } from '../../../api-helpers.js';

export default class CharacterSheet extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			characterData: {},
		}
	}

	async componentDidMount(){
		const characterData = await getCharacterData(this.props.match.params.id);
		this.setState({
			characterData
		})
	}

	render(){
		return(
			<div>
				<h1>Character Sheet</h1>
				<p>{this.state.characterData.id}</p>
			</div>
		)
	}
}
