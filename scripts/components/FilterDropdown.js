import { FilterMedias } from '../utils/FilterMedias.js';
import { PhotographerPage } from '../pages/photographer.js';

class FilterDropdown {
  /**
    * @param {Media[]} medias 
    * @param {import('../models/Photographer.js').Photographer} photographer
    */
  constructor(medias, photographer) {
    this._medias = medias;
    this._photographer = photographer;
    this.$wrapper = document.createElement("div");
    this.$filterWrapper = document.querySelector(".dropdown");
    this.$photographersLikes = document.querySelector('.photograph_likes')
    this.$mediasWrapper = document.querySelector(".photograph_media");
  }

  /**
   * Applique le filtre sélectionné sur les médias et met à jour l'affichage
   * @param {string} filterBy 
   */
filterMedias(filterBy) {
    this.clearMediasWrapper();

    const filterMedias = new FilterMedias(this._medias);
    let filteredMedias = [];

    switch (filterBy) {
      case "title":
        filteredMedias = filterMedias.filterByTitle();
        break;
      case "date":
        filteredMedias = filterMedias.filterByDate();
        break;
      case "likes":
        filteredMedias = filterMedias.filterByLikes();
        break;
      default:
        filteredMedias = this._medias;
        break;
    }

    const template = new PhotographerPage(this._photographer);
    filteredMedias.forEach((media) => {
      this.$mediasWrapper.appendChild(template.createMediaCard(media));
    });

    //MAJ du compteur de likes au click et au clavier
    const $likeButtons = this.$mediasWrapper.querySelectorAll('.fa-heart');
    const manageLikesUpdate = () => {
      const totalLikes = filteredMedias.reduce((acc, media) => acc + media.likes, 0);
      this.updateLikesCountered(totalLikes);
    }

    // Ecouteurs d'événements pour la mise à jour du compteur de likes
    $likeButtons.forEach(($likeButton) => {
      $likeButton.addEventListener('click', manageLikesUpdate);
      $likeButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          manageLikesUpdate();
        }
      });
    });
  }

  /**
   * mise à jour du compteur de likes
   * @param {number} totalLikes 
   */
  updateLikesCountered(totalLikes) {
    const $likesCounter = document.querySelector('.totalLikes');
    if ($likesCounter) {
      $likesCounter.innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`;
    }
  }

  onChangeFilter() {
    const filterButtons = this.$wrapper.querySelectorAll('.filter_form_button');
    const dropdown = this.$wrapper.querySelector('#dropdown');
    const dropdownOpen = this.$wrapper.querySelector('.dropdown_open');
    let secondClick = false;

    /**
     * afficher / masquer les boutons de filtre et ajuster les styles
     * @param {boolean} show boutons affichés (true) ou masqués (false)
     */
    function FilterButtons(show) {
      filterButtons.forEach((btn) => show ? btn.classList.remove('hidden') : btn.classList.add('hidden'));
      dropdown.firstElementChild.style.borderBottomLeftRadius = show ? '0px' : '5px';
      dropdown.firstElementChild.style.borderBottomRightRadius = show ? '0px' : '5px';
      dropdown.lastElementChild.style.borderBottomLeftRadius = show ? '5px' : '0px';
      dropdown.lastElementChild.style.borderBottomRightRadius = show ? '5px' : '0px';
    }

    dropdown.addEventListener('click', (e) => {
      if (e.target !== dropdown) {
        if (!secondClick) {
          FilterButtons(true);
        } else {
          const newnode = e.target;
          const first = dropdown.firstElementChild;
          dropdown.insertBefore(newnode, first);
          FilterButtons(false);
          newnode.classList.remove('hidden');
          this.filterMedias(newnode.value);
        }
        secondClick = !secondClick;
      }
    });

    dropdownOpen.addEventListener('click', () => {
      if (!secondClick) {
        FilterButtons(true);
      }
      secondClick = !secondClick;
    });
  }

  // Supprime tous les éléments dans la template
  clearMediasWrapper() {
    this.$mediasWrapper.innerHTML = "";
  }

  render() {
    const filterForm = `
    <div class="filter">
      <label id="filter_label" for="dropdown">Trier par</label>
      <div class="filter_form" aria-labelledby="filter_label" role="button" aria-haspopup="listbox" aria-expanded="false">    
        <img src="assets/images/chevron.png" class="dropdown_open" alt="open dropdown"/>
        <div class="dropdown" id="dropdown" role="listbox" tabindex="-1" hidden>
          <button class="filter_form_button" id="likes-btn" type="button" role="option" aria-activedescendant aria-selected="true" aria-labelledby="dropdown likes-btn" value="likes" tabindex="0">Popularité</button>
          <button class="filter_form_button hidden" id="title-btn" type="button" role="option" aria-activedescendant aria-selected="false" aria-labelledby="dropdown title-btn" value="title" tabindex="0">Titre</button>
          <button class="filter_form_button hidden" id="date-btn" type="button" role="option" aria-activedescendant aria-selected="false" aria-labelledby="dropdown date-btn" value="date" tabindex="0">Date</button>
        </div>
      </div>
    </div>
    `;
    this.$wrapper.innerHTML = filterForm;
    this.onChangeFilter();
    this.$filterWrapper.appendChild(this.$wrapper);
  }
}

export { FilterDropdown };
