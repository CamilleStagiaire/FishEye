/* eslint-disable linebreak-style */
/* eslint-disable spaced-comment */
//Mettre le code JavaScript lié à la page photographer.html

class PhotographerPage{
    constructor( media) {
      //this._photographer = photographer
      this._media = media
     
    }
    
    createMediaCard() {
     
   
     // const id = this._media._photographerId;

  // récupération de la chaîne de requête dans l'url
      const queryString_url_id = window.location.search
      const urlSearchParams = new URLSearchParams(queryString_url_id)

      const getIdPhotagrapher = urlSearchParams.get("id")
   
console.log(getIdPhotagrapher);
 

      const $wrapper = document.createElement('article')
      $wrapper.classList.add('media')
  
      const mediaCard = `
        <h2 class="media-title">${this._media.title}</h2>
      `
  
      $wrapper.innerHTML = mediaCard
      return $wrapper
    }
  }
  