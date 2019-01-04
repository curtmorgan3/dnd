import React from 'react';

export default function Characters(props){
	const characters = props.characters;
	return(
		<div>
			<h1>Character</h1>
			{characters.map(character => (
				<div>
					<p>{character.name}</p>
				</div>
			))}
		</div>
	)
}
