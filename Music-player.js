let album_artist = document.querySelector(".album-artist");
let title = document.querySelector(".title");
let artist = document.querySelector(".artist");

let play = document.querySelector(".play");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");

let seek_slider = document.querySelector(".seek_slider");
let current_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');
 
// Define the list of tracks that have to be played
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

function loadTrack(track_index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();
 
  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();
 
  // Update details of the track
  album_artist.style.backgroundImage = 
     "url(" + track_list[track_index].image + ")";
  title.textContent = track_list[track_index].name;
  artist.textContent = track_list[track_index].artist;
 
 
  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);
 
  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);

  play.addEventListener("click", playTrack);
  prev.addEventListener("click", prevTrack);
  next.addEventListener("click", nextTrack);
  

  let pause;
  pause.addEventListener("click", pauseTrack);


  function playTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
    }
    
    function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
    
    // Replace icon with the pause icon
    play.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
    }
    
    function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
    
    // Replace icon with the play icon
    play.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    }
    
    function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1)
      track_index += 1;
    else track_index = 0;
    
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
    }
    
    function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0)
      track_index -= 1;
    else track_index = track_list.length - 1;
    
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
    }}

    function seekTo() {
      // Calculate the seek position by the
      // percentage of the seek slider 
      // and get the relative duration to the track
      seekTo = curr_track.duration * (seek_slider.value / 100);
      
      // Set the current track position to the calculated seek position
      curr_track.current_time = seekTo;
      }
      
      
      function seekUpdate() {
      let seekPosition = 0;
      
      // Check if the current track duration is a legible number
      if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.current_time * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
      
        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.current_time / 60);
        let currentSeconds = Math.floor(curr_track.current_time - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
      
        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
      
        // Display the updated duration
        current_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
      }
      }
// Load the first track in the tracklist
loadTrack(track_index);

function resetValues() {
  current_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
 }
 
      