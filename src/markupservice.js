import 'simplelightbox/dist/simple-lightbox.min.css';

export default class MarkupService {
  constructor(reference) {
    this.ref = reference;
    this.markup = '';
    this.imgList = [];
  }

  resetMarkup() {
    this.ref.innerHTML = '';
  }

  makeCardMarkup() {
    if (this.imgList.length === 0) {
      this.markup = '';
      return;
    }
    this.markup = this.imgList
      .map(element => {
        return `
           <div class="photo-card">
           <a class="card-ref" href="${element.largeImageURL}">
            <img class="photo-img" src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b><br>${element.likes}
            </p>
            <p class="info-item">
              <b>Views</b><br>${element.views}
            </p>
            <p class="info-item">
              <b>Comments</b><br>${element.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b><br>${element.downloads}
            </p>
          </div>
        </div>
`;
      })
      .join('');
  }

  async renderMarkup() {
    await this.ref.insertAdjacentHTML('beforeend', this.markup);
  }

  set imagesArray(a) {
    this.imgList = a;
  }
}
