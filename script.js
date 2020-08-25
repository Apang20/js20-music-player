const audio = document.querySelector('audio');
const prevBtn = document.getElementById('btn--prev');
const playBtn = document.getElementById('btn--play');
const nextBtn = document.getElementById('btn--next');
const volumeBtn = document.getElementById('btn--volume');
const volumeControl = document.getElementById('volume-control');
const musicImage = document.querySelector('.music__image');
const musicTitle = document.querySelector('.music__title');
const musicArtist = document.querySelector('.music__artist');
const durationTotal = document.querySelector('.duration__total');
const durationNow = document.querySelector('.duration__now');
const progressContainer = document.querySelector('.progress-container');
const progressBar = document.querySelector('.progress');

//Playlist from youtube audio library
const playlist = [
  {
    name: 'Cha Cappella - Jimmy Fontanez_Media Right Productions',
    displayName: 'Cha Cappella',
    artist: 'Huma-Huma'
  },
  { name: 'Crimson Fly - Huma-Huma', displayName: 'Crimson Fly', artist: 'Huma-Huma' },
  { name: 'Easy Day - Kevin MacLeod', displayName: 'Easy Day', artist: 'Kevin MacLeod' },
  { name: 'Moonlight Haze - Bird Creek', displayName: 'Moonlight Haze', artist: 'Bird Creek' },
  {
    name: 'Para Santo Domingo - Jimmy Fontanez_Media Right Productions',
    displayName: 'Para Santo Domingo',
    artist: 'Jimmy Fontanez'
  }
];

//Check if Playing
let isPlaying = false;
let musicIndex = 0;

// Play
function playMusic() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  musicImage.classList.add('music__image--rotate');
  audio.play();
}

//Pause
function pauseMusic() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  musicImage.classList.remove('music__image--rotate');
  audio.pause();
}

// Previous Music
function playPrevMusic() {
  musicIndex = musicIndex === 0 ? 4 : musicIndex - 1;
  console.log(musicIndex);
  loadMusic(playlist[musicIndex]);
  playMusic();
}

// Next Music
function playNextMusic() {
  musicIndex = musicIndex === 4 ? 0 : musicIndex + 1;
  loadMusic(playlist[musicIndex]);
  playMusic();
}

function setVolume(value) {
  audio.volume = value;
}

//Update DOM
function loadMusic(music) {
  musicImage.src = `img/${music.displayName}.jpg`;
  musicTitle.textContent = music.displayName;
  musicArtist.textContent = music.artist;
  audio.src = `music/${music.name}.mp3`;
}
// get duration
function setDuration() {
  const musicDuration = audio.duration;
  const minute = Math.floor(musicDuration / 60);
  const second = ('0' + Math.floor(musicDuration % 60)).slice(-2);
  durationTotal.textContent = `${minute}:${second}`;
}
//update progress bar
function updateProgress() {
  const musicCurrentTime = audio.currentTime;
  const minute = Math.floor(musicCurrentTime / 60);
  const second = ('0' + Math.floor(musicCurrentTime % 60)).slice(-2);
  durationNow.textContent = `${minute}:${second}`;
  progressBar.style.width = `${Math.floor((audio.currentTime * 100) / audio.duration)}%`;
}

function setProgressBar(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const { duration } = audio;
  audio.currentTime = (clickX * duration) / width;
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseMusic() : playMusic();
});

prevBtn.addEventListener('click', () => {
  playPrevMusic();
});

nextBtn.addEventListener('click', () => {
  playNextMusic();
});

audio.onloadedmetadata = function () {
  setDuration();
};

audio.addEventListener('timeupdate', () => {
  updateProgress();
});

audio.addEventListener('ended', () => {
  playNextMusic();
});
progressContainer.addEventListener('click', setProgressBar);

loadMusic(playlist[musicIndex]);
