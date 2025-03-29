let api_key = "7a8244477620cd934e28fd83abfd5301";
let urlBase = "https://api.themoviedb.org/3/search/movie";

document.getElementById("searchButton").addEventListener("click", fetchMovies);
let resultContainer = document.getElementById("results");
let resultNotFound = document.createElement("p");
resultNotFound.textContent = "No se ha podido encontrar tu busqueda.";
resultNotFound.classList.add("center");
let loading = document.createElement("p");
loading.classList.add("center");
loading.textContent = "...Cargando";

function fetchMovies() {
  resultContainer.appendChild(loading);
  let searchInput = document.getElementById("searchInput").value;
  fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
    .then((response) => response.json())
    .then((response) => displayMovies(response.results));
}

function displayMovies(response) {
  resultContainer.innerHTML = "";

  if (response.length === 0) {
    resultContainer.appendChild(resultNotFound);
    return;
  }

  response.forEach((movie) => {
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    let poster = document.createElement("img");
    let poster_path = "https://image.tmdb.org/t/p/w500";
    poster.src = `${poster_path}/${movie.poster_path}`;

    let movieTitle = document.createElement("h1");
    movieTitle.textContent = `${movie.title}`;

    let releaseDate = document.createElement("p");
    releaseDate.textContent = `La fecha de lanzamiento fue: ${movie.release_date}`;

    let overview = document.createElement("p");
    overview.textContent = `${movie.overview}`;

    movieDiv.appendChild(poster);
    movieDiv.appendChild(movieTitle);
    movieDiv.appendChild(releaseDate);
    movieDiv.appendChild(overview);

    resultContainer.appendChild(movieDiv);
  });
}
