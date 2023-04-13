// eslint-disable-next-line no-unused-vars
import { Photographer } from '../models/Photographer.js';

class PhotographerCard {
  /**
   * @param {Photographer} photographer 
   */
  constructor(photographer) {
    this._photographer = photographer
  }

  /**
   * Création de l'article contenant les cartes des photographes
   * @returns {HTMLElement}
   */
  createPhotographerCard() {
    const $wrapper = document.createElement('article')
    $wrapper.classList.add('photographer')

    const photographerCard = `
      <a href="./photographer.html?id=${this._photographer.id}" tabindex="0">
        <div class="photographer_photo">
          <img
            alt="${this._photographer.name}"
            src="${this._photographer.portrait}">
        </div>
        <h2 class="photographer_name">${this._photographer.name}</h2>
      </a>
        <h3 class="photographer_location">
          <span class="photographer_location_city">${this._photographer.city}</span>,
          <span class="photographer_location_country">${this._photographer.country}</span>
        </h3>
        <p class="photographer_tagline">${this._photographer.tagline}</p>
        <p class="photographer_price">${this._photographer.price}€/jour</p>
     
    `
    $wrapper.innerHTML = photographerCard
    return $wrapper
  }
}

export { PhotographerCard };
