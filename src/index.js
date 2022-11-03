import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiService from './apiservice';
import MarkupService from './markupservice';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const RENDER_ITEM_COUNT = 40;

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  button: document.querySelector('button.load-more'),
};

refs.form.addEventListener('submit', handleSubmit);
refs.button.addEventListener('click', handleButton);

let imageApiService = new ApiService(RENDER_ITEM_COUNT);
let markupGallery = new MarkupService(refs.gallery);
let simpleLightbox = new SimpleLightbox('.gallery a');

hiddenButton(refs.button);

async function handleSubmit(event) {
  const searchNameImg = event.currentTarget.searchQuery.value.trim();
  event.preventDefault();
  imageApiService.resetRenderCount();
  markupGallery.resetMarkup();
  //  при сабмите формы начинаем рендерить с первой страницы
  imageApiService.page = 1;
  if (searchNameImg === '') {
    hiddenButton(refs.button);
    return;
  }

  const imgList = await imageApiService.getImg(searchNameImg);

  if (imgList.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  markupGallery.imagesArray = imgList;
  markupGallery.makeCardMarkup();
  markupGallery.renderMarkup();
  simpleLightbox.refresh();
  verifyEndLibraryToggleButton(refs.button);
  Notify.info(`Hooray! We found ${imageApiService.totalHits} images.`);
}

async function handleButton(event) {
  markupGallery.imagesArray = await imageApiService.getImg();
  markupGallery.makeCardMarkup();
  markupGallery.renderMarkup();
  simpleLightbox.refresh();
  verifyEndLibraryToggleButton(refs.button);
}

function verifyEndLibraryToggleButton(reference) {
  switch (imageApiService.endLibrary) {
    case 0:
      hiddenButton(reference);
      break;
    case 1:
      hiddenButton(reference);
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      break;
    case 2:
      showButton(reference);
      break;
  }
  return;
}

function hiddenButton(reference) {
  reference.disabled = true;
  reference.style.display = 'none';
}

function showButton(reference) {
  reference.disabled = false;
  reference.style.display = 'block';
}
