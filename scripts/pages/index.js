class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer
  }

  createPhotographerCard() {
    const $wrapper = document.createElement('article')
    $wrapper.classList.add('photographer')

    const photographerCard = `
      <a href="./photographer.html?id=${this._photographer.id}">
        <div class="photographer-portrait">
          <img
            alt="${this._photographer.name}"
            src="${this._photographer.portrait}">
        </div>
        <h2 class="photographer-name">${this._photographer.name}</h2>
        <h3 class="photographer-location">
          <span class="photographer-location-city">${this._photographer.city}</span>,
          <span class="photographer-location-country">${this._photographer.country}</span>
        </h3>
        <p class="photographer-tagline">${this._photographer.tagline}</p>
        <p class="photographer-price">${this._photographer.price}€/jour</p>
      </a>
    `
    $wrapper.innerHTML = photographerCard
    return $wrapper
  }
}
