
    class Media {
        constructor(data) {
          this._id = data.id;
          this._photographerId = data.photographerId;
          this._title = data.title;
          this._image = `${data.image}`;
          this._video = `${data.video}`;
          this._likes = data.likes;
          this._date = data.date;
          this._price = data.price;
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
      
        get date() {
          return this._date;
        }
      
        get price() {
          return this._price;
        }
      }
      class ImageMedia extends Media {
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
        constructor(data) {
          super(data);
          this._type = 'video';
          this._url = `/assets/photographers/${this._photographerId}/${this._video}`;
        }
      
        get type() {
          return this._type;
        }
      
        get url() {
          return this._url;
        }
      }


