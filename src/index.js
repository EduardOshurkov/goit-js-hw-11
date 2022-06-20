import * as axios from "axios";
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

const searchApiService = new SearchApiService();



function onSearch(e) {
    e.preventDefault();

    searchApiService.query = e.currentTarget.elements.searchQuery.value

    if (searchApiService.query === '') {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
    }
  
    setTimeout(() => {
    loadMoreBtn.show();
    }, 2000)
    
    loadMoreBtn.disable();

    searchApiService.resetPage();
    searchApiService.fetchArticles().then(hits => {
        clearArticlesContainer();
        appendArticlesMarkup(hits)
        loadMoreBtn.enable();
    });
};

function appendArticlesMarkup(hits) {
    refs.imageContainer.insertAdjacentHTML('beforeend', infoContainer(hits));
}

function onLoadMore() {
    searchApiService.fetchArticles().then(appendArticlesMarkup)    
}

function clearArticlesContainer() {
    refs.imageContainer.innerHTML = '';
}




