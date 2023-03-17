class App {
  constructor() {
    this.$photographersSection = document.querySelector('.photographer_section')
    this.photographersApi = new PhotographerApi('/data/photographers.json')
    
   
  }
    
  async main() {
    const photographersData = await this.photographersApi.getPhotographers()
    

    photographersData
      .map(photographer => new Photographer(photographer))
      .forEach(photographer => {
      
      console.log(photographer);
      const Template = new PhotographerCard(photographer)
      this.$photographersSection.appendChild(Template.createPhotographerCard())

    });
  }


  async photographer() {
    const mediaData = await this.photographersApi.getPhotographers()

    mediaData
      .map(media => new Media(media))
      .forEach(media  => {
      
      console.log(media);
      //const Template = new PhotographerCard(photographer)
     // this.$photographersSection.appendChild(Template.createPhotographerCard())

    });


  }

}

const app = new App()
app.main()
app.photographer()