import React from 'react';
import { Link } from 'react-router-dom';
import './stylesheet.css';

export default function Characters(props){
	const characters = props.characters;
	return(
		<div className='all-characters'>
			<Link to='/characters/new'>New Character</Link>
			<div className='user-character-wrapper'>
			{characters.map(character => (
				<div key={character.id} className='user-character-unique'>
					<h6>{character.name}</h6>
					<p>Level {character.level}</p>
					<p>{character.clas.toUpperCase()}</p>
					<Link to={`/characters/${character.id}`}>View Character Sheet</Link>
				</div>
			))}
			</div>
		</div>
	)
}
