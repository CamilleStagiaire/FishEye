import { Lightbox } from '../components/Lightbox.js';
import { VideoMedia } from '../models/Media.js';

class PhotographerPage {

  /**
   * @param {import('../models/Photographer.js').Photographer} photographer 
   * @param {Media[]} medias 
   */
  constructor(photographer, medias) {
    this._photographer = photographer;
    this._medias = medias;
  }

  /**
   * Création de la partie informations sur le photographe
   * @returns {HTMLElement}
   */
  createPhotographerInfos() {
    const $wrapper = document.createElement('div');
    $wrapper.setAttribute('role', 'contentinfo');
    $wrapper.classList.add('photograph_infos');

    // Génère le HTML des informations du photographe
    const photographerInfos = `
    <h1 class="photograph_infos_name">${this._photographer.name}</h1>
    <h2 class="photograph_infos_location">
      <span class="photograph_infos_location_city">${this._photographer.city}</span>,
      <span class="photograph_infos_location_country">${this._photographer.country}</span>
    </h2>
    <p class="photograph_tagline">${this._photographer.tagline}</p>
     `;

    $wrapper.innerHTML = photographerInfos;
    return $wrapper;
  }

  /**
   * Création de l'image du photographe
   * @returns {HTMLElement}
   */
  createPhotographerPortrait() {
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('photographer_photo');

    const photographerPortrait = `
     <img
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
        <h3 class="media_title">${media.title}</h3>
        <div class="media_likes">
          <h4>${media.likes}</h4>
          <i class="fa-solid fa-heart${media.isLiked ? ' fa-red-heart' : ''} accessibility" tabindex="0" title="Cliquez pour liker"></i>
        </div>
      </div>
      `;

      // Vérification du type de media
      let mediaTag;
      if (media instanceof VideoMedia) {
        mediaTag = `
        <figure>
          <div class="media_img"><a><video class="accessibility" src="${media.url}" tabindex="0"></video></a></div>
          <figcaption>${media.title}</figcaption>
        </figure>
        `;
      } else {
        mediaTag = `
          <figure>
            <div class="media_img"><a><img class="accessibility" alt="${media.title}" src="${media.url}" tabindex="0"></a></div>
            <figcaption>${media.title}</figcaption>
          </figure>
        `;
      }

      const mediaCard = mediaTag + mediaTitle;
      $wrapper.innerHTML = mediaCard;

      // icône du cœur
      const $likeButton = $wrapper.querySelector('.fa-heart');
      $likeButton.setAttribute('aria-label', 'J\'aime');

      /**
       * gestion des likes
       * @param {Event} e 
       */
      const manageLikes = (e) => {
        e.stopPropagation(); // Empêche le Lightbox de s'ouvrir
        const isLiked = media.isLiked;
        if (!isLiked) {
          media.addLike();
          $likeButton.classList.add('fa-red-heart');
        } else {
          media.likes--;
          media._isLiked = false;
          $likeButton.classList.remove('fa-red-heart');
        }
        $wrapper.querySelector('.media_likes h4').textContent = media.likes; // Mise à jour le nombre de likes dans le DOM
        this.createAndUpdateLikesCounter(); // Mise à jour le total des likes du photographe
      }

      // Ecouteurs d"évenements pour les likes
      $likeButton.addEventListener('click', (e) => {
        manageLikes(e);
      });

      $likeButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          manageLikes(e);
        }
      });

      // Fonction qui ouvre la lightbox
      const openLightbox = () => {
        new Lightbox(media.url);
      };

      // Ecouteurs d'événements pour l'ouverture de la lightbox
      $wrapper.addEventListener('click', openLightbox);
      $wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          openLightbox();
        }
      });
    } else {
      console.error('Media is undefined');
    }
    return $wrapper;
  }

  /**
  * Création / MAJ de l'encart affichant le nombre total de likes du photographe
  * @returns {HTMLElement}
  */
  createAndUpdateLikesCounter() {
    const $likesCounter = document.querySelector('.likes_counter') || document.createElement("div");
    $likesCounter.classList.add("likes_counter");
    const photographer = this._photographer;
    if (photographer) {
      const totalLikes = photographer.getTotalLikes();
      const likesText = `<div class="likes_container"><span class="totalLikes">${totalLikes} <i class="fa-solid fa-heart"></i></span><span> ${photographer.price} € / jour</span></div>`;
      $likesCounter.innerHTML = likesText;
    }
    return $likesCounter;
  }
}

export { PhotographerPage };