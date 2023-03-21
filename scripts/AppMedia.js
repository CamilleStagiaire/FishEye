class AppMedia {
    constructor() {
      this.$mediaSection = document.querySelector('.photograph-media')
      this.mediasApi = new MediaApi('/data/photographers.json')
    }
  
    async mainPhotos() {
      const mediaData = await this.mediasApi.getMedias()


 

      mediaData
      .map(media => new Media(media))
      .forEach(media  => {
       
        //console.log(media._photographerId);

        
console.log(media.photographerId);
      
        const Template = new PhotographerPage(media)
        this.$mediaSection.appendChild(Template.createMediaCard())
  
      });
    }
  }
  const appMedia = new AppMedia()
  appMedia.mainPhotos()