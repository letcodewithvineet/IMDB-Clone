const searchInput = document.getElementById('search-input');
const searchResultsList = document.getElementById('search-results');
const favouritesList = document.getElementById('favourites-list');

const OMDB_API_KEY = '6ebaa4c6';
const OMDB_API_URL = 'https://www.omdbapi.com/';

searchInput.addEventListener('input', handleSearchInput);

function handleSearchInput(event) {
    const query = event.target.value;
    fetchMovies(query, OMDB_API_URL, OMDB_API_KEY);
}

function fetchMovies(query, apiUrl, apiKey) {
    fetch(`${apiUrl}?s=${query}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => displaySearchResults(data.Search));
}

function displaySearchResults(movies) {
    searchResultsList.innerHTML = '';
    movies.forEach(movie => {
        const listItem = createMovieListItem(movie, addToFavourites);
        searchResultsList.appendChild(listItem);
    });
}

function createMovieListItem(movie, onClickHandler) {
    const listItem = document.createElement('li');
    listItem.textContent = movie.Title;
    listItem.id = movie.imdbID;

    const button = document.createElement('button');
    button.classList.add('favourite-button');
    button.textContent = 'Favourite';
    button.addEventListener('click', () => onClickHandler(movie));

    listItem.appendChild(button);
    return listItem;
}

function addToFavourites(movie) {
    const favouriteItem = createMovieListItem(movie, removeFromFavourites);
    const removeButton = favouriteItem.querySelector('.favourite-button');
    removeButton.classList.remove('favourite-button');
    removeButton.classList.add('remove-favourite-button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeFromFavourites(movie.imdbID));

    favouritesList.appendChild(favouriteItem);
    const searchResultItem = searchResultsList.querySelector(`#${movie.imdbID}`);
    if (searchResultItem) {
        searchResultItem.remove();
    }
}

function removeFromFavourites(imdbID) {
    const movie = document.getElementById(imdbID);
    movie.remove();
}

window.onload = function () {
    highlightActiveNavLink();
};

function highlightActiveNavLink() {
    const links = document.getElementsByClassName("navbar")[0].getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
        if (window.location.href.endsWith(links[i].href)) {
            links[i].classList.add("active");
        }
    }
}
