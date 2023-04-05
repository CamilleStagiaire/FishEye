import { Photographer } from '../models/Photographer.js';
import { Media } from '../models/Media.js';
import { Filter } from '../utils/Filter.js';
import { PhotographerPage } from '../pages/photographer.js';

class FilterDropdown {
  /**
    * @param {Media[]} medias 
    * @param {Photographer} photographer
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
   * @param {string} filterBy 
   */
  async filterMedias(filterBy) {
    this.clearMediasWrapper();

    const filterMedias = new Filter(this._medias);
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

    const $likeButtons = this.$mediasWrapper.querySelectorAll('.fa-heart');

    $likeButtons.forEach(($likeButton) => {
      $likeButton.addEventListener('click', () => {
        const totalLikes = filteredMedias.reduce((acc, media) => acc + media.likes, 0);
        this.updateLikesCountered(totalLikes);
      });
    });
  }

  //mise à jour du compteur de likes
  updateLikesCountered(totalLikes) {
    const $likesCounter = document.querySelector('.totalLikes');
    if ($likesCounter) {
      $likesCounter.innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`;
    }
  }

  onChangeFilter() {
    const filterButtons = this.$wrapper.querySelectorAll('.filter-form_button');
    //const filterImg = this.$wrapper.querySelectorAll('.dropdown_open');
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

export { FilterDropdown };
