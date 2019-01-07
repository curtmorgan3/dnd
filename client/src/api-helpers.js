import axios from 'axios';
const token = localStorage.getItem('dnd_token');

export async function getUserCharacters(){
	const characterData = await axios.get('/characters');
	return characterData.data;

}

export async function postNewCharacter(data){
	console.log(data);
	// const newCharacter = await axios.post('/characters', data, {'Authorization': `Bearer ${token}`} );
	const newCharacter = await axios({
		method: 'post',
		url: '/characters',
		data: data,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
}
