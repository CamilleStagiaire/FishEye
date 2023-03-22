class AppMedia {
  constructor() {
    this.$photographersInfos = document.querySelector('.photograph_header_infos')
    this.$photographersPortrait = document.querySelector('.photograph_header_portrait')
    
    this.$photographersMedia = document.querySelector('.photograph_media')
    this.photographersApi = new PhotographerApi('/data/photographers.json')
    this.mediasApi = new MediaApi('/data/photographers.json')
  }

  async header() {
    // Récupération de l'id dans l'url
  const queryString_url_id = window.location.search;
  const urlSearchParams = new URLSearchParams(queryString_url_id);
  const getIdPhotagrapher = parseInt(urlSearchParams.get("id"));

  // Récupération des données du fichier photographers.json
  const photographersData = await this.photographersApi.getPhotographers();
  const mediasData = await this.mediasApi.getMedias(getIdPhotagrapher);

  // Création des instances de la classe Photographer et de la classe Media
  const photographer = new Photographer(photographersData.find(p => p.id === getIdPhotagrapher));
  const medias = mediasData.map(mediaData => MediaFactory.create(mediaData));

  if (photographer) {
    const template = new PhotographerPage(photographer);
    this.$photographersInfos.appendChild(template.createPhotographerInfos());
    this.$photographersPortrait.appendChild(template.createPhotographerPortrait());


    const mediaCards = medias.map(media => template.createMediaCard(media));
    mediaCards.forEach(mediaCard => this.$photographersMedia.appendChild(mediaCard));
  } else {
    console.error('Photographer not found with id:', photographerId);
  }
  }
}

const appMedia = new AppMedia()
appMedia.header()





// class AppPhotos {
//   constructor() {
//    this.$mediaSection = document.querySelector('.photograph_media')
//     this.mediasApi = new MediaApi('/data/photographers.json')
//   }

//   async mainPhotos() {
//    const mediaData = await this.mediasApi.getMedias()




//     mediaData
//     .map(media => new Media(media))
//     .forEach(media  => {
     
//       //console.log(media._photographerId);

      
// console.log(media.photographerId);
    
//       const Template = new MediaPage(media)
//       this.$mediaSection.appendChild(Template.createMediaCard())

//     });
//   }
// }
// const appPhotos = new AppPhotos()
// appPhotos.mainPhotos()

