class MediaGallery {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.lightbox = document.createElement('div');
        this.initLightbox();
        this.addEventListeners();
    }

    initLightbox() {
        this.lightbox.className = 'media-lightbox';
        this.lightbox.innerHTML = `
            <div class="media-lightbox__content">
                <span class="media-lightbox__close">&times;</span>
                <div class="media-lightbox__body"></div>
            </div>
        `;
        document.body.appendChild(this.lightbox);
    }

    addEventListeners() {
        this.galleryItems.forEach(item => {
            item.addEventListener('click', (e) => this.openLightbox(e));
        });

        this.lightbox.querySelector('.media-lightbox__close').addEventListener('click', () => this.closeLightbox());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.closeLightbox();
        });
    }

    openLightbox(event) {
        const mediaElement = event.currentTarget.cloneNode(true);
        const mediaType = event.currentTarget.dataset.mediaType;
        
        const body = this.lightbox.querySelector('.media-lightbox__body');
        body.innerHTML = '';
        
        if (mediaType === 'video') {
            const video = mediaElement.querySelector('video');
            video.removeAttribute('controls');
            const cloneVideo = video.cloneNode(true);
            cloneVideo.setAttribute('controls', 'true');
            body.appendChild(cloneVideo);
        } else {
            body.appendChild(mediaElement);
        }
        
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Инициализация на страницах с галереей
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.media-gallery')) {
        new MediaGallery();
    }
});
