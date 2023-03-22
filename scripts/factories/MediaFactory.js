class MediaFactory {
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


