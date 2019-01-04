import axios from 'axios';

export async function getUserCharacters(){
	const characterData = await axios.get('/characters');
	return characterData.data;

}
