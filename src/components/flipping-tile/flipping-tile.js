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
        }
    </style>

    <div part="card-info-container">
        <div part="card" class="image-container"></div>
        <p part="card-side-info" class="card-side-info">Frontside displayed</p>
    </div>

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

            /* Get the p-element in which we display the information about which side is displayed */
            this._cardSideInfo = this.shadowRoot.querySelector('.card-side-info')
            /* Get the div-container in which we display the current image */
            this._imageElement = this.shadowRoot.querySelector('.image-container')
            /* Used to toggle side information */
            this._frontSideDisplayed = true
        }

        /**
         * Watches the attributes "xxx" and "xxx" for changes on the element.
         *
         * @readonly
         * @static
         */
        static get observedAttributes() {
            return ['', '']
        }

        /**
         * Called by the browser engine when an attribute changes.
         *
         * @param {string} name of the new attribute.
         * @param {any} oldValue of the attribute.
         * @param {any} newValue of the attribute. 
         */
        attributeChangedCallback(name, oldValue, newValue) {
            if(name === '') {
                return
            }

            if(name === '') {
                return
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
                return
            }

            if(!this._frontSideDisplayed) {
                this._frontSideDisplayed = true
                this._cardSideInfo.textContent = 'Frontside displayed'
                return
            }
            return
        }
    }
)