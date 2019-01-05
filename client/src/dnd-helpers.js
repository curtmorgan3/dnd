
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

module.exports = {
	rollDice,
	rollAbilities
}
