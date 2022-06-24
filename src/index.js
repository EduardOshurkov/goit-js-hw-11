import * as axios from "axios";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SearchApiService from "./js/on-search-form";
import infoContainer from "./js/add-info-container";
import Notiflix from 'notiflix';
import LoadMoreBtn from "./js/load-more-btn";


const refs = {
    searchForm: document.querySelector('.search-form'),
    imageContainer: document.querySelector('.gallery'),
};


const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const searchApiService = new SearchApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);


const lightBox = new SimpleLightbox('.gallery div a', {
  captionDelay: 250,
  captionsData: 'alt',
});


function onSearch(e) {
    e.preventDefault();

    searchApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    if (searchApiService.query === "") {
     return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    
    searchApiService.resetPage();
    clearArticlesContainer();
    fetchArticles();

};

function fetchArticles() {
    searchApiService.fetchArticles().then(hits => {
        loadMoreBtn.enable(); 
        

        const total = hits.total;
        const totalHits = hits.totalHits

        if (totalHits === 0) {
            loadMoreBtn.hide();
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        
        } 
        if (searchApiService.page === 1) {
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
        }
       appendArticlesMarkup(hits) 
    });
}

function onLoadMore() {
    searchApiService.fetchArticles().then(appendArticlesMarkup)    
}

function appendArticlesMarkup(hits) {
    try {
        refs.imageContainer.insertAdjacentHTML('beforeend', infoContainer(hits));
        loadMoreBtn.show(); 
        lightBox.refresh();

        if (hits.totalHits < (searchApiService.page - 1) * 40) {
            loadMoreBtn.disable();
            loadMoreBtn.hide();
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
            return;
        }
         
    } catch (error) {
        console.log(error);
    }
    
}

function clearArticlesContainer() {
    refs.imageContainer.innerHTML = '';
}



