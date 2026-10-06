//API="http://www.omdbapi.com/?apikey=[yourkey]&"
API = "http://www.omdbapi.com/?apikey=eb581004&t=avenger";

const movieForm = document.querySelector("#movie-form");
const searchInput = document.querySelector("#search-input");
const movieHouse = document.querySelector("#movie-house");

movieForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchText = searchInput.value.trim();
  if (!searchText) return;
  console.log(searchText);
  searchMovie(searchText);
});

async function searchMovie(searchText) {
    movieHouse.innerHTML="<p>Wait data is loading...</p>"
  
  let response = await fetch(
    `http://www.omdbapi.com/?apikey=eb581004&s=${encodeURIComponent(searchText)}`,
  );
  let data = await response.json();
  if (data.Response === "True") {
    displayMovies(data);
    //console.log(data)
  } else {
    movieHouse.innerHTML=`<p>${data.Error}</p>`
  }
  
}

function displayMovies(data) {
    movieHouse.innerHTML=""
  let reqDataArray = data.Search
  reqDataArray.forEach((ele) => {
    const div = document.createElement("div");
    div.dataset.id = ele.imdbID;
    div.classList="movie-card"
div.innerHTML = `
        <div>
          <img src=${ele.Poster} alt="">
        </div>
        <div>
          <p>${ele.Title}</p>
          <p>${ele.Year}</p>
        </div>
`;
movieHouse.append(div);
    
  });
}


movieHouse.addEventListener("click", (e) => {
  e.stopPropagation()
  //console.log(e.target.closest(".movie-card"))
  const movieCard = e.target.closest(".movie-card")
  const imdbID = movieCard.dataset.id
  //console.log(imdbID)
  location.href = `movie-details.html?id=${imdbID}`;
})