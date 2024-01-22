const enemyData = {
	banditGuard: {
		name: 'Bandit Guard',
		maxInstances: 11,
		statsByLevel: [
			[
				{
					hp: 5,
					attack: 2,
					move: 2,
				},
				{
					hp: 9,
					attack: 3,
					move: 2,
				},
			],
		],
	},
};

export class Enemy {
	name = '';
	maxInstances = 0;
	hp = 0;
	attack = 0;
	move = 0;
	range = 0;
	shield = 0;
	target = 0;

	constructor(id, level, isElite) {
		const enemy = enemyData[id];
		if (!enemy) {
			throw new Error(`Enemy with ID ${id} not found in enemy data`);
		}

		const stats = enemy.statsByLevel[level][isElite ? 1 : 0];
		this.name = enemyData[id].name;
		this.maxInstances = enemyData[id].maxInstances;
		this.hp = stats.hp;
		this.attack = stats.attack;
		this.move = stats.move;
		this.range = stats.range;
		this.shield = stats.shield;
		this.target = stats.target;
	}
}
