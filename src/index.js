import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const SOURCE_SRV =
  'https://pixabay.com/api/?key=31033465-5993d082d5a9a4a2e6778e4ca';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  const searchNameImg = event.currentTarget.searchQuery.value.trim();
  event.preventDefault();
  let imgList = [];
  imgList = await getImg(searchNameImg);
  resetMarkup();
  if (imgList.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  renderMarkup(imgList);
}

async function getImg(searchNameImg) {
  try {
    const searchString = `${SOURCE_SRV}&q=${searchNameImg}&image_type=photo&orientation=horizontal&safesearch=true`;
    const response = await axios.get(searchString);
    return response.data.hits;
  } catch (error) {
    console.log(error);
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return [];
  }
}

function renderMarkup(imgList) {
  console.log(imgList);

  const markup = imgList
    .map(element => {
      return `<div class="photo-card">
          <img class="photo-img" src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
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
        </div>`;
    })
    .join('');

  refs.gallery.innerHTML = markup;
  return;
}
const resetMarkup = () => {
  refs.gallery.innerHTML = '';
};
