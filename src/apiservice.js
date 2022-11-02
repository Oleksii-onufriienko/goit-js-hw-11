import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const SOURCE_SRV =
  'https://pixabay.com/api/?key=31033465-5993d082d5a9a4a2e6778e4ca';

export default class ApiService {
  constructor() {
    this.page = 1;
    this.per_page = 40;
    this.searchQuery = '';
  }

  async getImg(searchNameImg) {
    try {
      const searchString = `${SOURCE_SRV}&q=${searchNameImg}&image_type=photo&orientation=horizontal&safesearch=true`;
      const response = await axios.get(searchString);
      return response.data.hits;
    } catch (error) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return [];
    }
  }
}
