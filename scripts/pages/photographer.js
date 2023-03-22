
class PhotographerPage {
  constructor(photographer) {
    this._photographer = photographer;
  }

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

  createMediaCard(media) {
    const $wrapper = document.createElement('article');
    $wrapper.classList.add('media');

    if (media) {
      const mediaTitle = `
        <h2 class="media-title">${media.title}</h2>
        <h2 class="media-title">${media.likes}</h2>
      `;
      let mediaTag;
      if (media instanceof VideoMedia) {
        mediaTag = `<video class="media-video src="${media.url}" controls></video>`;
      } else {
        mediaTag = `<img alt="${media.title}" src="${media.url}">`;
      }
      const mediaCard = mediaTitle + mediaTag;

      $wrapper.innerHTML = mediaCard;
    } else {
      console.error('Media is undefined');
    }
    return $wrapper;
  }
}
