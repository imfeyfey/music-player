let album_art = document.querySelector(".album_art");
let title = document.querySelector(".title");
let artist = document.querySelector(".artist");

let playPause = document.querySelector(".playPause");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");

let seek_slider = document.querySelector(".seek_slider");
let current_time = document.querySelector(".current_time");
let total_duration = document.querySelector(".total_duration");


let track_index = 0;
let isPlaying = false;
let updateTimer;


let current_track = document.createElement('audio');
 

let track_list = [
  {
    name: "All to well",
    artist: "Taylor Swift",
    image: "https://images.genius.com/aac8ea3f13ae887a7f1fd9cdd451374e.1000x1000x1.png",
    path: "./music/All_to_well.mp3",
  },
  {
    name: "Lost Stars",
    artist: "Adam Levine",
    image: "https://i1.sndcdn.com/artworks-000107518422-s73zzi-t500x500.jpg",
    path: "./music/Lost_Stars.mp3",
  },
  {
    name: "Demons",
    artist: "Boyce Avenue",
    image: "https://i1.sndcdn.com/artworks-000067847454-ifakyz-t500x500.jpg",
    path: "./music/Demons.mp3",
  },
  {
    name: "Only One",
    artist: "Yellowcard",
    image: "https://lastfm.freetls.fastly.net/i/u/300x300/032f0381ef8645e18b857eb3982c32ce.jpg",
    path: "./music/Only_One.mp3",
  },
  {
    name: "Shy",
    artist: "Jai Waetford",
    image: "https://images.genius.com/9661a8929f37422ca773af0b0a091c80.1000x1000x1.jpg",
    path: "./music/Shy.mp3",
  },
  {
    name: "The Beginning",
    artist: "One Ok Rock",
    image: "https://i1.sndcdn.com/artworks-000088844956-xt5t5o-t500x500.jpg",
    path: "./music/The_Beginning.mp3",
  },
];

loadTrack(track_index);

function loadTrack(track_index) {
  
  clearInterval(updateTimer);
  resetValues();
  current_track.src = track_list[track_index].path;
  current_track.load();

  album_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  title.textContent = track_list[track_index].name;
  artist.textContent = track_list[track_index].artist;
 
  updateTimer = setInterval(seekUpdate, 1000);
  current_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  current_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
 }  

  function playPauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
  }

    function playTrack() {
    current_track.play();
    isPlaying = true;
    playPause.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
    }
    
    function pauseTrack() {
    current_track.pause();
    isPlaying = false;
    playPause.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    }
  

    function nextTrack() {
      if (track_index < track_list.length -1)
      track_index += 1;
      else track_index = 0;
    
    loadTrack(track_index);
    playTrack();
    }
    
    function prevTrack() {
      if (track_index > 0)
      track_index -= 1;
      else track_index = track_list.length -1;
    
    loadTrack(track_index);
    playTrack();
    }
  
    function seekTo() {
      let seekto = current_track.duration * (seek_slider.value / 100);
      current_track.current_time = seekto;
      }
      
      function seekUpdate() {
      let seekPosition = 0;

      if (!isNaN(current_track.duration)) {
        seekPosition = current_track.current_time * (100 / current_track.duration);
        seek_slider.value = seekPosition;
        let currentMinutes = Math.floor(current_track.current_time / 60);
        let currentSeconds = Math.floor(current_track.current_time - currentMinutes * 60);
        let durationMinutes = Math.floor(current_track.duration / 60);
        let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60);
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        current_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
        }
       };
