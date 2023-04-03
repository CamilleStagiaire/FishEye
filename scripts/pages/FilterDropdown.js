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
      console.log(media._like)
      this.$mediasWrapper.appendChild(template.createMediaCard(media));
    });
  
    // Mettre à jour l'encart des likes
    const photographerPage = new PhotographerPage(this._photographer);
    console.log(photographerPage)
    //const totalLikes = this._photographer.getTotalLikes();
    console.log(photographerPage);
  }



  onChangeFilter() {
    const filterButtons = this.$wrapper.querySelectorAll('.filter-form_button');
    const filterImg = this.$wrapper.querySelectorAll('.dropdown_open');
    const dropdown = this.$wrapper.querySelector('#dropdown');
    let secondClick = false;
  
    dropdown.addEventListener('click', (e) => {
      if (e.target !== dropdown) {
        if (!secondClick) {
          filterButtons.forEach((btn) => btn.classList.remove('hidden'));

        } else {
          const newnode = e.target;
          const first = dropdown.firstElementChild;
          dropdown.insertBefore(newnode, first);
          filterButtons.forEach((btn) => {
            if (btn !== newnode) {
              btn.classList.add('hidden');
             
            }
          });
  
          // Appliquer le filtre
          this.filterMedias(newnode.value);
        }
        secondClick = !secondClick;
      }
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
    <label id="filter_label" for="filter-select">Trier par: </label>
    <div class="filter-form" aria-labelledby="filter_label">
      <img src="assets/images/chevron.png" class="dropdown_open"/>
      <div class="dropdown" id="dropdown" role="listbox" tabindex="-1" hidden>
        <button class="filter-form_button" id="likes-btn" type="button" role="option" value="likes" tabindex="0">Popularité</button>
        <button class="filter-form_button hidden" id="title-btn" type="button" role="option" value="title" tabindex="0">Titre</button>
        <button class="filter-form_button hidden" id="date-btn" type="button" role="option" value="date" tabindex="0">Date</button>
      </div>
    </div>
  </div>
    `;
    this.$wrapper.innerHTML = filterForm;
    this.onChangeFilter();
    this.$filterWrapper.appendChild(this.$wrapper);
  }

}
