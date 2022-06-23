
import Notiflix from 'notiflix';


const axios = require('axios');

const BASE_URL = "https://pixabay.com/api/";
const KEY = '28129229-bb4cd1c73e2b9860b59b7f6a7';

export default class SearchApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
    }
    

    async fetchArticles() {
    const options = new URLSearchParams ({
    key: KEY,
    q: this.searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: this.page,
    per_page: '40',
    })
    

const url = `${BASE_URL}?${options}`
    return await axios.get(url).then(response => {
        this.incrementPage();
        
    return response.data;
    });
    }

    incrementPage() {
    this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
       
    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
};




