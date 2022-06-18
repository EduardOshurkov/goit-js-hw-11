const BASE_URL = "https://pixabay.com/api/";
export default class SearchApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
     }

    fetchArticles() {
        console.log(this);
    const options = new URLSearchParams ({
    key: '28129229-bb4cd1c73e2b9860b59b7f6a7',
    q: this.searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: this.page,
    per_page: '40'
})


fetch(`${BASE_URL}?${options}`)
    .then(r => r.json())
    .then(data => {
        this.page += 1;
    });
    };


    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
};


 // e.preventDefault();

    // const searchQuery = e.currentTarget.elements.searchQuery.value
    // const BASE_URL = "https://pixabay.com/api/";