import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { Enemy } from './Enemy.js';
import { enemyData } from './enemy-data.js';
import './enemy-instance.js';

export class GloomEnemy extends LitElement {
	static get properties() {
		return {
			id: { type: String },
			level: { type: Number },
			maxInstances: { type: Number },
			_enemyInstances: { type: Array },
		};
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);
		this._enemyInstances = new Array(this.maxInstances).fill(null);
	}

	static get styles() {
		return css`
			:host {
				display: flex;
				flex-direction: column;
				padding-left: 0.2rem;
				padding-right: 0.2rem;
				font-family: 'PirataOne', 'Open Sans', sans-serif;
			}

			.header-bar {
				display: flex;
				align-items: center;
			}
			.header-bar > * {
				margin-right: 0.2rem;
			}
			.header-bar > *:last-child {
				margin-right: 0;
			}

			.enemy-name {
				font-size: larger;
			}

			.instance-buttons > button {
				border: 1px solid black;
				width: 2rem;
				height: 2rem;
				font-family: 'PirataOne', 'Open Sans', sans-serif;
				font-size: larger;
			}
			button.add-enemy {
				background-color: #d3d3d3;
				color: black;
			}
			button.remove-enemy {
				background-color: #555555;
				color: white;
			}

			.stats-bar {
				display: inline-flex;
				flex-direction: row;
			}
			@media screen and (max-width: 400px) {
				.stats-bar {
					flex-direction: column;
				}
			}
			.stat-bar {
				display: flex;
				flex-direction: row;
				border: 1px solid black;
				padding: 0.2rem;
			}
			.stat-bar.elite {
				background: rgba(117, 115, 3, 0.5);
			}
			.enemy-stat {
				margin-right: 0.5rem;
				font-size: 0.7rem;
			}
			.stat-bar > *:last-child {
				margin-right: 0;
			}
			.enemy-stat > img {
				height: 0.8rem;
				width: 0.8rem;
				vertical-align: middle;
			}
			.enemy-instances {
				display: flex;
				flex-wrap: wrap;
			}
			gloom-enemy-instance {
				display: inline-block;
			}
		`;
	}

	_addEnemyInstance(i) {
		this._enemyInstances[i] = html`<gloom-enemy-instance
			id=${this.id}
			instanceNumber=${i + 1}
			level=${this.level}
		></gloom-enemy-instance>`;
		this.requestUpdate();
	}

	_removeEnemyInstance(i) {
		this._enemyInstances[i] = null;
		this.requestUpdate();
	}

	render() {
		if (!this._enemyInstances) {
			return;
		}

		const normalEnemy = new Enemy(this.id, this.level, false);
		const eliteEnemy = new Enemy(this.id, this.level, true);

		const instanceButtons = [];
		const enemyInstances = [];

		for (let i = 0; i < this.maxInstances; i++) {
			let buttonClass = '';
			let buttonHandler = null;
			if (this._enemyInstances[i]) {
				buttonClass = 'remove-enemy';
				buttonHandler = this._removeEnemyInstance.bind(this, i);
				enemyInstances.push(this._enemyInstances[i]);
			} else {
				buttonClass = 'add-enemy';
				buttonHandler = this._addEnemyInstance.bind(this, i);
				enemyInstances.push(html`</>`);
			}

			instanceButtons.push(html`<button class="${buttonClass}" @click="${buttonHandler}">${i + 1}</button>`);
		}

		const numericStats = ['attack', 'move', 'range', 'shield', 'target', 'pierce'];

		const enemyStats = html`
			<span class="stat-bar">
				<span class="enemy-stat">HP ${normalEnemy.hp}</span>
				${numericStats.map((stat) => {
					if (!normalEnemy[stat] || normalEnemy[stat] === 0) {
						return;
					}
					return html`<span class="enemy-stat"
						><img src="images/${stat}.svg" /> ${normalEnemy[stat] ?? '-'}</span
					>`;
				})}
				<span class="enemy-stat">${normalEnemy.attributes.join(', ')}</span>
			</span>
			<span class="stat-bar elite">
				<span class="enemy-stat">HP ${eliteEnemy.hp}</span>
				${numericStats.map((stat) => {
					if (!eliteEnemy[stat] || eliteEnemy[stat] === 0) {
						return;
					}
					return html`<span class="enemy-stat"
						><img src="images/${stat}.svg" /> ${eliteEnemy[stat] ?? '-'}</span
					>`;
				})}
				<span class="enemy-stat">${eliteEnemy.attributes.join(', ')}</span>
			</span>
		`;

		return html`
			<span class="header-bar">
				<span class="enemy-name">${enemyData[this.id].name}</span>
				<span class="instance-buttons">${instanceButtons}</span>
				<span class="stats-bar">${enemyStats}</span>
			</span>
			<span class="enemy-instances"> ${enemyInstances} </span>
		`;
	}
}

customElements.define('gloom-enemy', GloomEnemy);
