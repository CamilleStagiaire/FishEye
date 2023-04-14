import { MediaApi, PhotographerApi } from './api/Api.js';
import { FilterDropdown } from './components/FilterDropdown.js';
import { FormModal } from './components/ContactForm.js';
import { MediaFactory } from './factories/MediaFactory.js';
import { Photographer } from './models/Photographer.js';
import { PhotographerPage } from './pages/photographer.js';
import { FilterMedias } from './utils/FilterMedias.js';

class AppMedia {
  constructor() {
    this.$photographersInfos = document.querySelector('.photograph_header_infos')
    this.$photographersPortrait = document.querySelector('.photograph_header_portrait')
    this.$photographersDropdown = document.querySelector('.dropdown')
    this.$photographersMedia = document.querySelector('.photograph_media')
    this.$photographersLikes = document.querySelector('.photograph_likes')
    this.photographersApi = new PhotographerApi('/data/photographers.json')
    this.mediasApi = new MediaApi('/data/photographers.json')
  }

  async header() {
    // Récupération de l'id du photographe dans l'url
    const queryString_url_id = window.location.search;
    const urlSearchParams = new URLSearchParams(queryString_url_id);
    const getIdPhotographer = parseInt(urlSearchParams.get("id"));

    // Récupération des données du fichier photographers.json et des médias associés à un photographe
    const photographersData = await this.photographersApi.getPhotographers();
    const mediasData = await this.mediasApi.getMedias(getIdPhotographer);

    // Création des instances de la classe Photographer et de la classe Media
    const photographer = new Photographer(photographersData.find(element => element.id === getIdPhotographer));
    const medias = mediasData.map(mediaData => {
      const media = MediaFactory.create(mediaData);
      photographer.addMedia(media);
      return media;
    });

    // Tri des médias par popularité
    const filterMedias = new FilterMedias(medias);
    const filteredMedias = filterMedias.filterByLikes();

    // Vérification si le photographe est trouvé
    if (photographer) {
      const template = new PhotographerPage(photographer);

      // Insertion des informations du photographe dans la page
      this.$photographersInfos.appendChild(template.createPhotographerInfos());
      this.$photographersPortrait.appendChild(template.createPhotographerPortrait());

      // Création de l'encart pour le total des likes
      const likesCounter = template.createAndUpdateLikesCounter(filteredMedias);
      this.$photographersLikes.appendChild(likesCounter);

      // Création et initialisation du filtre
      const filterDropdown = new FilterDropdown(filteredMedias); // utilise les médias triés par popularité
      filterDropdown.render();
      filterDropdown.onChangeFilter()

      // Ajout du filtre  dans la page
      this.$photographersDropdown.appendChild(filterDropdown.$wrapper);

      // formulaire de contact
      const modal = new FormModal(photographer);
      const contactButton = document.querySelector('.contact_button');

      contactButton.addEventListener('click', () => {
        modal.render();
        this.$photographersPortrait.appendChild(modal.$wrapper);

        // fermeture de la modale de contact
        const closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', () => {
          modal.onClose();
        });
        closeButton.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            modal.onClose();
          }
        });

      });

      // Création et insertion des cartes de médias
      const mediaCards = medias.map(media => template.createMediaCard(media));
      mediaCards.forEach(mediaCard => this.$photographersMedia.appendChild(mediaCard));
    }
  }
}

const appMedia = new AppMedia()
appMedia.header()