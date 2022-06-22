import * as axios from "axios";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SearchApiService from "./js/on-search-form";
import infoContainer from "./js/add-info-container";
import Notiflix from 'notiflix';
import LoadMoreBtn from "./load-more-btn";


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
    lightBox.refresh();
    setTimeout(() => {
    loadMoreBtn.show(); 
    },2000)
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
        console.log(hits);
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
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        }
        console.log(data.length);
        if (totalHits.length<40) {
            loadMoreBtn.hide();
            Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
        }
    })
    } catch (error) {
        console.log(error);
    }
}



