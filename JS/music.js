function getLyris(track, artist) {
    let lyris = "There is no Lyrics for your song SORRY !!"
    let proxy = "https://cors-anywhere.herokuapp.com/";
    let URL = proxy + "http://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=" + track + "&q_artist=" + artist + "&apikey=196d939a59d2ceeca706a4db8007227e";
    fetch(URL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            lyris = data.message.body.lyrics.lyrics_body;
            displayLyrics(lyris);
        })
        .catch((error) => {
            console.error('Error:', error);
            displayLyrics(lyris);
        });

}// get the Lyrics for the song

document.getElementById("callApi").addEventListener("click", function () {
    clickSearch();
});// listener for click button

document.querySelector('#artistName').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        clickSearch();
    }
});// listener for Enter keypress for artist input

document.querySelector('#musicName').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        clickSearch();
    }
});// listener for Enter keypress for artist input

function clickSearch() {
    let track = document.getElementById("musicName").value;
    let artist = document.getElementById("artistName").value;
    if(track == "" || artist== ""){
       alert("There is an empty input ") ;
    }else {
        printData(track, artist);
    }

}// get the data from the user

function printData(track, artist) {
    document.getElementById("songTitle").innerHTML = track + " - " + artist;
    getLyris(track, artist);
    songSource(track, artist);
} // display the input to the screen

function addSong(thisSong) {
    // remove audioDiv
    let element = document.getElementById("audioDiv");
    element.parentNode.removeChild(element);

    // create div with child
    let audioDiv = document.createElement("div");
    audioDiv.setAttribute("class", "container-audio");
    audioDiv.setAttribute("id", "audioDiv");

    let audio = document.createElement("audio");
    audio.setAttribute("controls", "controls");

    let sourse = document.createElement("source");
    sourse.setAttribute("src", thisSong);
    sourse.setAttribute("type", "audio/ogg");
    sourse.setAttribute("id", "songSource2");

    let createAudioDiv = document.getElementById("createAudioDiv");

    createAudioDiv.appendChild(audioDiv);
    audioDiv.appendChild(audio);
    audio.appendChild(sourse);
}// remove the old song then add the new one

function displayLyrics(songlyrics) {
    console.log(songlyrics);
    // remove old one
    let lyrics = document.getElementById("addText");
    lyrics.parentNode.removeChild(lyrics);

    // crete new one
    let newLyrics = document.createElement("h5");
    newLyrics.setAttribute("id", "addText");

    let i = 0;
    typeWriter();

    function typeWriter() {
        if (i < songlyrics.length) {
            newLyrics.innerHTML += songlyrics.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    let addarea = document.getElementById("areaDiv");
    addarea.appendChild(newLyrics);
}// add new Lyrics

function songSource(track, artist) {

    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${track}%20${artist}`, {
        method: "GET",
        headers: {
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
            'x-rapidapi-key': 'd05b3502dbmsh3cbb8430072d467p15111djsna9e7930c9e2c'
        }
    }).then((response) => response.json())
        .then(function (elements) {
                let info = elements.data[0];
                console.log(elements.data[0]);
                let thisSong = info.preview;
                addSong(thisSong);
            }
        )
} // to get the song from the api


