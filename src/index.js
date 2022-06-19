import * as axios from "axios";
import SearchApiService from "./js/on-search-form";
import infoContainer from "./js/add-info-container";


const refs = {
    searchForm: document.querySelector('.search-form'),
    imageContainer: document.querySelector('.gallery'),
    loadMore:document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);


const searchApiService = new SearchApiService();


function onSearch(e) {
    e.preventDefault();

    searchApiService.query = e.currentTarget.elements.searchQuery.value

    if (searchApiService.query === '') {
        return alert("Error")
    }

    searchApiService.resetPage();
    searchApiService.fetchArticles().then(appendArticlesMarkup)

    onLoadMore() 
    clearArticlesContainer();
};


function appendArticlesMarkup(hits) {
    refs.imageContainer.insertAdjacentHTML('beforeend', infoContainer(hits));
}


function onLoadMore() {
    searchApiService.fetchArticles().then(appendArticlesMarkup)
        // .then(setTimeout(() => {
        //     refs.loadMore.classList.remove('is-hidden');
        // }, 2000));
}


function clearArticlesContainer() {
    refs.imageContainer.innerHTML = '';
}





