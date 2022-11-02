import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiService from './apiservice';
import MarkupService from './markupservice';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  button: document.querySelector('button.load-more'),
};

refs.form.addEventListener('submit', handleSubmit);
imageApiService = new ApiService();
markupGallery = new MarkupService(refs.gallery);

async function handleSubmit(event) {
  const searchNameImg = event.currentTarget.searchQuery.value.trim();
  event.preventDefault();

  const imgList = await imageApiService.getImg(searchNameImg);
  markupGallery.resetMarkup();

  if (imgList.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  markupGallery.imagesArray = imgList;
  markupGallery.makeCardMarkup();
  markupGallery.renderMarkup();
}
