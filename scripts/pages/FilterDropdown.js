class FilterDropdown {
 /**
   * @param {Media[]} medias 
   * @param {Photographer} photographer
   */
 constructor(medias, photographer) {
  this.medias = medias;
  this.photographer = photographer;
  this.$wrapper = document.createElement("div");
  this.$filterWrapper = document.querySelector(".dropdown");
  
  this.$mediasWrapper = document.querySelector(".photograph_media");
  }

  /**
   * 
   * @param {string} filterBy 
   */
  async filterMedias(filterBy) {
    this.clearMediasWrapper();

    // Création d'une instance de la classe Filter avec la liste des médias à filtrer
    const filterMedias = new Filter(this.medias);
    let filteredMedias = [];

    switch (filterBy) {
      case "title":
        filteredMedias = await filterMedias.filterByTitle();
        break;
      case "date":
        filteredMedias = await filterMedias.filterByDate();
        break;
      case "likes":
        filteredMedias = await filterMedias.filterByLikes();
        break;
      default:
        filteredMedias = this.medias;
        break;
    }

   filteredMedias.forEach((media) => {
  const template = new PhotographerPage(this._photographer);
  this.$mediasWrapper.appendChild(template.createMediaCard(media));
});

//const photographerPage = new PhotographerPage(this._photographer);
//photographerPage.createLikesCounter();
  }

  
  onChangeFilter() {
    const filterButtons = this.$wrapper.querySelectorAll('.filter-form_button');
    filterButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        const selectedOption = e.target.value; // Récupère la valeur sélectionnée dans le formulaire de filtrage
        switch (selectedOption) {

          case "title":
            await this.filterMedias("title");
            break;
          case "date":
            await this.filterMedias("date");
            break;
          case "likes":
            await this.filterMedias("likes");
            break;
          default:
            await this.filterMedias("");
            break;
        }
      });
    });
  }

  // Supprime tous les éléments dans la template
  clearMediasWrapper() {
    this.$mediasWrapper.innerHTML = "";
  }

  // Rendu HTML du dropdowm
  render() {
    const filterForm = `
   <div class="filter">
   <label for="filter_label">Trier par </label>
   <form class="filter-form" action="#" method="POST">
     <div class="dropdown">
       <div><button class="filter-form_button" id="likes-btn" type="button" value="likes">Popularités</button><img src="assets/images/chevron.png" class="dropdown_open"/></div>
       <button class="filter-form_button hidden" id="title-btn" type="button" value="title">Titre</button>
       <button class="filter-form_button hidden" id="date-btn" type="button" value="date">Date</button>
     </div>
   </form>
   </div>
    `;

    this.$wrapper.innerHTML = filterForm;
    this.onChangeFilter();
    this.$filterWrapper.appendChild(this.$wrapper);

    const titleBtn = this.$wrapper.querySelector('#title-btn');
    const dateBtn = this.$wrapper.querySelector('#date-btn');
    const likesBtn = this.$wrapper.querySelector('#likes-btn');


    

    //texte du bouton "Likes"
    const likesBtnText = likesBtn.textContent;

    likesBtn.addEventListener('click', () => {
      likesBtn.textContent = likesBtnText;

      if (titleBtn.classList.contains('hidden') && dateBtn.classList.contains('hidden')) {
        console.log(likesBtnText);
        titleBtn.classList.remove('hidden');
        dateBtn.classList.remove('hidden');

      } else {
        titleBtn.classList.add('hidden');
        dateBtn.classList.add('hidden');
      }
    });

    titleBtn.addEventListener('click', () => {
      //remplacement du texte du bouton "Likes" par le texte du bouton "Titre"
      likesBtn.textContent = titleBtn.textContent;
      titleBtn.classList.add('hidden');
      dateBtn.classList.add('hidden');
      likesBtn.classList.remove('hidden');
    });

    dateBtn.addEventListener('click', () => {
      //remplacement du texte du bouton "Likes" par le texte du bouton "Date"
      likesBtn.textContent = dateBtn.textContent;
      titleBtn.classList.add('hidden');
      dateBtn.classList.add('hidden');
      likesBtn.classList.remove('hidden');
    });

  }
}
