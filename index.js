
class PhotoGallery {
    constructor(){
        this.API_KEY = '563492ad6f91700001000001de0061331c5c4b77afac0e87110a6042';
        this.galleryDiv = document.querySelector('.gallery');
        this.searchForm = document.querySelector('.header form');
        this.loadMore = document.querySelector('.load-more');
        this.logo = document.querySelector('.logo');
        this.pageIndex = 1;
        this.searchValueGlobal = '';
        this.eventHandler();
    }
    eventHandler(){
        document.addEventListener('DOMContentLoaded', ()=> {
            this.getImg(1);
        });
        this.searchForm.addEventListener('submit', (e)=>{
            this.pageIndex = 1;
            this.getSearchedImages(e);
        });
        this.loadMore.addEventListener('click', (e)=>{
            this.loadMoreImages(e);
        })
        this.logo.addEventListener('click', ()=>{
            this.pageIndex = 1;
            this.galleryDiv.innerHTML = '';
            this.getImg(this.pageIndex);
        })
    }
    async getImg(index){
        this.loadMore.setAttribute('data-img', 'curated')
        const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`;
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos)
        
    }
    async fetchImages(baseURL){
        const response = await fetch(baseURL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: this.API_KEY
            }
        });
        const data = await response.json();
        return data;
    }
    GenerateHTML(photos){
        photos.forEach(photo => {
            const item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `
            <a href="#">
                <img src="${photo.src.medium}">
                <h3>${photo.photographer}</h3>
            </a>
            `;
            this.galleryDiv.appendChild(item)
        })
    }
    async getSearchedImages(e){
        this.loadMore.setAttribute('data-img', 'search')
        e.preventDefault();
        this.galleryDiv.innerHTML = '';
        const searchValue = e.target.querySelector('input').value;
        this.searchValueGlobal = searchValue;
        const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=12`
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos);
        e.target.reset();
    }
    async getMoreSearchedImages(index){
        const baseURL = `https://api.pexels.com/v1/search?query=${this.searchValueGlobal}&page=${index}&per_page=12`
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos);
    }
    loadMoreImages(e){
        let index = ++this.pageIndex;
        const loadMoreData = e.target.getAttribute('data-img');
        if(loadMoreData === 'curated') {
            //load page 2 for curated
            this.getImg(index)
        } else {
            //load page 2 for search
            this.getMoreSearchedImages(index);
        }
    }
}

const gallery = new PhotoGallery;