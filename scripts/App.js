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

      // lancement des pages au click
      //const page = document.querySelectorAll(".photographer");
      //page.forEach((page) => page.addEventListener("click", openPage));
      

    });
  }
}

const app = new App()
app.main()

// function openPage () {
//   var str = "photographer.html";
//   var url = new URL(str);
//   var search_params = new URLSearchParams(url.search); 
//   if(search_params.has('id')) {
//     var name = search_params.get('id');
//     console.log(name)}
// }

