import * as axios from "axios";
import SearchApiService from "./on-search";

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

    searchApiService.fetchArticles();
};

function onLoadMore() {
 searchApiService.fetchArticles();
}






