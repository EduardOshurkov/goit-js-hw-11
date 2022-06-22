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

refs.searchForm.addEventListener('submit', onSearch);

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});
    
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

const lightBox = new SimpleLightbox('.gallery div a', {
  captionDelay: 250,
  captionsData: 'alt',
});

const searchApiService = new SearchApiService();



function onSearch(e) {
    e.preventDefault();

    searchApiService.query = e.currentTarget.elements.searchQuery.value
    if (searchApiService.query === '') {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
    }


    searchApiService.resetPage();
    searchApiService.fetchArticles().then(hits => {
        getMessage(hits)
        clearArticlesContainer();
        loadMoreBtn.enable();       
    });
};

function appendArticlesMarkup(hits) {
    refs.imageContainer.insertAdjacentHTML('beforeend', infoContainer(hits));

    console.log(searchApiService.page);

    lightBox.refresh();
    
        if (hits.totalHits < (searchApiService.page - 1) * 40) {
            loadMoreBtn.disable();
            loadMoreBtn.hide();
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }
    loadMoreBtn.show(); 
}

function onLoadMore() {
    searchApiService.fetchArticles().then(appendArticlesMarkup)    
}

function clearArticlesContainer() {
    refs.imageContainer.innerHTML = '';
}


function getMessage() {
    try {
        searchApiService.fetchArticles().then(hits => {
        const total = hits.total;
        const totalHits = hits.totalHits

        if (total === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            loadMoreBtn.hide();
            return;
        } else {
            appendArticlesMarkup(hits) 
        }
        if (searchApiService.page = 1) {
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
        }
    })
    } catch (error) {
        console.log(error);
    }
}



