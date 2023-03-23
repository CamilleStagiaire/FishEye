class App {
  constructor() {
    this.$photographersSection = document.querySelector('.photographer_section')
    this.photographersApi = new PhotographerApi('/data/photographers.json')
  }

  async main() {
    // Recuperation des données du fichier photographers.json
    const photographersData = await this.photographersApi.getPhotographers()

    // Transformation du tableau de données en tableau de la classe Photographer
    photographersData
      .map(photographer => new Photographer(photographer))
      .forEach(photographer => {
        const Template = new PhotographerCard(photographer)
        this.$photographersSection.appendChild(Template.createPhotographerCard())
      });
  }
}

const app = new App()
app.main()


