class Api {
  /** 
     *
     *@param {string} url
     */
  constructor(url) {
    this._url = url;
  }

  /**
   * @param {string} type 
   * @returns {Promise}
   */
  async get(type) {
    return fetch(this._url)
      .then((res) => res.json())
      .then((res) => res[type])
      .catch((err) => console.log('an error occurs', err));
  }
}

class PhotographerApi extends Api {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(url);

  }
  /**
   * @returns {Promise}
   */
  async getPhotographers() {
    return await this.get('photographers');
  }
}

class MediaApi extends Api {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  /**
   * @param {number} photographeId 
   * @returns {Promise}
   */
  async getMedias(photographeId) {
    const response = await fetch(this._url);
    const data = await response.json();
    const medias = data.media.filter(media => media.photographerId === photographeId);
    return medias;
  }
}

