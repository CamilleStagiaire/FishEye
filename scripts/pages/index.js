class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer
  }

  createPhotographerCard() {
    const $wrapper = document.createElement('article')
    $wrapper.classList.add('photographer')

    const photographerCard = `
      <a href="./photographer.html?id=${this._photographer.id}">
        <div class="photographer_portrait">
          <img
            alt="${this._photographer.name}"
            src="${this._photographer.portrait}">
        </div>
        <h2 class="photographer_name">${this._photographer.name}</h2>
        <h3 class="photographer_location">
          <span class="photographer_location_city">${this._photographer.city}</span>,
          <span class="photographer_location_country">${this._photographer.country}</span>
        </h3>
        <p class="photographer_tagline">${this._photographer.tagline}</p>
        <p class="photographer_price">${this._photographer.price}€/jour</p>
      </a>
    `
    $wrapper.innerHTML = photographerCard
    return $wrapper
  }
}
