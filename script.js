const toggle = document.getElementById('toggle');
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const volume = document.getElementById('volume');
const volumeContainer = document.getElementById('volume-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['lucid-dreaming', 'rainy-mood', 'tokyo-walker-slowly'];

// Current song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `./music/${song}.mp3`;
    cover.src = `./images/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
 
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;

    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress({ target }) {
    const { duration } = target;
    const { currentTime } = target;
    
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = audio;

    audio.currentTime = clickX / width * duration;
}

function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    audio.volume = clickX / width;
    volume.style.width = `${clickX / width * 100}%`
}

// Dark mode 
function toggleDarkMode({ target }) {
    if(target.checked) {
        document.documentElement.setAttribute('theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// Get theme from local storage
const currentTheme = localStorage.getItem('theme');

if(currentTheme) {
    document.documentElement.setAttribute('theme', currentTheme);

    if(currentTheme === 'dark') {
        toggle.checked = true;
    }
}


// Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
toggle.addEventListener('click', toggleDarkMode);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
volumeContainer.addEventListener('click', setVolume);
audio.addEventListener('ended', nextSong);
audio.volume = .4;