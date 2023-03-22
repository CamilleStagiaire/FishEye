class App {
  constructor() {
    this.$photographersSection = document.querySelector('.photographer_section')
   // this.$photographersHeader = document.querySelector('.photograph_header')
    this.photographersApi = new PhotographerApi('/data/photographers.json')
  }
    
  async main() {
    // Recuperation des données du fichier photographers.json
    const photographersData = await this.photographersApi.getPhotographers()

    photographersData
      .map(photographer => new Photographer(photographer))
      .forEach(photographer => {
      
      console.log(photographer);
      const Template = new PhotographerCard(photographer)
      this.$photographersSection.appendChild(Template.createPhotographerCard())
    });
  }
}

const app = new App()
app.main()


