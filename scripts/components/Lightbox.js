class Lightbox {
    //Initialise la lightbox
    static init() {
        const mediaItems = document.querySelectorAll('.photograph_media>.media img, .photograph_media>.media video.lightbox-video');
        mediaItems.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const media = e.target.closest('img, video');
                const url = media.src || media.currentSrc;
                new Lightbox(url);
            });
        });
    }

    /**
     * @param {string} url URL de l'image
     */
    constructor(url) {
        const element = this.buildDOM(url);
        document.body.appendChild(element);

        // tableau des éléments
        this.mediaList = Array.from(document.querySelectorAll('.photograph_media .media video, .photograph_media .media img'));

        // désactiver en lecture clavier les élements de fond
        const tabIndexed = document.querySelectorAll('.accessibility');
        tabIndexed.forEach((tabIndex) => {
            tabIndex.setAttribute('tabindex', '-1')
        });

        const closeButton = element.querySelector('.lightbox_close');
        closeButton.addEventListener('click', () => {
            this.close();
        });

        const nextButton = element.querySelector('.lightbox_next');
        nextButton.addEventListener('click', () => {
            this.showNext();
        });

        const prevButton = element.querySelector('.lightbox_prev');
        prevButton.addEventListener('click', () => {
            this.showPrev();
        });

        // Accès au clavier
        document.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                this.close();
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const direction = e.key === 'ArrowRight' ? 1 : -1;
                const currentMedia = document.querySelector('.lightbox_container video, .lightbox_container img');
                const currentSrc = currentMedia.getAttribute('src');
                const currentIndex = this.mediaList.findIndex(media => media.getAttribute('src') === currentSrc);
                const nextIndex = currentIndex + direction;
                if (nextIndex >= 0 && nextIndex < this.mediaList.length) {
                    
                    setTimeout(() => {
                        this.showMedia(nextIndex);
                    }, 500);
                }
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
        const mediaType = url.endsWith('.mp4') ? 'video' : 'img';
        dom.innerHTML = `
          <button class="lightbox_close" tabindex="0">Fermer</button>
          <button class="lightbox_next" tabindex="0">Suivant</button>
          <button class="lightbox_prev" tabindex="0">Précédent</button>
          <div class="lightbox_container">
            <${mediaType} src="${url}" alt=""${mediaType === 'video' ? ' controls class="lightbox-video"' : ''}></${mediaType}>
          </div>
        `;
        return dom;
    }

    close() {
        const element = document.querySelector('.lightbox');
        if (element) {
            element.classList.add('fadeOut');
            setTimeout(() => {
                element.parentNode.removeChild(element);
            }, 500);

            // réactiver en lecture clavier les élements de fond
            const tabIndexed = document.querySelectorAll('.accessibility');
            tabIndexed.forEach((tabIndex) => {
                tabIndex.setAttribute('tabindex', '0')
            });
        }
    }

    /**
     * Affiche le média correspondant à l'index donné dans la lightbox
     * @param {number} index //index du média
     */
    showMedia(index) {
        // Récupère le média à partir de la liste des médias
        const media = this.mediaList[index];
        // Récupère l'URL du média
        const src = media.getAttribute('src');
        // Détermine le type de média (image ou vidéo) à partir de la balise HTML 
        const type = media.tagName.toLowerCase();
        const lightboxContainer = document.querySelector('.lightbox_container');
        lightboxContainer.innerHTML = '';

        if (type === 'img') {
            const img = document.createElement('img');
            img.setAttribute('src', src);
            lightboxContainer.appendChild(img);
        } else if (type === 'video') {
            const video = document.createElement('video');
            video.setAttribute('src', src);
            video.setAttribute('controls', true);
            lightboxContainer.appendChild(video);
        }
    }

    showNext() {
        //Récupère l'élément HTML qui contient le média courant
        const currentMedia = document.querySelector('.lightbox_container video, .lightbox_container img');
        // Récupère l'URL du média courant
        const currentSrc = currentMedia.getAttribute('src');
        // Récupère l'indice du média courant dans le tableau
        const currentIndex = this.mediaList.findIndex(media => media.getAttribute('src') === currentSrc);

        if (currentIndex !== -1 && currentIndex < this.mediaList.length - 1) {
            setTimeout(() => {
                this.showMedia(currentIndex + 1)
            }, 500);
        }
    }

    showPrev() {
        const currentMedia = document.querySelector('.lightbox_container video, .lightbox_container img');
        const currentSrc = currentMedia.getAttribute('src');
        const currentIndex = this.mediaList.findIndex(media => media.getAttribute('src') === currentSrc);

        if (currentIndex !== -1 && currentIndex > 0) {
            setTimeout(() => {
                this.showMedia(currentIndex - 1);
            }, 500);
        }
    }
}

window.Lightbox = Lightbox;
Lightbox.init()

export { Lightbox };
