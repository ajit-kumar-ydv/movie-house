const params = new URLSearchParams(location.search)
const imbdID = params.get("id").trim();
//console.log(imbdID)

const detailsBox=document.querySelector("#details-box")

if (imbdID) {
  searchMovie(imbdID.trim())
}

async function searchMovie(imbdID) {
  let response = await fetch(`http://www.omdbapi.com/?apikey=eb581004&i=${imbdID}&plot=full`)
  let data = await response.json()
  console.log(data)
   if (data.Response === "True") {
     showMovieDetails(data)
   } else {
     console.log(data.Error);
   }
}
//searchMovie()

function showMovieDetails(data) {

  const theCard = document.createElement("div");
  theCard.classList = "the-movieCard"
  
  theCard.innerHTML = `
      
  <div class="one">
    <img src=${data.Poster} alt="">
  </div>
  <div class="two">
    <h2>${data.Title}</h2>
    <div>
      <p>${data.Year}</p>
      <p>${data.Rated}</p>
      <p>${data.Runtime}</p>
      <p>${data.Type}</p>
      <p>${data.imdbRating}</p>
    </div>
    <div>
      <h3>PLOT OVERVIEW</h3>
      <p>${data.Plot}</p>
    </div>
    <div>
      <div class="director">
        <h3>DIRECTOR</h3>
        <p>${data.Director}</p>
      </div>
      <div class="writer">
        <h3>WRITER</h3>
        <p>${data.Writer}</p>
      </div>
    </div>
    <div class="actor">
      <h3>ACTOR</h3>
      <P>${data.Actors}</P>
    </div>
    <div>
      <div class="language">
        <h3>LANGUAGE</h3>
        <p>${data.Language}</p>
      </div>
      <div class="country">
        <h3>COUNTRY</h3>
        <p>${data.Country}</p>
      </div>
    </div>
    <button>
    <a href="https://www.imdb.com/title/${imbdID}" target="_blank">View on IMDb -></a>
    </button>
  </div>
  `
  
  detailsBox.append(theCard);
}