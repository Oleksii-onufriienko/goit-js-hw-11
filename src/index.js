const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('gallery'),
};

console.log(refs);

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  const searchNameImg = event.currentTarget.searchQuery.value.trim();
  event.preventDefault();
  console.log(searchNameImg);
}
