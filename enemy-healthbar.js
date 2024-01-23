import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class Healthbar extends LitElement {
	static get properties() {
		return {
			maxHealth: { type: Number },
			currentHealth: { type: Number },
		};
	}

	static get styles() {
		return css`
			:host {
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.healthbar {
				background-color: white;
				height: 2rem;
				width: 1.2rem;
				border: black solid 1px;
				border-radius: 0.2rem;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				overflow: hidden;
				flex-grow: 1;
				box-sizing: border-box;
			}
			.health {
				background-color: red;
				display: flex;
				justify-content: center;
				align-items: center;
				transition: height 0.2s ease-in-out;
			}
			.health-value {
				margin-right: 0.1rem;
				min-width: 1rem;
				text-align: right;
			}
		`;
	}

	constructor() {
		super();
		this.maxHealth = 0;
		this.currentHealth = 0;
	}

	render() {
		return html`
			<span class="health-value">${this.currentHealth}</span>
			<div class="healthbar">
				<div class="health" style="height: ${(this.currentHealth / this.maxHealth) * 100}%"></div>
			</div>
		`;
	}
}

customElements.define('enemy-healthbar', Healthbar);
