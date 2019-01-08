import axios from 'axios';

// Roll any number of any sided die, returns array sorted lowest to highest
function rollDice(sides, n){
	function base(){
		const num = Math.ceil(Math.random() * sides);
		return num;
	};
	let sum = [];
	for (let i = 0; i < n; i++){
		sum.push(base());
	}
	sum = sum.sort((a,b) => a - b);
	return sum;
}

//Returns array of ability scores
function rollAbilities(){
	const abilityScores = [];
	for (let i = 0; i < 6; i++){
		const rawAbility = rollDice(6,4);
		const ability = rawAbility[1] + rawAbility[2] + rawAbility[3];
		abilityScores.push(ability);
	}
	return abilityScores;
}

//Given ability scores, returns modifiers
function getAbilityModifiers(abilities){
	const modifiers = {};
	Object.keys(abilities).forEach((key, i) => {
		let ability = abilities[key];
		const mod = Math.floor((ability - 10) / 2 );
		modifiers[key] = mod;
	})
	return modifiers;
};

//Armor Class
function getAC(dexMod){
	return 10 + dexMod;
};

//Speed
function getSpeed(race){
	switch(race){
		case 'dwarf' || 'halfling' || 'gnome':
			return 25;
		// break;
		case 'elf' || 'human' || 'dragonborn' || 'half_elf' || 'half_orc' || 'tiefling':
			return 30;
		// break;
		default:
		return 30;
	}
};

//Gold
function getStartingGold(dice, num, multi){
	let arr = rollDice(dice, num)
	let sum = arr.reduce((acc,cur) => acc + cur);
	let total = sum * multi
	return total
}

//Feats
async function getFeat(index){
	try{
		let feat = await axios.get(`http://www.dnd5eapi.co/api/features/${index}`);
		return feat.data;
	} catch(e){
		console.error(e)
	}
};

async function getCharacterFeatures(clas, level){
	let feats = [];
	let currentFeats = [];
	switch(clas){
		case 'barbarian':
			for (let i = 1; i<25; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}
			})
			return currentFeats;
		break;
		case 'bard':
			for (let i = 25; i<71; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				};
				feats.map(feat => {
					if(feat.level <= level){
						currentFeats.push(feat);
					}
				})
			};
			return currentFeats;
		break;
		case 'cleric':
			for (let i = 71; i<100; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}
			})
			return currentFeats;
		break;
		case 'druid':
			for (let i = 100; i<131; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}
			})
			return currentFeats;
		break;
		case 'fighter':
			for (let i = 131; i<160; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}
			})
			return currentFeats;
			break;
		case 'monk':
			for (let i = 160; i<191; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}
			})
			return currentFeats;
		break;
		case 'paladin':
			for (let i = 191; i<220; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}
			})
			return currentFeats;
		break;
		case 'ranger':
			for (let i = 220; i<260; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}
			})
			return currentFeats;
		break;
		case 'rogue':
			for (let i = 260; i<303; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}
			})
			return currentFeats;
		break;
		case 'sorcerer':
			for (let i = 303; i<340; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}
			})
			return currentFeats;
		break;
		case 'warlock':
			for (let i = 340; i<400; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}
			})
			return currentFeats;
		break;
		case 'wizard':
			for (let i = 400; i<415; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}
			})
			return currentFeats;
		break;

	}
}

