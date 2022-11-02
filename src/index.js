import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiService from './apiservice';
import MarkupService from './markupservice';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  button: document.querySelector('button.load-more'),
};

refs.form.addEventListener('submit', handleSubmit);
refs.button.addEventListener('click', handleButton);

imageApiService = new ApiService(20);
markupGallery = new MarkupService(refs.gallery);

async function handleSubmit(event) {
  const searchNameImg = event.currentTarget.searchQuery.value.trim();
  event.preventDefault();
  //  при сабмите формы начинаем рендерить с первой страницы
  imageApiService.currentPage = 1;
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

async function handleButton(event) {
  console.log(imageApiService);

  markupGallery.imagesArray = await imageApiService.getImg();
  markupGallery.makeCardMarkup();
  markupGallery.renderMarkup();

  console.log('всего картинок', imageApiService.totalHits);
}
