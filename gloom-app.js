import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { enemyData } from './enemy-data.js';
import { scenarioEnemies } from './scenario-data.js';
import './gloom-enemy.js';

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
			gloom-enemy {
				border: 3px solid black;
				border-bottom: none;
			}
			gloom-enemy:last-child {
				border-bottom: 3px solid black;
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
		const setupBar = html`
			<span class="header-text">Scenario: </span>
			<input id="scenarioInput" type="number" max="95" value="1" min="1" ?disabled="${this._lockedIn}" />
			<span class="header-text">Level: </span>
			<input id="levelInput" type="number" max="7" value="0" min="0" ?disabled="${this._lockedIn}" />
			<button id="lockIn" @click="${this._lockIn}" ?disabled="${this._lockedIn}">Lock In</button>
			<button id="modify" @click="${this._modify}" ?disabled="${!this._lockedIn}">Modify</button>
		`;

		if (this._scenarioNumber === 0) {
			return setupBar;
		}

		const enemyIds = scenarioEnemies[this._scenarioNumber] ?? [];
		if (!enemyIds || enemyIds.length === 0) {
			return html`
				${setupBar}
				<p>Scenario data not found for scenario number ${this._scenarioNumber}</p>
			`;
		}

		return html`
			${setupBar}
			${enemyIds.map(id => {
				if (!enemyData[id]) {
					return html`<p>Enemy with ID ${id} not found in enemy data</p>`;
				}

				return html`<gloom-enemy
					id="${id}"
					maxInstances="${enemyData[id].maxInstances}"
					level="${this._level}"
				></gloom-enemy>`;
			})}
		`;
	}
}

customElements.define('gloom-app', GloomApp);