//Class Stats
function getClassStats(clas){
	let stats = {}
	switch(clas){
		case 'barbarian':
			stats = {
				hitDie: 12,
				primaryAbility: 'str',
				savingThrows: ['str', 'con'],
				armorProfs: ['light', 'medium', 'shield'],
				weaponProfs: ['simple', 'martial'],
				possibleSkills: {num: 2, skills:['animal_handling', 'athletics', 'intimidation', 'nature', 'perception', 'survival']},
				startingEquipment: [
					{name: 'greataxe', num: 1, option: 'a', suboption: '1', unique: 0},
					{name: 'other_martial_melee', num: 1, option: 'a', suboption: '2', unique: 1},
					{name: 'handaxe', num: 2, option: 'b', suboption: '1', unique: 2},
					{name: 'other_simple_weapon', num: 1, option: 'b', suboption: '2', unique: 3},
					{name: 'explorer_pack', num: 1, option: 'c', suboption: '1', unique: 4},
					{name: 'javelin', num: 4, option: 'd', suboption: '1', unique: 5}
				],
				startingCoin: {dice: 4, num: 2, multi: 10}
			};
			return stats;
		// break;
		case 'bard':
			stats = {
				hitDie: 8,
				primaryAbility: 'cha',
				savingThrows: ['dex', 'cha'],
				armorProfs: ['light'],
				weaponProfs: ['simple', 'hand_crossbow', 'longsword', 'rapier', 'shortsword'],
				possibleSkills: {num: 3, skills: ['acrobatics','animal_handling','arcana','athletics','deception','history','insight','intimidation','investigation','medicine','nature','perception','performance','persuassion','religion','sleight_of_hand','stealth','survival']},
				startingEquipment: [
					{name: 'rapier', num: 1, option: 'a', suboption: '1', unique: 0},
					{name: 'longsword', num: 1, option: 'a', suboption: '2', unique: 1},
					{name: 'other_simple_weapon', num: 1, option: 'a', suboption: '3', unique: 2},
					{name: 'diplomat_pack', num: 2, option: 'b', suboption: '1', unique: 3},
					{name: 'entertainer_pack', num: 2, option: 'b', suboption: '2', unique: 4},
					{name: 'lute', num: 1, option: 'c', suboption: '1', unique: 5},
					{name: 'other_instrument', num: 2, option: 'c', suboption: '2', unique: 6},
					{name: 'dagger', num: 1, option: 'd', suboption: '1', unique: 7},
					{name: 'leather_armor', num: 1, option: 'e', suboption: '1', unique: 8},
				],
				startingCoin: {dice: 4, num: 5, multi: 10}
			};
		return stats;
		// break;
		case 'cleric':
			stats = {
				hitDie: 8,
				primaryAbility: 'wis',
				savingThrows: ['wis', 'cha'],
				armorProfs: ['light', 'medium', 'shield'],
				weaponProfs: ['simple'],
				possibleSkills: {num: 2, skills: ['history', 'insight', 'medicine', 'persuasion', 'religion']},
				startingEquipment: [
					{name: 'mace', num: 1, option: 'a', suboption: '1', unique: 0},
					{name: 'warhammer', num: 1, option: 'a', suboption: '1', unique: 1, proficiency: true},
					{name: 'scale_mail', num: 1, option: 'b', suboption: '1', unique: 2},
					{name: 'leather_armor', num: 2, option: 'b', suboption: '2', unique: 3},
					{name: 'chain_mail', num: 2, option: 'b', suboption: '3', unique: 4, proficiency: true},
					{name: 'light_crossbow', num: 1, option: 'c', suboption: '1', unique: 5},
					{name: 'crossbow_bolts', num: 20, option: 'c', suboption: '1', unique: 6},
					{name: 'other_simple_weapon', num: 1, option: 'c', suboption: '2', unique: 7},
					{name: 'priest_pack', num: 1, option: 'd', suboption: '1', unique: 8},
					{name: 'explorer_pack', num: 1, option: 'd', suboption: '2', unique: 9},
					{name: 'shield', num: 1, option: 'e', suboption: '1', unique: 10},
					{name: 'holy_symbol', num: 1, option: 'f', suboption: '1', unique: 11}
				],
				startingCoin: {dice: 4, num: 5, multi: 10}
			};
			return stats;
		// break;
		case 'druid':
			stats = {
				hitDie: 8,
				primaryAbility: 'wis',
				savingThrows: ['int', 'wis'],
				armorProfs: ['light', 'medium', 'shield'],
				weaponProfs: ['club', 'dagger', 'dart', 'javelins', 'mace', 'quarterstaff', 'scimitar', 'sickle', 'sling', 'spear'],
				possibleSkills: {num: 2, skills: ['arcana', 'animal_handling', 'insight', 'medicine', 'nature', 'perception', 'religion', 'survival']},
				startingEquipment: [
					{name: 'wooden_shild', num: 1, option: 'a', suboption: '1', unique: 0},
					{name: 'other_simple_weapon', num: 1, option: 'a', suboption: '2', unique: 1},
					{name: 'explorer_pack', num: 2, option: 'b', suboption: '1', unique: 2},
					{name: 'leather_armor', num: 1, option: 'c', suboption: '1', unique: 3},
					{name: 'druidic_focus', num: 1, option: 'd', suboption: '1', unique: 4},
					{name: 'scimitar', num: 1, option: 'e', suboption: '1', unique: 5},
					{name: 'other_simple_melee_weapon', num: 1, option: 'e', suboption: '2', unique: 6}
				],
				startingCoin: {dice: 4, num: 2, multi: 10}
			};
			return stats;
		// break;
		case 'fighter':
			stats = {
				hitDie: 10,
				primaryAbility: ['str','dex'],
				savingThrows: ['str', 'con'],
				armorProfs: ['light', 'medium', 'heavy', 'sheild'],
				weaponProfs: ['simple', 'martial'],
				possibleSkills: {num: 2, skills: ['acrobatics', 'animal_handling','athletics','history','insight','intimidation','perception','survial']},
				startingEquipment: [
					{name: 'chain_mail', num: 1, option: 'a', suboption: '1', unique: 0 },
					{name: 'leather_armor', num: 1, option: 'a', suboption: '2', unique: 1 },
					{name: 'longbow', num: 1, option: 'a', suboption: '2', unique: 2},
					{name: 'arrow', num: 20, option: 'a', suboption: '2', unique: 3 },
					{name: 'other_martial_weapon', num: 1, option: 'b', suboption: '1', unique: 4 },
					{name: 'sheild', num: 1, option: 'b', suboption: '1', unique: 5 },
					{name: 'other_martial_weapon', num: 2, option: 'b', suboption: '2', unique: 6},
					{name: 'dungeoneer_pack', num: 1, option: 'c', suboption: '1', unique: 7 },
					{name: 'explorer_pack', num: 1, option: 'c', suboption: '2', unique: 8 }
				],
				startingCoin: {dice: 4, num: 5, multi: 10}
			};
			return stats;
		// break;
		case 'monk':
			stats = {
				hitDie: 8,
				primaryAbility: ['dex','wis'],
				savingThrows: ['str', 'dex'],
				armorProfs: [],
				weaponProfs: ['simple', 'shortsword'],
				possibleSkills: {num: 2, skills: ['acrobatics','athletics','history','insight','religion','stealth']},
				startingEquipment: [
					{name: 'shortsword', num: 1, option: 'a', suboption: '1', unique: 0},
					{name: 'other_simple_weapon', num: 1, option: 'a', suboption: '2', unique: 1},
					{name: 'dungeoneer_pack', num: 1, option: 'b', suboption: '1', unique: 2},
					{name: 'explorer_pack', num: 1, option: 'b', suboption: '2', unique: 3},
					{name: 'dart', num: 10, option: 'c', suboption: '1', unique: 4}
				],
				startingCoin: {dice: 4, num: 5, multi: 1}
			};
			return stats;
		// break;
		case 'paladin':
			stats = {
				hitDie: 10,
				primaryAbility: ['dex','wis'],
				savingThrows: ['wis', 'cha'],
				armorProfs: ['light', 'medium', 'heavy', 'sheild'],
				weaponProfs: ['simple', 'martial'],
				possibleSkills: {num: 2, skills: ['athletics','insight','intimidation','medicine','persuasion','religion']},
				startingEquipment: [
					{name: 'other_martial_weapon', num: 1, option: 'a', suboption: '1', unique: 0},
					{name: 'shield', num: 1, option: 'a', suboption: '1', unique: 1},
					{name: 'other_martial_weapon', num: 2, option: 'a', suboption: '2', unique: 2},
					{name: 'javelin', num: 5, option: 'b', suboption: '1', unique: 3},
					{name: 'other_simple_weapon', num: 2, option: 'b', suboption: '2', unique: 4},
					{name: 'priest_pack', num: 1, option: 'c', suboption: '1', unique: 5},
					{name: 'explorer_pack', num: 1, option: 'c', suboption: '2', unique: 6},
					{name: 'chain_mail', num: 1, option: 'd', suboption: '1', unique: 7},
					{name: 'holy_symbol', num: 1, option: 'e', suboption: '1', unique: 8}
				],
				startingCoin: {dice: 4, num: 5, multi: 10}
			};
			return stats;
		// break;
		case 'ranger':
			stats = {
				hitDie: 10,
				primaryAbility: ['dex','wis'],
				savingThrows: ['str', 'dex'],
				armorProfs: ['light', 'medium'],
				weaponProfs: ['simple', 'martial'],
				possibleSkills: {num: 3, skills: ['animal_handling','athletics','insight','investigation','nature','perception','stealth','survival']},
				startingEquipment: [
					{name: 'scale_mail', num: 1, option: 'a', suboption: '1', unique: 0},
					{name: 'leather_armor', num: 1, option: 'a', suboption: '2', unique: 1},
					{name: 'shortsword', num: 2, option: 'b', suboption: '1', unique: 2},
					{name: 'other_simple_weapon', num: 2, option: 'b', suboption: '2', unique: 3},
					{name: 'dungeoneer_pack', num: 1, option: 'c', suboption: '1', unique: 4},
					{name: 'explorer_pack', num: 1, option: 'c', suboption: '2', unique: 5},
					{name: 'longbow', num: 1, option: 'd', suboption: '1', unique: 6},
					{name: 'arrow', num: 20, option: 'e', suboption: '1', unique: 7}
				],
				startingCoin: {dice: 4, num: 5, multi: 10}
			};
			return stats;
		// break;
		case 'rogue':
			stats = {
				hitDie: 8,
				primaryAbility: 'dex',
				savingThrows: ['dex', 'int'],
				armorProfs: ['light'],
				weaponProfs: ['simple', 'hand_crossbow', 'longsword', 'rapier', 'shortsword'],
				possibleSkills: {num: 4, skills: ['acrobatics','athletics','deception','insight','intimidation','investigation','perception','performance','persuasion','sleight_of_hand','stealth']},
				startingEquipment: [
					{name: 'rapier', num: 1, option: 'a', suboption: '1', unique: 0},
					{name: 'shortsword', num: 1, option: 'a', suboption: '2', unique: 1},
					{name: 'shortsword', num: 1, option: 'b', suboption: '1', unique: 2},
					{name: 'shortbow', num: 1, option: 'b', suboption: '2', unique: 3},
					{name: 'arrow', num: 20, option: 'b', suboption: '2', unique: 4},
					{name: 'burglar_pack', num: 1, option: 'c', suboption: '1', unique: 5},
					{name: 'dungeoneer_pack', num: 1, option: 'c', suboption: '2', unique: 6},
					{name: 'explorer_pack', num: 1, option: 'c', suboption: '3', unique: 7},
					{name: 'leather_armor', num: 1, option: 'd', suboption: '1', unique: 8},
					{name: 'dagger', num: 2, option: 'e', suboption: '1', unique: 9},
					{name: 'thieves_tools', num: 1, option: 'f', suboption: '1', unique: 10}
				],
				startingCoin: {dice: 4, num: 4, multi: 10}
			};
			return stats;
		// break;
		case 'sorcerer':
			stats = {
				hitDie: 6,
				primaryAbility: 'cha',
				savingThrows: ['con', 'cha'],
				armorProfs: [],
				weaponProfs: ['dagger', 'dart', 'sling', 'quarterstaff', 'light_crossbow'],
				possibleSkills: {num: 2, skills: ['arcana', 'deception', 'insight','intimidation','persuasion','religion']},
				startingEquipment: [
					{name: 'light_crossbow', num: 1, option: 'a', suboption: '1', unique: 0},
					{name: 'arrow', num: 20, option: 'a', suboption: '1', unique: 1},
					{name: 'other_simple_weapon', num: 1, option: 'a', suboption: '2', unique: 2},
					{name: 'component_pouch', num: 1, option: 'b', suboption: '1', unique: 3},
					{name: 'arcane_focus', num: 1, option: 'b', suboption: '2', unique: 4},
					{name: 'dungeoneer_pack', num: 1, option: 'c', suboption: '1', unique: 5},
					{name: 'explorer_pack', num: 1, option: 'c', suboption: '2', unique: 6},
					{name: 'dagger', num: 2, option: 'e', suboption: '1', unique: 7},
				],
				startingCoin: {dice: 4, num: 3, multi: 10}
			};
			return stats;
		// break;
		case 'warlock':
			stats = {
				hitDie: 8,
				primaryAbility: 'cha',
				savingThrows: ['con', 'cha'],
				armorProfs: ['light'],
				weaponProfs: ['simple'],
				possibleSkills: {num: 2, skills: ['arcana','deception','history','intimidation','investigation','nature','religion']},
				startingEquipment: [
					{name: 'light_crossbow', num: 1, option: 'a', suboption: '1', unique: 0},
					{name: 'arrow', num: 20, option: 'a', suboption: '1', unique: 1},
					{name: 'other_simple_weapon', num: 1, option: 'a', suboption: '2', unique: 2},
					{name: 'component_pouch', num: 1, option: 'b', suboption: '1', unique: 3},
					{name: 'arcane_focus', num: 1, option: 'b', suboption: '2', unique: 4},
					{name: 'dungeoneer_pack', num: 1, option: 'c', suboption: '1', unique: 5},
					{name: 'scholar_pack', num: 1, option: 'c', suboption: '2', unique: 6},
					{name: 'leather_armor', num: 1, option: 'd', suboption: '1', unique: 7},
					{name: 'other_simple_weapon', num: 1, option: 'e', suboption: '1', unique: 8},
					{name: 'dagger', num: 2, option: 'f', suboption: '1', unique: 9},
				],
				startingCoin: {dice: 4, num: 4, multi: 10}
			};
			return stats;
		// break;
		case 'wizard':
			stats = {
				hitDie: 6,
				primaryAbility: 'str',
				savingThrows: ['int', 'wis'],
				armorProfs: [],
				weaponProfs: ['dagger', 'dart', 'sling', 'quarterstaff', 'light_crossbow'],
				possibleSkills: {num: 2, skills: ['arcana','history','insight','investigation','medicine','religion']},
				startingEquipment: [
					{name: 'dagger', num: 1, option: 'a', suboption: '1', unique: 0},
					{name: 'quarterstaff', num: 1, option: 'a', suboption: '2', unique: 1},
					{name: 'component_pouch', num: 1, option: 'b', suboption: '1', unique: 2},
					{name: 'arcane_focus', num: 1, option: 'b', suboption: '2', unique: 3},
					{name: 'explorer_pack', num: 1, option: 'c', suboption: '1', unique: 4},
					{name: 'scholar_pack', num: 1, option: 'c', suboption: '2', unique: 5},
					{name: 'spellbook', num: 1, option: 'd', suboption: '1', unique: 6}
				],
				startingCoin: {dice: 4, num: 4, multi: 10}
			};
			return stats;
		// break;
		default :
		console.log(stats);
	};
};

//Get Skill Modifiers
function getSkillModifiers(skills, abilityMods, proficiencyBonus){
	const skillMods = {
		'acrobatics': abilityMods.dex,
		'animal_handling': abilityMods.wis,
		'arcana': abilityMods.int,
		'athletics': abilityMods.str,
		'deception': abilityMods.cha,
		'history': abilityMods.int,
		'insight': abilityMods.wis,
		'intimidation': abilityMods.cha,
		'investigation': abilityMods.int,
		'medicine': abilityMods.wis,
		'nature': abilityMods.int,
		'perception': abilityMods.wis,
		'performance': abilityMods.cha,
		'persuasion': abilityMods.cha,
		'religion': abilityMods.int,
		'sleight_of_hand': abilityMods.dex,
		'stealth': abilityMods.dex,
		'survival': abilityMods.wis
	};
	skills.forEach(skill => {
		if(skillMods[skill]){
			skillMods[skill] += proficiencyBonus
		}
	});
	return skillMods;
}

export {
	rollDice,
	rollAbilities,
	getAbilityModifiers,
	getAC,
	getSpeed,
	getClassStats,
	getSkillModifiers,
	getStartingGold,
	getCharacterFeatures
}
