class PhotoGallery {
    constructor() {
        this.galleryDiv = document.querySelector('.gallery');
        this.searchForm = document.querySelector('.header form');
        this.loadMore = document.querySelector('.load-more');
        this.logo = document.querySelector('.logo');
        this.imageFilenames = ['img/photo1.jpg', 'img/photo2.jpg', 'img/photo3.jpg', 'img/photo4.jpg', 'img/photo5.jpg', 'img/photo6.jpg', 'img/photo7.jpg', 'img/photo8.jpg', 'img/photo9.jpg', 'img/photo10.jpg', 'img/photo11.jpg', 'img/photo12.jpg', 'img/photo13.jpg', 'img/photo14.jpg', 'img/photo15.jpg'];

        this.GenerateHTML(this.imageFilenames); // Load images once the page is initialized
    }

    GenerateHTML(imageFilenames) {
        imageFilenames.forEach((filename, index) => {
            const item = document.createElement('div');
            item.classList.add('item');

            const imageNumber = index + 1;

            item.innerHTML = `
                <a href="${filename}" target="_blank">
                    <img src="${filename}" alt="Image ${imageNumber}">
                    <h3>Image ${imageNumber}</h3>
                </a>
            `;
            this.galleryDiv.appendChild(item);
        });
    }
}

// Initialize the PhotoGallery class when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PhotoGallery();
});

const openPopupButton = document.getElementById('openPopup');
const closePopupButton = document.getElementById('closePopup');
const popup = document.getElementById('popup');

openPopupButton.addEventListener('click', () => {
    popup.style.display = 'block';
});

closePopupButton.addEventListener('click', () => {
    popup.style.display = 'none';
});
