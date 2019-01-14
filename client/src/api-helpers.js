const axios = require('axios');

// Get all characters owned by current user
export async function getUserCharacters(token){
	const characterData = await axios({
		method: 'get',
		url: '/characters/mine',
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	return characterData.data;
};

// Get current user
export async function getCurrentUser(){
	const token = localStorage.getItem('dnd_token');
	const user = await axios({
		method: 'get',
		url: `/users/current`,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	return user.data;
}

// Find user by username
export async function findUser(username){
	const token = localStorage.getItem('dnd_token');
	const characterData = await axios({
		method: 'get',
		url: `/users/find/${username}`,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	return characterData.data;
}
// Get campaigns owned by user
export async function getUserCampaigns(){
	const token = localStorage.getItem('dnd_token');
	const campaignData = await axios({
		method: 'get',
		url: '/campaigns/mine',
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	return campaignData.data;
}

// Get character data
export async function getCharacterData(id){
	const token = localStorage.getItem('dnd_token');
	const characterData = await axios({
		method: 'get',
		url: `/characters/${id}`,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	return characterData.data;
};

// Create a new campaign
export async function postNewCampaign(data){
	const token = localStorage.getItem('dnd_token');
	await axios({
		method: 'post',
		url: '/campaigns',
		data: data,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
};

// Delete Camapaign
export async function deleteCampaign(id){
	const token = localStorage.getItem('dnd_token');
	await axios({
		method: 'delete',
		url: `/campaigns/${id}`,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
	window.location.reload()
};

// Get campaign data
export async function getCampaignData(id){
	const token = localStorage.getItem('dnd_token');
	const campaignData = await axios({
		method: 'get',
		url: `/campaigns/${id}`,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	return campaignData.data;
};

// Get characters associated with a campaign
export async function getCampaignCharacters(id){
	const token = localStorage.getItem('dnd_token');
	const campaignCharacterData = await axios({
		method: 'get',
		url: `/campaigns/${id}/characters`,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	const data = campaignCharacterData.data;
	let characters = [];
	data.map(character => {
		const stats = JSON.parse(character.data)
		const char = {
			name: character.name,
			level: character.level,
			clas: character.clas,
			id: character.id,
			stats: stats
		};
		return characters.push(char);
	})
	return characters
}

// Get characters associated with a user
export async function getAnyUserCharacters(id){
	const token = localStorage.getItem('dnd_token');
	const userCharacterData = await axios({
		method: 'get',
		url: `/users/${id}/characters`,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	return userCharacterData.data;
}

// Create a New Character
export async function postNewCharacter(data){
	const token = localStorage.getItem('dnd_token');
	await axios({
		method: 'post',
		url: '/characters',
		data: data,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
};

// Associate a Character with a Campaign
export async function addCharacterToCampaign(campaign_id, character_id){
	const token = localStorage.getItem('dnd_token');
	await axios({
		method: 'post',
		url: `/campaigns/${campaign_id}/characters/${character_id}`,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
}

// Remove a Character from a Campaign
export async function removeCharacterFromCampaign(campaign_id, character_id){
	const token = localStorage.getItem('dnd_token');
	await axios({
		method: 'put',
		url: `/campaigns/${campaign_id}/characters/${character_id}`,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
}

// Delete Character
export async function deleteCharacter(id){
	const token = localStorage.getItem('dnd_token');
	await axios({
		method: 'delete',
		url: `/characters/${id}`,
		headers:{
			'Authorization': `Bearer ${token}`
		}
	});
	window.location.reload()
}

// Update character
export async function updateCharacter(id, data){
	const token = localStorage.getItem('dnd_token');
	await axios({
		method: 'put',
		url: `/characters/${id}`,
		data: data,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
};

// Get Equipment
export async function getEquipmentById(id){
	const token = localStorage.getItem('dnd_token');
	const piece = await axios({
		method: 'get',
		url: `/weapons/${id}`,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	return piece.data;
}
