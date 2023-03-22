class AppMedia {
  constructor() {
   
    this.$photographersHeader = document.querySelector('.photograph_portrait')
    this.$photographersMedia = document.querySelector('.photograph_media')
    this.photographersApi = new PhotographerApi('/data/photographers.json')
    this.mediasApi = new MediaApi('/data/photographers.json')
  }

  async header() {
    const queryString_url_id = window.location.search;
    const urlSearchParams = new URLSearchParams(queryString_url_id);
    const getIdPhotagrapher = parseInt(urlSearchParams.get("id"));

    const photographersData = await this.photographersApi.getPhotographers();

    const photographer = photographersData
      .map((photographerData) => new Photographer(photographerData))
      .find((photographer) => photographer.id === getIdPhotagrapher);

    if (photographer) {
        const Template = new PhotographerPage(photographer)
      this.$photographersHeader.appendChild(Template.createPhotographerPortrait())
    } else {
      console.error('Photographer not found with id:', getIdPhotagrapher);
    }
  }
}

const appMedia = new AppMedia()
appMedia.header()

// class AppMedia {
//   constructor() {
//     this.$mediaSection = document.querySelector('.photograph-media')
//     this.mediasApi = new MediaApi('/data/photographers.json')
//   }

//   async mainPhotos() {
//     const mediaData = await this.mediasApi.getMedias()




//     mediaData
//     .map(media => new Media(media))
//     .forEach(media  => {
     
//       //console.log(media._photographerId);

      
// console.log(media.photographerId);
    
//       const Template = new PhotographerPage(media)
//       this.$mediaSection.appendChild(Template.createMediaCard())

//     });
//   }
// }
// const appMedia = new AppMedia()
// appMedia.mainPhotos()

