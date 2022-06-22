export default function infoContainer(data) {
    const markup = data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, dowloads }) => {
        return `<div class="photo-card">
        <a href="${largeImageURL}">
  <img class="start-img" src="${webformatURL}" alt="${tags}" loading="lazy" width=640 />
  <div class="info">
    <p class="info-item">
      <b>Likes <span class="result">${likes}</span></b> 
    </p>
    <p class="info-item">
      <b>Views <span class="result">${views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments <span class="result">${comments}</span></b> 
    </p>
    <p class="info-item">
      <b>Downloads <span class="result">${dowloads}</span></b> 
    </p>
  </div>
</div>`
    }).join("");
  return markup;  
};



