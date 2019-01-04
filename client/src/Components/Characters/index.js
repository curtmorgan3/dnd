import React from 'react';
import NewCharacter from './NewCharacter';

export default function Characters(props){
	const characters = props.characters;
	return(
		<div>
			<h1>Characters</h1>
			{characters.map(character => (
				<div>
					<p>{character.name}</p>
				</div>
			))}
			<NewCharacter />
		</div>
	)
}
