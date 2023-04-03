import { ImageMedia, VideoMedia } from '../models/Media.js';

class MediaFactory {
    /**
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