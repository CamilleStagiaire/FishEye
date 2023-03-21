class Api {
  /** 
     *
     *@param {string} url
     */
  constructor(url) {
    this._url = url;
  }

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
  async getMedias() {
    return await this.get('media');
  }
}

