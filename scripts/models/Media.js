class Media {
  /**
   * @param {Object} data 
   */
  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._image = `${data.image}`;
    this._video = `${data.video}`;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
    this._isLiked = false;
  }

  addLike() {
    this.likes++;
    this._isLiked = true;
  }

  get id() {
    return this._id;
  }

  get photographerId() {
    return this._photographerId;
  }

  get title() {
    return this._title;
  }

  get image() {
    return this._image;
  }

  get likes() {
    return this._likes;
  }

  set likes(value) {
    this._likes = value;
  }

  get date() {
    return this._date;
  }

  get price() {
    return this._price;
  }
  get isLiked() {
    return this._isLiked;
  }
  set isLiked(value) {
    this._isLiked = value;
  }
}

//
class ImageMedia extends Media {
  /**
   * @param {Object} data 
   */
  constructor(data) {
    super(data);
    this._type = 'image';
    this._url = `/assets/thumbnail/${this._photographerId}/${this._image}`;
  }

  get type() {
    return this._type;
  }

  get url() {
    return this._url;
  }
}

class VideoMedia extends Media {
  /**
   * @param {Object} data 
   */
  constructor(data) {
    super(data);
    this._type = 'video';
    this._url = `/assets/thumbnail/${this._photographerId}/${this._video}`;
  }

  get type() {
    return this._type;
  }

  get url() {
    return this._url;
  }
}

export { Media, ImageMedia, VideoMedia };

