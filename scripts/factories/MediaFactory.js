import { ImageMedia, VideoMedia } from '../models/Media.js';

class MediaFactory {
    /**
     * Création une instance de la classe ImageMedia ou VideoMedia en fonction du type de média
     * @param {Object} data 
     * @returns {ImageMedia|VideoMedia} 
     */
    static create(data) {
        if (data.image) {
            return new ImageMedia(data);
        } else if (data.video) {
            return new VideoMedia(data);
        } else {
            throw 'Invalid media data';
        }
    }
}

export { MediaFactory, ImageMedia, VideoMedia };