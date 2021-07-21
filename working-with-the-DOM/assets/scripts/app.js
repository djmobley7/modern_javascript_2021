const backdrop = document.getElementById('backdrop');
const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
}

const addMovieModal = document.getElementById('add-modal');
const toggleAddMovieModel = () => {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
}
const startAddMovieButton = document.querySelector('header button');
startAddMovieButton.addEventListener('click', toggleAddMovieModel);

const cancelAddMovieButton = addMovieModal.querySelector('.modal__actions .btn--passive');
cancelAddMovieButton.addEventListener('click', () => {
    clearMovieInputs();
    toggleAddMovieModel();
});

const movies = [];

const movieInputs = addMovieModal.querySelectorAll('input');

const clearMovieInputs = () => {
    for(const movieInput of movieInputs) {
        movieInput.value = '';
    }
}

const updateUI = () => {
    const text = document.querySelector('main section');
    if (movieInputs.length > 0) {
        text.replaceWith(document.createElement('p'));
    }
}

// using DOM traversal to get next button - this seems really fragile to me...
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const confirmAddMovieButtonHandler = () => {
    const title = movieInputs[0].value.trim();
    const imageUrl = movieInputs[1].value.trim();
    let rating = movieInputs[2].value.trim();

    if (title === '' || imageUrl === '') {
        alert('No empty values allowed');
        return;
    }

    rating = parseInt(rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
        alert('Invalid rating');
        return;
    }

    movies.push({title, imageUrl, rating});
    console.log(movies);

    updateUI();
    clearMovieInputs();
    toggleAddMovieModel();
}
confirmAddMovieButton.addEventListener('click', confirmAddMovieButtonHandler);

const backdropClickHandler = () => {
    toggleAddMovieModel(); // TODO
}
backdrop.addEventListener('click', backdropClickHandler);
