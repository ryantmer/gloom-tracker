import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { enemyData } from './enemy-data.js';
import './gloom-enemy.js';

// TODO: Add the rest of the scenarios
const scenarioEnemies = [
	['Bandit Guard', 'Bandit Archer', 'Living Bones'],
	['Bandit Archer', 'Living Bones', 'Living Corpse'],
];

export class GloomApp extends LitElement {
	static get properties() {
		return {
			_scenarioNumber: { type: Number },
			_level: { type: Number },
			_lockedIn: { type: Number },
		};
	}

	constructor() {
		super();

		this._scenarioNumber = 0;
		this._level = 0;
		this._lockedIn = false;
	}

	static get styles() {
		return css`
			.header-text {
				line-height: 0;
				font-size: 1rem;
			}
			input {
				width: 2rem;
			}
		`;
	}

	_lockIn() {
		this._scenarioNumber = this.shadowRoot.getElementById('scenarioInput').value;
		this._level = this.shadowRoot.getElementById('levelInput').value;
		this._lockedIn = true;
	}

	_modify() {
		this._lockedIn = false;
	}

	render() {
		return html`
			<span class="header-text">Scenario: </span>
			<input id="scenarioInput" type="number" max="95" value="1" min="1" ?disabled="${this._lockedIn}" />
			<span class="header-text">Level: </span>
			<input id="levelInput" type="number" max="7" value="0" min="0" ?disabled="${this._lockedIn}" />
			<button id="lockIn" @click="${this._lockIn}" ?disabled="${this._lockedIn}">Lock In</button>
			<button id="modify" @click="${this._modify}" ?disabled="${!this._lockedIn}">Modify</button>
			${scenarioEnemies[this._scenarioNumber - 1] &&
			scenarioEnemies[this._scenarioNumber - 1].sort().map((name) => {
				return html`<gloom-enemy
					name="${name}"
					maxInstances="${enemyData[name].maxInstances}"
					level="${this._level}"
				></gloom-enemy>`;
			})}
		`;
	}
}

customElements.define('gloom-app', GloomApp);
