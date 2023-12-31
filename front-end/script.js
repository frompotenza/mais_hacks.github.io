const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Songs Titles
const songs = ["song 1", "song 2", "song 3"];

// KeepTrack of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `./music/${song}.mp3`;
  cover.src = `./images/${song}.jpg`;
}

// Play Song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fa").classList.remove("fa-play");
  playBtn.querySelector("i.fa").classList.add("fa-pause");
  audio.play();
}

// Pause Song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fa").classList.add("fa-play");
  playBtn.querySelector("i.fa").classList.remove("fa-pause");
  audio.pause();
}

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Update Progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPerCent = (currentTime / duration) * 100;
  progress.style.width = `${progressPerCent}%`;
}

// Set Progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change Song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
// Time/Song Update
audio.addEventListener("timeupdate", updateProgress);
// Click On progress Bar
progressContainer.addEventListener("click", setProgress);
// Song End
audio.addEventListener("ended", nextSong);

// Get references to the HTML elements
const inputForm = document.getElementById("inputForm");
const textInput = document.getElementById("textInput");
const output = document.getElementById("output");

// Add a submit event listener to the form
inputForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const userInput = textInput.value; // Get the user's input

    // Display the user's input in the output div
    output.innerHTML = `You entered: ${userInput}`;
    
    textInput.value = "";

    const url = new URL('http://localhost:5000/playmidi');
    url.searchParams.append("primer", userInput);
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

});

// Add an event listener to the button
document.getElementById("play-2").addEventListener("click", function(e) {
  // Send a GET request when the button is clicked
  fetch('http://localhost:3000/pause') // Replace with your API endpoint
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json(); // Parse the response as JSON
      })
      .then(data => {
          // Handle the JSON data in the 'data' variable
          const responseContainer = document.getElementById("responseContainer");
          responseContainer.textContent = JSON.stringify(data, null, 2);
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
});


