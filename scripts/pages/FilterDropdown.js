class FilterDropdown {
  /**
   * @param {Media[]} medias 
   */
  constructor(medias) {
    this.medias = medias;
    this.$wrapper = document.createElement("div");
    this.$filterWrapper = document.querySelector(".dropdown");
    this.$mediasWrapper = document.querySelector(".photograph_media");
  }

  /**
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

    // Ajoute chaque élément filtré dans la template
    filteredMedias.forEach((media) => {
      const template = new PhotographerPage(media);
      this.$mediasWrapper.appendChild(template.createMediaCard(media));
    });
  }

  onChangeFilter() {
    this.$wrapper
      .querySelector("form select")
      .addEventListener("change", async (e) => {
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
  }

  // Supprime tous les éléments dans la template
  clearMediasWrapper() {
    this.$mediasWrapper.innerHTML = "";
  }

  // Rendu HTML du dropdowm
  render() {
    const filterForm = `
        <form class="filter-form" action="#" method="POST">
          <label for="filter-select">Filtrer par :</label>
          <select name="filter-select" id="filter-select">
            <option value="">Aucun filtre</option>
            <option value="title">Titre</option>
            <option value="date">Date</option>
            <option value="likes">Likes</option>
          </select>
        </form>
      `;

    this.$wrapper.innerHTML = filterForm;
    this.onChangeFilter();
    this.$filterWrapper.appendChild(this.$wrapper);
  }
}
