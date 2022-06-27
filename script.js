


const masterPlay = document.getElementById("masterPlay");
const myProgressBar = document.getElementById("myProgressBar");
const playGif = document.getElementById('playGif');
const listFinal = Array.from(document.getElementsByClassName('listFinal'));
const songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
const forwardSong = document.getElementById("forwardSong");
const backwardSong = document.getElementById("backwardSong");
const masterSongName = document.getElementById("masterSongName");
let songNo = 1;
let audioElement = new Audio('songs/1.mp3');


function changeMasterName()
{
    masterSongName.textContent = songs[songNo-1].songName;
}

let songs = [
    {songName : "Song1", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName : "Song2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName : "Song3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName : "Song4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName : "Song5", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName : "Song6", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName : "Song7", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName : "Song8", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"}

]

listFinal.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].textContent = songs[i].songName;
});


// audioElement.play();


masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime == 0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        playGif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        playGif.style.opacity = 0;
        makeAllPlays();
    }
    changeMasterName();

})

audioElement.addEventListener("timeupdate", ()=>{
    let songPercent = parseFloat((audioElement.currentTime/audioElement.duration)*10000);
    console.log(songPercent);
    myProgressBar.value = songPercent;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value / 10000) * audioElement.duration;
})



function makeAllPlays()
{
    songItemPlay.forEach((element) =>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

songItemPlay.forEach((element, i) => {
    element.addEventListener('click',(e)=>{
        // console.log(e.target);
        songNo = i;
        makeAllPlays();
        audioElement.src = `songs/${i}.mp3`;
           audioElement.currentTime = 0;
        if(audioElement.paused || audioElement.currentTime == 0)
        {
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioElement.play();
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            playGif.style.opacity = 1;
        }
        else
        {
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            audioElement.pause();
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            playGif.style.opacity = 0;
        }
        changeMasterName();
    })
    i = i + 1;
});

forwardSong.addEventListener('click', ()=>{
    if(songNo == 8) songNo = 1;
    else
    songNo = (songNo + 1);
    audioElement.src = `songs/${songNo}.mp3`;
    if(audioElement.paused || audioElement.currentTime == 0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        playGif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        playGif.style.opacity = 0;
        makeAllPlays();
    }
    changeMasterName();
})

backwardSong.addEventListener('click', ()=>{
    if(songNo == 1) songNo = 8;
    else
    songNo = (songNo - 1);
    audioElement.src = `songs/${songNo}.mp3`;
    if(audioElement.paused || audioElement.currentTime == 0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        playGif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        playGif.style.opacity = 0;
        makeAllPlays();
    }
    changeMasterName();
})