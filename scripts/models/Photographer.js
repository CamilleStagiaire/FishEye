class Photographer {
    /**
     * @param {Object} data 
     */
    constructor(data) {
        this._name = data.name
        this._id = data.id
        this._city = data.city
        this._country = data.country
        this._tagline = data.tagline
        this._price = data.price
        this._portrait = data.portrait
        this._medias = data.medias;
    }

    get name() {
        return this._name
    }

    get id() {
        return this._id
    }

    get city() {
        return this._city
    }

    get country() {
        return this._country
    }

    get tagline() {
        return this._tagline
    }

    get price() {
        return this._price
    }

    get portrait() {
        return `/assets/thumbnail/Portraits/${this._portrait}`
    }

    get media() {
        return this._media;
    }

    /**
     * initialise la liste des médias du photographe 
     * @param {Media} media 
     */
    addMedia(media) {
        if (!this._medias) {
            this._medias = [];
        }
        this._medias.push(media);
    }

    /**
    * Renvoie le nombre total de likes du photographe
    * @returns {number}
    */
    getTotalLikes() {
        let totalLikes = 0;
        for (const media of this._medias) {
            totalLikes += media.likes;
        }
        return totalLikes;
    }
}
export { Photographer };
