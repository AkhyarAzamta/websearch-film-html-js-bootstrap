// Menggunakan jquery
// $('.search-button').on('click', function() {
//     $.ajax({
//         url: 'http://www.omdbapi.com/?apikey=197bfcd4&s=' + $('.input-keyword').val(),
//         success: results => {
//             const movies = results.Search;
//             let cards = '';
//             movies.forEach(m => {
//                 cards += showCards(m);
//             });
//             $('.movie-container').html(cards);
//             // ketika tombol di click 
//             $('.modal-button').on('click', function () {
//                 // console.log($(this).data('imdbid'));
//                 $.ajax({
//                     url: 'http://www.omdbapi.com/?apikey=197bfcd4&i=' + $(this).data('imdbid'),
//                     success: m => {
//                         const movieDetail = showDetail(m);
//                   $('.modal-body').html(movieDetail);
//                     },
//                     error: (e) => {
//                         console.log(e.responseText);
//                     }
//                 });
//             });
//         },
//         error: e => {
//             console.log(e.responseText);
//         }
//     });
// });
// end jquery

// Menggunakan fect (js vanila)
// const searchButton = document.querySelector('.search-button');

// searchButton.addEventListener('click', function() {
    
//     const inputKeyword = document.querySelector('.input-keyword');
//     fetch('http://www.omdbapi.com/?apikey=197bfcd4&s=' + inputKeyword.value)
//     .then(response => response.json())
//     .then(response => {
//         const movies = response.Search;
//         let cards = '';
//         movies.forEach(m => cards += showCards(m));
//         const movieContainer = document.querySelector('.movie-container');
//         movieContainer.innerHTML = cards;

//         // ketika tombol show detail diclick
//         const modalButton = document.querySelectorAll('.modal-button');
//         modalButton.forEach(btn => {
//             btn.addEventListener('click', function (){
//                 const imdbid = this.dataset.imdbid;
//                 fetch('http://www.omdbapi.com/?apikey=197bfcd4&i=' + imdbid)
//                     .then(response => response.json())
//                     .then(m => {
//                         const movieDetail = showDetail(m);
//                         const modalBody = document.querySelector('.modal-body');
//                         modalBody.innerHTML = movieDetail;
//                     });
//             });
//         });
//     });
// });
// end fetch

// merapikan fetch lebih simple
// ketika tombol Search di click 
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function (){
    const inputKeyword = document.querySelector('.input-keyword');
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
});

// ketika tombol detail diclick 
document.addEventListener('click', async function(e){
    if (e.target.classList.contains('modal-button')){
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMoviesDetail(imdbid);
        updateUIDetail(movieDetail);
    }
});

function getMoviesDetail(imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=197bfcd4&i=' + imdbid)
    .then(response => response.json())
    .then(m => m);
}
function updateUIDetail(m) {
    const movieDetail = showDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}

function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=197bfcd4&s=' + keyword)
        .then(response => response.json())
        .then(response => response.Search);
}

function updateUI(movies) {
    let cards = '';
    movies.forEach(m => cards += showCards(m));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
}


function showCards(m) {
    return `<div class="col-md-4 my-4">
    <div class="card" style="width: 18rem;">
        <img src="${m.Poster}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"><strong>${m.Title}</strong></h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <a href="#" class="btn btn-primary modal-button" data-imdbid="${m.imdbID}" data-bs-toggle="modal" data-bs-target="#movieDetail">Show Detail</a>
        </div>
      </div>
</div>`;
}

function showDetail(m) {
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item"><h4><strong>${m.Title} (${m.Year})</strong></h4></li>
                <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
              </ul>
        </div>
    </div>
</div>`;
}