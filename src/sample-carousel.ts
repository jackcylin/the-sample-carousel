import { LitElement, html, css } from "lit";
import { customElement, property, queryAssignedElements, state } from "lit/decorators.js"
import { styleMap } from "lit/directives/style-map.js"
import "./slide-button";
import { PREVIOUS, NEXT } from "./consts"

@customElement("sample-carousel")
export class SampleCarousel extends LitElement {
    @property({ type: Number }) slideIndex = 0;
    @state() private containerHeight = 0;

    @queryAssignedElements()
    private readonly slideElements!: HTMLElement[];

    static override styles = css`
        ::slotted(.slide-hidden) {
            display: none;
        }
        ::slotted(.slide-hidden) {
            position: absolute;
            padding: 1em;
        }
        :host {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        #container {
            border-radius: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
            margin: 0 18px;
            padding: 1em;
            overflow: hidden;
            position: relative;
            box-shadow: var(--shadow, gray) 0.3em 0.3em 0.4em,
                        var(--highlight, white) -0.1em -0.1em 0.3em;
        }
    `;

    override render() {
        const containerStyles = {
            height: `${this.containerHeight}px`
            // height: '300px'
        };

        return html`
        <slide-button @click=${this.navigateToPreviousSlide}>${PREVIOUS}</slide-button>
            <div id="container" style=${styleMap(containerStyles)}>
            <slot></slot>
            </div>
        <slide-button @click=${this.navigateToNextSlide}>${NEXT}</slide-button>`;
    }

    override firstUpdated() {
        this.navigateSlide();
        this.containerHeight = this.getMaxElHeight(this.slideElements)
    }

    override updated() {
        this.navigateSlide();
    }

    private changeSlide(offset: number) {
        const slideCount = this.slideElements.length;
        this.slideIndex = (slideCount + (this.slideIndex + offset) % slideCount) % slideCount;
    }

    private navigateToPreviousSlide() {
        this.changeSlide(-1);
    }

    private navigateToNextSlide() {
        this.changeSlide(1);
    }

    private navigateSlide() {
        for (let i = 0; i < this.slideElements.length; i++) {
            if (i === this.slideIndex)
                showSlide(this.slideElements[i]);
            else
                hideSlide(this.slideElements[i])
        }
    }

    private getMaxElHeight(els: HTMLElement[]): number {
        const max = Math.max(0, ...els.map(el => el.getBoundingClientRect().height));
        return max > 40 ? max : 40;
    }
}

function hideSlide(el: HTMLElement) {
    return el.classList.add('slide-hidden');
}

function showSlide(el: HTMLElement) {
    return el.classList.remove('slide-hidden');
}

declare global {
    interface HtmlElementTagNameMap {
        "sample-carousel": SampleCarousel;
    }
}

