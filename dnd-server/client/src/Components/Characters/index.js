import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { deleteCharacter } from '../../api-helpers.js';
import './stylesheet.css';

export default function Characters(props){
	const characters = props.characters;
	return(
		<div className='all-characters'>
			<Link to='/characters/new'><Button bsStyle='primary'>New Character</Button></Link>
			<div className='user-character-wrapper'>
			{characters.map(character => (
				<div key={character.id} className='user-character-unique'>
					<h6>{character.name}</h6>
					<p>Level {character.level}</p>
					<p>{character.clas.toUpperCase()}</p>
					<Button bsStyle='success'><Link to={`/characters/${character.id}`}>View Character Sheet</Link></Button>
					<Button bsStyle='danger' onClick={()=>deleteCharacter(character.id)}>Delete Character</Button>
				</div>
			))}
			</div>
		</div>
	)
}
