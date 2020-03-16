//https://developers.themoviedb.org/3/discover/movie-discover what genres do you like and dislike, minimum votes etc

//declaring the empty ararys for the picks
let movieArray = ["pick one"];
let idArray = ["none"];
//Create a selectlist for movies
let movieParent = document.getElementById("movieSelectDiv");
let movieSelectList = document.createElement("select");
movieSelectList.id = "myMovieSelect";
movieParent.appendChild(movieSelectList);
let movieSelectedId = document.getElementById("myMovieSelect");
let anotherMovieButton = document.getElementById("otherMovie");

//Create selectlist for series
let tvParent = document.getElementById("tvSelectDiv");
let tvSelectList = document.createElement("select");
tvSelectList.id = "myTvSelect";
let tvGenrePick;
tvParent.appendChild(tvSelectList);
let tvSelectedId = document.getElementById("myTvSelect");
let anotherTvButton = document.getElementById("otherTv");




getGenres('https://api.themoviedb.org/3/genre/movie/list?api_key=022f0544ffb4d654b9f2edc2cb196360&language=en-US&include_adult=false', movieSelectList );
getGenres('https://api.themoviedb.org/3/genre/tv/list?api_key=022f0544ffb4d654b9f2edc2cb196360&language=en-US&include_adult=false', tvSelectList);
tenMostPopular('https://api.themoviedb.org/3/discover/movie?api_key=022f0544ffb4d654b9f2edc2cb196360&language=en-US&sort_by=popularity.desc&include_adult=false', 'mostPopular');
tenMostPopular('https://api.themoviedb.org/3/discover/tv?api_key=022f0544ffb4d654b9f2edc2cb196360&language=en-US&sort_by=popularity.desc&include_adult=false', 'mostPopularTv');



movieSelectedId.addEventListener('change', function () {
    let movieGenrePick = "&with_genres=" + movieSelectedId.value;
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=022f0544ffb4d654b9f2edc2cb196360&language=en-US&sort_by=popularity.desc&include_video=false' + movieGenrePick + '')
        .then(link => link.json())
        .then(data => {

            let selectedGenreArray = [];


            for (let i = 0; i < data.results.length; i++) {
                selectedGenreArray.push(data.results[i]);
            }



            //getting random movies per topic
            var randomMovie = (selectedGenreArray[Math.floor(Math.random() * selectedGenreArray.length)]);
            document.getElementById("poster").src = "http://image.tmdb.org/t/p/w185/" + randomMovie.poster_path + "";
            document.getElementById("poster").alt = "poster";
            document.getElementById("toWatch").innerHTML = "you should watch " + randomMovie.title;

            anotherMovieButton.addEventListener("click", function () {
                randomMovie = (selectedGenreArray[Math.floor(Math.random() * selectedGenreArray.length)]);
                document.getElementById("poster").src = "http://image.tmdb.org/t/p/w185/" + randomMovie.poster_path + "";
                document.getElementById("poster").alt = "poster";
                document.getElementById("toWatch").innerHTML = "you should watch " + randomMovie.title;
            })

        });

});


tvSelectedId.addEventListener('change', function () {
    tvGenrePick = "&with_genres=" + tvSelectedId.value;

    fetch('https://api.themoviedb.org/3/discover/tv?api_key=022f0544ffb4d654b9f2edc2cb196360&language=en-US&sort_by=popularity.desc&include_adult=false' + tvGenrePick + '')
        .then(link => link.json())
        .then(data => {

            let selectedGenreArray = [];


            for (let i = 0; i < data.results.length; i++) {
                selectedGenreArray.push(data.results[i]);
            }


            var randomTv = (selectedGenreArray[Math.floor(Math.random() * selectedGenreArray.length)]);
            document.getElementById("tvPoster").src = "http://image.tmdb.org/t/p/w185/" + randomTv.poster_path + "";
            document.getElementById("tvPoster").alt = "poster";
            document.getElementById("toWatchTv").innerHTML = "you should watch " + randomTv.name;

            anotherTvButton.addEventListener("click", function () {
                randomTv = (selectedGenreArray[Math.floor(Math.random() * selectedGenreArray.length)]);
                document.getElementById("tvPoster").src = "http://image.tmdb.org/t/p/w185/" + randomTv.poster_path + "";
                document.getElementById("tvPoster").alt = "poster";
                document.getElementById("toWatchTv").innerHTML = "you should watch " + randomTv.name;
            })

        });

});


//function to get list of genres and IDS
async function getGenres(link, selectname) {
    let response = await fetch(link);
    let genreData = await response.json();

    for (let i = 0; i < genreData.genres.length; i++) {
        movieArray.push(genreData.genres[i].name);
        idArray.push(genreData.genres[i].id);
    }

    for (let i = 0; i < movieArray.length; i++) {
        let option = document.createElement("option");
        option.value = idArray[i];
        option.text = movieArray[i];
        selectname.appendChild(option);
    }


    //resetting the arrays, otherwise the 2nd time the function gets called the array is not empty
    movieArray = ["pick one"];
    idArray = [0];

}


//function to display most popular movies
function tenMostPopular(link, id) {
    fetch(link)
        .then(link => link.json())
        .then(data => {
            let imgDiv = document.getElementById(id);
            imgDiv.setAttribute("class","imagePopular");
            let popularArray = [];
            for (let i = 0; i < 10; i++) {
                popularArray.push(data.results[i].poster_path);
            }
            for (let i = 0, j = popularArray.length; i < j; i++) {
                let img = document.createElement('img');
                img.setAttribute("class", "imageList");
                img.src = "http://image.tmdb.org/t/p/w185/" + popularArray[i]; // img[i] refers to the current URL.
                imgDiv.appendChild(img);

            }
        });
}