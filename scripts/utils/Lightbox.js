class Lightbox {
    //Initialise la lightbox
    static init() {
        const links = document.querySelectorAll('.photograph_media>.media img');
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

    //Ferme la lightbox avec un délai de 500ms
    close() {
        const element = document.querySelector('.lightbox');
        if (element) {
            element.classList.add('fadeOut');
            setTimeout(() => {
                element.parentNode.removeChild(element);
            }, 500);
        }
    }

    //Affiche l'image suivante dans la lightbox
    showNext() {
        //récupère l'image courante
        const currentImage = document.querySelector('.lightbox__container img');
        //récupère l'attribut l'image courante
        const currentSrc = currentImage.getAttribute('src');
        // Récupère toutes les images de la page dans un tableau
        const images = Array.from(document.querySelectorAll('.photograph_media>.media img'));
        // Récupère l'index de l'image courante dans le tableau images
        const currentIndex = images.findIndex(image => image.getAttribute('src') === currentSrc);

        if (currentIndex !== 8) {
            // Calcule l'index de l'image suivante à afficher
            const nextIndex = (currentIndex + 1) % images.length;
            // Récupère l'image suivante à afficher
            const nextImage = images[nextIndex];
            // Récupère l'attribut src de l'image suivante
            const nextSrc = nextImage.getAttribute('src');
            // Change l'attribut de l'image courante pour afficher l'image suivante avec un délai de 500ms
            setTimeout(() => {
                currentImage.setAttribute('src', nextSrc);
            }, 500);
        }
    }

    //Affiche l'image précédente dans la lightbox
    showPrev() {
        const currentImage = document.querySelector('.lightbox__container img');
        const currentSrc = currentImage.getAttribute('src');
        const images = Array.from(document.querySelectorAll('.photograph_media>.media img'));
        const currentIndex = images.findIndex(image => image.getAttribute('src') === currentSrc);

        if (currentIndex !== 0) {
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            const prevImage = images[prevIndex];
            const prevSrc = prevImage.getAttribute('src');
            setTimeout(() => {
                currentImage.setAttribute('src', prevSrc);
            }, 500);
        }
    }  
}
window.Lightbox = Lightbox;
Lightbox.init()

export { Lightbox };
