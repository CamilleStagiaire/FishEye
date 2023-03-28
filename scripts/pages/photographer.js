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
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('photograph_infos');

    const photographerInfos =
      ` <h2 class="photograph_infos_name">${this._photographer.name}</h2>
      <h3 class="photograph_infos_location">
      <span class="photograph_infos_location_city">${this._photographer.city}</span>,
      <span class="photograph_infos_location_country">${this._photographer.country}</span>
    </h3>
     <p class="photograph_tagline">${this._photographer.tagline}</p>
     `;

    $wrapper.innerHTML = photographerInfos;
    return $wrapper;
  }

  /**
   * Création de l'article contenant l'image du photographe
   * @returns {HTMLElement}
   */
  createPhotographerPortrait() {
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('photographer_photo');

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
      <p class="media_title">${media.title}</p>
      <p class="media_likes">${media.likes}</p>
      <i class="fa-regular fa-heart"></i>
      </div>
      `;

      // Vérification du média
      let mediaTag;
      if (media instanceof VideoMedia) {
        mediaTag = `<div class="media_img"><video src="${media.url}" controls></video></div>`;
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