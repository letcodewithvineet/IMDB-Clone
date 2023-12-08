const searchInput = document.getElementById('search-input');
const searchResultsList = document.getElementById('search-results');
const favouritesList = document.getElementById('favourites-list');

searchInput.addEventListener('input', (event) => {
    fetchMovies(event.target.value);
});

function fetchMovies(query) {
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=6ebaa4c6`)
        .then((response) => response.json())
        .then((data) => {
            searchResultsList.innerHTML = '';
            data.Search.forEach((movie) => {
                const listItem = document.createElement('li');
                listItem.textContent = movie.Title;
                listItem.id = movie.imdbID;

                const favouriteButton = document.createElement('button');
                favouriteButton.classList.add('favourite-button');
                favouriteButton.textContent = 'Favourite';
                favouriteButton.addEventListener('click', () => addToFavourites(movie));

                listItem.appendChild(favouriteButton);
                searchResultsList.appendChild(listItem);
            });
        });
}

function addToFavourites(movie) {
    const favouriteItem = document.createElement('li');
    favouriteItem.textContent = movie.Title;
    favouriteItem.id = movie.imdbID;

    const removeFavouriteButton = document.createElement('button');
    removeFavouriteButton.classList.add('remove-favourite-button');
    removeFavouriteButton.textContent = 'Remove';
    removeFavouriteButton.addEventListener('click', () => removeFromFavourites(movie.imdbID));

    favouriteItem.appendChild(removeFavouriteButton);
    favouritesList.appendChild(favouriteItem);

    searchResultsList.querySelector(`#${movie.imdbID}`).remove();
}

function removeFromFavourites(imdbID) {
    const movie = document.getElementById(imdbID);
    movie.remove();
}

window.onload = function() {
    // Get all the links in the navigation bar
    var links = document.getElementsByClassName("navbar")[0].getElementsByTagName("a");
     
    // Loop through all the links and select the active link based on the current URL
    for (var i = 0; i < links.length; i++) {
       if (window.location.href.endsWith(links[i].href)) {
         links[i].className += " active";
       }
    }
   };