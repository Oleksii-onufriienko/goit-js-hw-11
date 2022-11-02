import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const SOURCE_SRV =
  'https://pixabay.com/api/?key=31033465-5993d082d5a9a4a2e6778e4ca';

export default class ApiService {
  constructor(per_page) {
    this.page = 1;
    this.per_page = per_page;
    this.imageList = [];
    this.totalImages = 0;
    this.searchQuery = '';
  }

  async getImg(searchNameImg) {
    try {
      if (searchNameImg) this.searchQuery = searchNameImg;
      const searchString = `${SOURCE_SRV}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`;
      const response = await axios.get(searchString);
      this.page += 1;
      this.imageList = response.data.hits;
      this.totalImages = response.data.totalHits;
      return this.imageList;
    } catch (error) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return [];
    }
  }

  set currentPage(a) {
    this.page = a;
  }
  get currentPage() {
    return this.page;
  }
  get totalHits() {
    return this.totalImages;
  }
}
