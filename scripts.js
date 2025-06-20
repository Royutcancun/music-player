const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/01_Tripping_Billies.mp3',
        displayName: 'Tripping Billies',
        cover: 'assets/woodstock99.jpg',
        artist: 'Dave Mathews Band'
    },
    {
        path: 'assets/02_Bombos_Y_Tarolas.mp3',
        displayName: 'Bombos y Tarolas',
        cover: 'assets/Cartel_De_Santa _Me_Atizo_Macizo.jpg',
        artist: 'Cartel de Santa'
    },
    {
        path: 'assets/05_Self_Care.mp3',
        displayName: 'Self Care',
        cover: 'assets/swimming_macMiller.jpg',
        artist: 'Mac Miller'
    },
    {
        path: 'assets/05_You.mp3',
        displayName: 'You',
        cover: 'assets/ll&vr_you.jpg',
        artist: 'Larry Lovestein & The Velvet Revival'
    },
    {
        path: 'assets/13_Esto_es_lo_que_ hay.mp3',
        displayName: 'Esto es lo que hay',
        cover: 'assets/En_una_noche_tan_linda_como_esta.jpg',
        artist: 'Los Amigos Invisibles'
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // changing play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
function pauseMusic() {
    isPlaying = false;
    // changing pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}
function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}
function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}
function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}
function setProgressBar (e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);