/**
 * The main script file of the application.
 *
 * @author "Daniel Persson <dp222jd@lnu.se>"
 * @version 1.0.0
 */

import './components/flipping-tile/'

const cardsContainer = document.querySelector('#cards-container')
const flippingTile = document.createElement('flipping-tile')
flippingTile.classList.add('flipping-tile')

cardsContainer.appendChild(flippingTile)