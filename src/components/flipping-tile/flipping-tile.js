/**
 * The flipping-tile web component module.
 *
 * @author Daniel Persson <dp222jd@lnu.se>
 * @version 2.0.0
 */

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            cursor: pointer;
            overflow: hidden;
            display: block;
        }
    </style>

    <div class="card-content-container" part="card-content-container">
        <div part="card-inner" class="card-inner">
                <div part="card-front">
                    <img part="front-image" class="front-side-image" src="/images/2.png" alt="Gramophone">
                </div>
                <div part="card-back">
                    <img part="back-image"class="back-side-image" src="/images/lnu-symbol.png" alt="Questionmark">
                </div>
        </div>
    </div>
    <p part="card-side-info" class="card-side-info"><slot name="text-display">Frontside displayed</slot></p>

    `
/**
* Defining the custom element flipping tile
*/
customElements.define('flipping-tile', 
    class extends HTMLElement {
        /**
         * Creates an instance of the current type
         */
        constructor() {
            super()
            this.attachShadow({ mode: 'open'})
                .appendChild(template.content.cloneNode(true))
            /* Selecting the card content container */
            this._cardContentContainer = this.shadowRoot.querySelector('.card-content-container')
            /* Get the p-element in which we display the information about which side is displayed */
            this._cardSideInfo = this.shadowRoot.querySelector('.card-side-info')
            /* Get the div-container in which we display the current image */
            this._imageElement = this.shadowRoot.querySelector('.image-container')
            /* Used to toggle side information */
            this._frontSideDisplayed = true
            /* Front- and backside image element */
            this._frontSideImageElement = this.shadowRoot.querySelector('.front-side-image')
            this._backSideImageElement = this.shadowRoot.querySelector('.back-side-image')
            /* Inner card */
            this._cardInner = this.shadowRoot.querySelector('.card-inner')
        }

        /**
         * Watches the attributes "xxx" and "xxx" for changes on the element.
         *
         * @readonly
         * @static
         */
        static get observedAttributes() {
            return ['backimage', 'frontimage', 'frontalt', 'backalt', 'borderstyle']
        }

        /**
         * Called by the browser engine when an attribute changes.
         *
         * @param {string} name of the new attribute.
         * @param {any} oldValue of the attribute.
         * @param {any} newValue of the attribute. 
         */
        attributeChangedCallback(name, oldValue, newValue) {
            if(name === 'backimage') {
                return this._backSideImageElement.setAttribute("src", newValue)
            }

            if(name === 'backalt') {
                return this._backSideImageElement.setAttribute("alt", newValue)
            }

            if(name === 'frontalt') {
                return this._frontSideImageElement.setAttribute("alt", newValue)
            }

            if(name === 'frontimage') {
                return this._frontSideImageElement.setAttribute("src", newValue)
            }

            if(name === 'borderstyle') {
                return this._cardContentContainer.style.border = newValue
            }
        }

        /**
         * Called after the element is inserted into the dom. Event listeners are added here.
         */
        connectedCallback () {
            this.addEventListener('click', this._flipCardAndDisplayCardSide)
            this.addEventListener('keypress', this._flipCardAndDisplayCardSide)
        }

        disconnectedCallback () {
            this.removeEventListener('click', this._flipCardAndDisplayCardSide)
            this.removeEventListener('keypress', this._flipCardAndDisplayCardSide)
        }

        /**
         * This method will flip the card and display information regarding which side is currently displayed. 
         */
        _flipCardAndDisplayCardSide() {
            if(this._frontSideDisplayed) {
                this._frontSideDisplayed = false
                this._cardSideInfo.textContent = 'Backside displayed'
                this._cardInner.style.transform = 'rotateY(180deg)'
                return
            }

            if(!this._frontSideDisplayed) {
                this._frontSideDisplayed = true
                this._cardSideInfo.textContent = 'Frontside displayed'
                this._cardInner.style.transform = 'rotateY(0deg)'
                return
            }
            return
        }
    }
)