
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
		break;
		case 'elf' || 'human' || 'dragonborn' || 'half_elf' || 'half_orc' || 'tiefling':
			return 30;
		break;
		default:
		return 30;
	}
};

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
				weaponProfs: ['simple', 'martial']
			};
			return stats;
		break;
		case 'bard':
			stats = {
				hitDie: 8,
				primaryAbility: 'cha',
				savingThrows: ['dex', 'cha'],
				armorProfs: ['light'],
				weaponProfs: ['simple', 'hand_crossbow', 'longsword', 'rapier', 'shortsword']
			};
		return stats;
		break;
		case 'cleric':
			stats = {
				hitDie: 8,
				primaryAbility: 'wis',
				savingThrows: ['wis', 'cha'],
				armorProfs: ['light', 'medium', 'shield'],
				weaponProfs: ['simple']
			};
			return stats;
		break;
		case 'druid':
			stats = {
				hitDie: 8,
				primaryAbility: 'wis',
				savingThrows: ['int', 'wis'],
				armorProfs: ['light', 'medium', 'shield'],
				weaponProfs: ['club', 'dagger', 'dart', 'javelins', 'mace', 'quarterstaff', 'scimitar', 'sickle', 'sling', 'spear']
			};
			return stats;
		break;
		case 'fighter':
			stats = {
				hitDie: 10,
				primaryAbility: ['str','dex'],
				savingThrows: ['str', 'con'],
				armorProfs: ['light', 'medium', 'heavy', 'sheild'],
				weaponProfs: ['simple', 'martial']
			};
			return stats;
		break;
		case 'monk':
			stats = {
				hitDie: 8,
				primaryAbility: ['dex','wis'],
				savingThrows: ['str', 'dex'],
				armorProfs: [],
				weaponProfs: ['simple', 'shortsword']
			};
			return stats;
		break;
		case 'paladin':
			stats = {
				hitDie: 10,
				primaryAbility: ['dex','wis'],
				savingThrows: ['wis', 'cha'],
				armorProfs: ['light', 'medium', 'heavy', 'sheild'],
				weaponProfs: ['simple', 'martial']
			};
			return stats;
		break;
		case 'ranger':
			stats = {
				hitDie: 10,
				primaryAbility: ['dex','wis'],
				savingThrows: ['str', 'dex'],
				armorProfs: ['light', 'medium'],
				weaponProfs: ['simple', 'martial']
			};
			return stats;
		break;
		case 'rogue':
			stats = {
				hitDie: 8,
				primaryAbility: 'dex',
				savingThrows: ['dex', 'int'],
				armorProfs: ['light'],
				weaponProfs: ['simple', 'hand_crossbow', 'longsword', 'rapier', 'shortsword']
			};
			return stats;
		break;
		case 'sorcerer':
			stats = {
				hitDie: 6,
				primaryAbility: 'cha',
				savingThrows: ['con', 'cha'],
				armorProfs: [],
				weaponProfs: ['dagger', 'dart', 'sling', 'quarterstaff', 'light_crossbow']
			};
			return stats;
		break;
		case 'warlock':
			stats = {
				hitDie: 8,
				primaryAbility: 'cha',
				savingThrows: ['con', 'cha'],
				armorProfs: ['light'],
				weaponProfs: ['simple']
			};
			return stats;
		break;
		case 'wizard':
			stats = {
				hitDie: 6,
				primaryAbility: 'str',
				savingThrows: ['int', 'wis'],
				armorProfs: [],
				weaponProfs: ['dagger', 'dart', 'sling', 'quarterstaff', 'light_crossbow']
			};
			return stats;
		break;
		default :
		return stats;
	};
};

module.exports = {
	rollDice,
	rollAbilities,
	getAbilityModifiers,
	getAC,
	getSpeed,
	getClassStats
}
