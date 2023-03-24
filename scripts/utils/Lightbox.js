class Lightbox {

    /**
     * Initialise la lightbox
     */
    static init() {
        const links = document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"]');

        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                new Lightbox(e.currentTarget.getAttribute('src'));
            });
        });
    }

    /**
     * @param {string} url URL de l'image
     */
    constructor(url) {
        const element = this.buildDOM(url);
        document.body.appendChild(element);

        const closeButton = element.querySelector('.lightbox__close');
        closeButton.addEventListener('click', () => {
            this.close();
        });

        const nextButton = element.querySelector('.lightbox__next');
        nextButton.addEventListener('click', () => {
            this.showNext();
        });

        const prevButton = element.querySelector('.lightbox__prev');
        prevButton.addEventListener('click', () => {
            this.showPrev();
        });

        // Accès au clavier
        document.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                this.close();
            } else if (e.key === 'ArrowRight') {
                this.showNext();
            } else if (e.key === 'ArrowLeft') {
                this.showPrev();
            }
        });
    }

    /**
     * Crée l'élément DOM de la lightbox avec l'URL de l'image donnée
     * @param {string} url URL de l'image
     * @returns {HTMLElement}  
     */
    buildDOM(url) {
        const dom = document.createElement('div');
        dom.classList.add('lightbox');
        dom.innerHTML = `
        <button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__prev">Précédent</button>
        <div class="lightbox__container">
          <img src="${url}" alt="">
        </div>
      `;
        return dom;
    }

   //Ferme la lightbox
    close() {
        const element = document.querySelector('.lightbox');
        if (element) {
            element.parentNode.removeChild(element);
        }
    }

    //Affiche l'image suivante dans la lightbox
    showNext() {
        //récupère l'image courante
        const currentImage = document.querySelector('.lightbox__container img');
        //récupère l'attribut l'image courante
        const currentSrc = currentImage.getAttribute('src');
        // Récupère toutes les images de la page dans un tableau
        const images = Array.from(document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"]'));
        // Récupère l'index de l'image courante dans le tableau images
        const currentIndex = images.findIndex(image => image.getAttribute('src') === currentSrc);
        // Calcule l'index de l'image suivante à afficher
        const nextIndex = (currentIndex + 1) % images.length;
        // Récupère l'image suivante à afficher
        const nextImage = images[nextIndex];
        // Récupère l'attribut src de l'image suivante
        const nextSrc = nextImage.getAttribute('src');
        // Change l'attribut de l'image courante pour afficher l'image suivante
        currentImage.setAttribute('src', nextSrc);
    }

    //Affiche l'image précédente dans la lightbox
    showPrev() {
        const currentImage = document.querySelector('.lightbox__container img');
        const currentSrc = currentImage.getAttribute('src');
        const images = Array.from(document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"]'));
        const currentIndex = images.findIndex(image => image.getAttribute('src') === currentSrc);
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        const prevImage = images[prevIndex];
        const prevSrc = prevImage.getAttribute('src');
        currentImage.setAttribute('src', prevSrc);
    }
}
window.Lightbox = Lightbox;
Lightbox.init()

 // Récupère uniquement les images de la classe ImageMedia
 // const imageMedias = medias.filter(media => media instanceof ImageMedia);