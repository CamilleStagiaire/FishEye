class AppMedia {
  constructor() {
    this.$photographersInfos = document.querySelector('.photograph_header_infos')
    this.$photographersPortrait = document.querySelector('.photograph_header_portrait')
    this.$photographersHeader = document.querySelector('.photograph_header')
    this.$photographersDropdown = document.querySelector('.dropdown')
    this.$photographersMedia = document.querySelector('.photograph_media')
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
    const medias = mediasData.map(mediaData => MediaFactory.create(mediaData));

    // Vérification si le photographe est trouvé
    if (photographer) {
      const template = new PhotographerPage(photographer);

      // Insertion des informations du photographe dans la page
      this.$photographersInfos.appendChild(template.createPhotographerInfos());
      this.$photographersPortrait.appendChild(template.createPhotographerPortrait());

      // Création et initialisation du filtre
      const filterDropdown = new FilterDropdown(medias);
      filterDropdown.render();
      filterDropdown.onChangeFilter();

      // Ajout du filtre  dans la page
      this.$photographersDropdown.appendChild(filterDropdown.$wrapper);

      // formulaire de contact
      const modal = new FormModal();
      const contactButton = document.querySelector('.contact_button');
      
      contactButton.addEventListener('click', () => {
        modal.render();
        this.$photographersPortrait.appendChild(modal.$wrapper);
      
        const closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', () => {
          console.log('rr');
          modal.onClose();
        });
      });


      // Création et insertion des cartes de médias
      const mediaCards = medias.map(media => template.createMediaCard(media));
      mediaCards.forEach(mediaCard => this.$photographersMedia.appendChild(mediaCard));
    } else {
      console.error('Photographer not found with id:', photographerId);
    }
  }
}

const appMedia = new AppMedia()
appMedia.header()
