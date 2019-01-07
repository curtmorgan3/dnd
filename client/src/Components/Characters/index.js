import React from 'react';
import NewCharacter from './NewCharacter';
import './stylesheet.css';

export default function Characters(props){
	const characters = props.characters;
	return(
		<div >
			<div className='user-character-wrapper'>
			{characters.map(character => (
				<div key={character.id} className='user-character-unique'>
					<h6>{character.name}</h6>
					<p>Level {character.level}</p>
					<p>{character.clas}</p>
				</div>
			))}
			</div>
			<NewCharacter />
		</div>
	)
}
