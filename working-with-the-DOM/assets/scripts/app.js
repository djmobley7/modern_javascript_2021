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
    toggleAddMovieModel();
});

const backdropClickHandler = () => {
    toggleAddMovieModel(); // TODO
}
backdrop.addEventListener('click', backdropClickHandler);
