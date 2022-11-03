import axios from 'axios';

const SOURCE_SRV =
  'https://pixabay.com/api/?key=31033465-5993d082d5a9a4a2e6778e4ca';

export default class ApiService {
  constructor(per_page) {
    this.page = 1;
    this.per_page = per_page;
    this.imageList = [];
    this.totalHits = 0;
    this.searchQuery = '';
    // общий счетчик загруженых картинок
    this.renderCount = 0;
  }

  async getImg(searchNameImg) {
    try {
      if (searchNameImg) this.searchQuery = searchNameImg;
      const searchString = `${SOURCE_SRV}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`;
      const response = await axios.get(searchString);
      this.page += 1;
      this.imageList = response.data.hits;
      this.totalHits = response.data.totalHits;
      this.renderCount += this.imageList.length;
      return this.imageList;
    } catch (error) {
      return [];
    }
  }

  resetRenderCount() {
    this.renderCount = 0;
  }

  get endLibrary() {
    // возвращает 0 если все загружены и в библиотеке <= елементов, чем per_pag
    // возвращает 1 если все загружены и в библиотеке больше елементов, чем per_page
    // возвращает 2 если если загружены не все элементы библиотеки
    if (this.totalHits === this.renderCount && this.totalHits <= this.per_page)
      return 0;
    if (this.totalHits === this.renderCount && this.totalHits > this.per_page)
      return 1;
    return 2;
  }
}
