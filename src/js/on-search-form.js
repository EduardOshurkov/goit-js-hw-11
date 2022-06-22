import Notiflix from 'notiflix';
const axios = require('axios');

const BASE_URL = "https://pixabay.com/api/";
const KEY = '28129229-bb4cd1c73e2b9860b59b7f6a7';

export default class SearchApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
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
        this.page += 1;
    
    return response.data;
    });
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







// export default class SearchApiService {
//     constructor() {
//         this.searchQuery = '';
//         this.page = 1;
//      }

//     fetchArticles() {
//     const options = new URLSearchParams ({
//     key: '28129229-bb4cd1c73e2b9860b59b7f6a7',
//     q: this.searchQuery,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: 'true',
//     page: this.page,
//     per_page: '40'
// })

// return fetch(`${BASE_URL}?${options}`)
//     .then(response => response.json())
//     .then(({ hits }) => {
//         this.page += 1;
//         return hits;
//     })
//     }

//     resetPage() {
//         this.page = 1;
//     }

//     get query() {
//         return this.searchQuery
//     }

//     set query(newQuery) {
//         this.searchQuery = newQuery;
//     }
// };


