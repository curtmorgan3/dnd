const axios = require('axios')

async function migrateWeapons(){
	let weapon = {};
	let weaponData = {};
	for (let i=3; i < 38; i++){
		try{
			weapon = await axios.get(`http://www.dnd5eapi.co/api/equipment/${i}`);
			weaponData = {
				name: weapon.data.name,
				category: weapon.data.category_range,
				data: JSON.stringify(weapon.data)
			}
		}catch (e){
			console.error(e)
		}finally {
			await axios({
				method: 'post',
				url: 'http://localhost:3001/weapons',
				data: weaponData
			})
		}
	}
	console.log('Finished');
}

migrateWeapons();
