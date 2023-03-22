/* eslint-disable linebreak-style */
/* eslint-disable spaced-comment */
//Mettre le code JavaScript lié à la page photographer.html

class PhotographerPage {
  constructor(photographer) {
    this._photographer = photographer
    // this._media = media

  }

  createPhotographerPortrait() {
    const $wrapper = document.createElement('article')
    $wrapper.classList.add('photographer')

    const photographerPortrait =
      ` <h2 class="photographer-name">${this._photographer.name}</h2>
     <h2 class="photographer-name">${this._photographer.tagline}</h2>
     <img
     alt="${this._photographer.name}"
     src="${this._photographer.portrait}">`

    $wrapper.innerHTML = photographerPortrait
    return $wrapper

  }


  createMediaCard() {
    const $wrapper = document.createElement('article')
    $wrapper.classList.add('media')

    const mediaCard = `
        <h2 class="media-title">${this._media.title}</h2>
      `

    $wrapper.innerHTML = mediaCard
    return $wrapper

  }
}

  // photographerHeaderContainer.innerHTML =
  //           <div class='photographer_header_id'>
  //               <h1 tabindex='0'>${name}</h1>
  //               <p>${city}, ${country}</p>
  //               <span>${tagline}</span>`