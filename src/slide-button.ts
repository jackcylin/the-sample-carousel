import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("slide-button")
export class SlideButton extends LitElement {

    static override styles = css`
        #btn {
            width: 2em;
            height: 2em;
            cursor: pointer;
            border-radius: 1em;

            display: flex;
            align-items: center;
            justify-content: center;

            box-shadow: var(--shadow, gray) 0.2em 0.2em 0.4em,
                        var(--heightlight, white) -0.1em -0.1em 0.2em;
        }

        #btn:active:hover, #btn:hover:active {
            box-shadow: inset var(--shadow, gray) 0.2em 0.2em 0.4em,
                        inset var(--heightlight, white) -0.1em -0.1em 0.2em;
        }
    `

    override render() {
        return html`<div 
                        id="btn"
                        tabindex="0"
                        role="button"
                        aria-pressed="false"
        >
            <slot></slot>
        </div>`
    }

}

declare global {
    interface HtmlElementTagNameMap {
        "slide-button": SlideButton
    }
}