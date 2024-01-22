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
				color: white;
			}
			.healthbar {
				background-color: white;
				width: 100px;
				height: 30px;
				border: black solid 1px;
				border-radius: 5px;
				display: flex;
				justify-content: left;
				overflow: hidden;
			}
			.health {
				background-color: red;
				display: flex;
				justify-content: center;
				align-items: center;
				transition: width 0.2s ease-in-out;
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
			<div class="healthbar">
				<span class="health" style="width: ${(this.currentHealth / this.maxHealth) * 100}%">
					${this.currentHealth}
				</span>
			</div>
		`;
	}
}

customElements.define('enemy-healthbar', Healthbar);
