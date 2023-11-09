
import Notiflix from 'notiflix';
import { InstanseAPI } from './instanse';

refs = {
  form: document.querySelector('#search-form'),
  buttonLoadMore: document.querySelector('.load-more'),
  renderList: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
  inputForm: document.querySelector('input'),
};



refs.form.addEventListener('submit', onSearchFunction);



const instanseAPI = new InstanseAPI();
   
function onSearchFunction(e) {
    e.preventDefault();

    if(refs.inputForm.value === '') {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return  
    }

    instanseAPI.q = refs.inputForm.value;
    instanseAPI.page = 1;

    instanseAPI.searchInfo().then(data => {
        if(data.hits.length === 0) {
            throw newError(data.status)
        }
        refs.renderList.innerHTML = '';
        console.log(data);
        const markup = renderTemplates(data.hits);
        refs.renderList.insertAdjacentHTML('beforeend', markup.join(''));
        refs.btnLoadMore.classList.add('visible')
        refs.btnLoadMore.classList.remove('load-more')
        instanseAPI.totalPage = Math.ceil(data.totalHits / 40)
        updateBtnStatus();

    }).catch (() => {refs.renderList.innerHTML = '';
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    refs.btnLoadMore.classList.remove('visible')
    refs.btnLoadMore.classList.add('load-more')})
    };

  

    refs.buttonLoadMore.addEventListener('click', onButtonLoad);

function onButtonLoad() {

    instanseAPI.page++;

    instanseAPI.searchInfo().then(data => {
        
        const markup = renderTemplates(data.hits);
        refs.renderList.insertAdjacentHTML('beforeend', markup.join('')); 
        updateBtnStatus();
    });
    
}




function updateBtnStatus() {
    if(instanseAPI.page >= instanseAPI.totalPage) {
        refs.btnLoadMore.classList.remove('visible');
        refs.btnLoadMore.classList.add('load-more');
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    } 
    
}


 function renderTemplate({tags, webformatURL, largeImageURL, likes, views, comments, downloads}) {
        
  
    
      return `<div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" data-source ="${largeImageURL}" width="400px" height="200px"/>
            <div class="info">
              <p class="info-item">
                <b>Likes <span class ="descr">${likes}</span></b>
              </p>
              <p class="info-item">
                <b>Views <span class ="descr">${views}</span></b>
              </p>
              <p class="info-item">
                <b>Comments <span class ="descr">${comments}</span></b>
              </p>
              <p class="info-item">
                <b>Downloads <span class ="descr">${downloads}</span></b>
              </p>
            </div>
          </div>`;
    };



function renderTemplates(hits) {
    const markup = hits.map(renderTemplate);
    return  markup;
   
}
