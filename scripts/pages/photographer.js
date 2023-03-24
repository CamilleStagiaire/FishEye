

class PhotographerPage {
  /**
   * @param {Photographer} photographer 
   */
  constructor(photographer) {
    this._photographer = photographer;
  }

  /**
   * Création de la partie informations sur le photographe
   * @returns {HTMLElement}
   */
  createPhotographerInfos() {
    const $wrapper = document.createElement('article');
    $wrapper.classList.add('photographer_portrait');

    const photographerInfos =
      ` <h2 class="photographer-name">${this._photographer.name}</h2>
     <h2 class="photographer-name">${this._photographer.tagline}</h2>
     `;

    $wrapper.innerHTML = photographerInfos;
    return $wrapper;
  }

  /**
   * Création de l'article contenant l'image du photographe
   * @returns {HTMLElement}
   */
  createPhotographerPortrait() {
    const $wrapper = document.createElement('article');
    $wrapper.classList.add('photographer');

    const photographerPortrait =
      `<img
     alt="${this._photographer.name}"
     src="${this._photographer.portrait}">
     `;

    $wrapper.innerHTML = photographerPortrait;
    return $wrapper;
  }

  /**
   *  Création de l'article contenant le media (image ou vidéo)
   * @param {Media} media
   * @returns {HTMLElement} 
   */
  createMediaCard(media) {
    const $wrapper = document.createElement('article');
    $wrapper.classList.add('media');

    if (media) {
      const mediaTitle = `
      <div class="media_text">
      <p class="media-title">${media.title}</p>
      <p class="media-title">${media.likes}</p>
      <p class="media-title">${media.date}</p>
      </div>
      `;

      // Vérification du média
      let mediaTag;
      if (media instanceof VideoMedia) {
        mediaTag = `<div class="media_img"><video class="media-video" src="${media.url}" controls></video></div>`;
      } else {
        mediaTag = `<div class="media_img"><img alt="${media.title}" src="${media.url}"></div>`;
      }

      const mediaCard =mediaTag + mediaTitle ;

      $wrapper.innerHTML = mediaCard;

      $wrapper.addEventListener('click', () => {
        new Lightbox(media.url);
      });
    } else {
      console.error('Media is undefined');
    }

    return $wrapper;
  }
  

}