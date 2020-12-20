window.onload = () => {
    const song_img = document.getElementById("song-img");
    const song_title = document.getElementById("song-title");
    const song_artist = document.getElementById("song-artist");

    const play_btn = document.getElementById("play-btn");
    const play_icon = document.getElementById("play-icon");
    const prev_btn = document.getElementById("prev-btn");
    const next_btn = document.getElementById("next-btn");
    const song_next_up = document.getElementById("song-next-up");

    const music_player = document.getElementById("music-player");

    let current_song_index;
    let next_song_index;

    let songs = [
        {
            title: "Di Ve Nha",
            artist: "Den Vau & Justatee",
            song_path: "music/divenha.mp3",
            img_path: "images/song-1.jpg"
        },
        {
            title: "Tet Ve Som Nhe",
            artist: "Phan Manh Quynh",
            song_path: "music/tetvesomnhe.mp3",
            img_path: "images/song-2.jpg"
        },
        {
            title: "Di De Tro Ve 2",
            artist: "SooBin Hoang Son",
            song_path: "music/didetrove2.mp3",
            img_path: "images/song-3.jpg"
        },
        {
            title: "Di De Tro Ve ",
            artist: "SooBin Hoang Son",
            song_path: "music/didetrove.mp3",
            img_path: "images/song-4.jpg"
        } 
    ]
    
    play_btn.addEventListener("click", TogglePlaySong)
    next_btn.addEventListener("click", () =>  ChangeSong())
    prev_btn.addEventListener("click", () =>  ChangeSong(false))

    InitPlayer();

    function InitPlayer() {
        current_song_index = 0;
        next_song_index = current_song_index + 1 ;
        UpdatePlayer();
    }

    function UpdatePlayer() {
        // console.log(current_song_index);
        let song = songs[current_song_index];

        // console.log("background-image: url('"+"./" + song.img_path + "');");
        // song_img.style = "background-image: url('"+"./" + song.img_path + "');";
        song_img.style = `background-image: url('./${song.img_path}');`;
        song_title.innerText = song.title;
        song_artist.innerText = song.artist;

        song_next_up.innerText = songs[next_song_index].title + " by " + songs[next_song_index].artist;
        music_player.src = song.song_path;
    }

    function TogglePlaySong() {
        if (music_player.paused) {
            music_player.play();
            play_icon.classList.remove("fa-play");
            play_icon.classList.add("fa-pause");
        } else {
            music_player.pause();
            play_icon.classList.add("fa-play");
            play_icon.classList.remove("fa-pause");
        }
    }

    function ChangeSong(next = true) {
        if (next) {
            current_song_index++;
            next_song_index = current_song_index + 1;
            if (current_song_index > songs.length - 1) {
                current_song_index = 0;
                next_song_index = current_song_index + 1 ;
            }
            // console.log(current_song_index);
            // console.log(next_song_index);
            if (next_song_index > songs.length - 1 ) {
                next_song_index = 0;
            }
        } else {
            current_song_index--;
            next_song_index = current_song_index + 1;
            if (current_song_index < 0 ) {
                current_song_index = songs.length - 1;
                next_song_index = 0;
            }
            // console.log(next_song_index);
            // console.log(current_song_index);
        }
        UpdatePlayer();
        TogglePlaySong();
    }

    // canvas
     //get the cancvas and context and store in vars
  var canvas = document.getElementById("sky");
  var ctx = canvas.getContext("2d");

  //set canvas dims to window height and width
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W - 0.1;
  canvas.height = H - 0.1;

  //generate the snowflakes and apply attributes
  var mf = 100; //max flakes
  var flakes = [];

  //loop throught the empty flakes and apply attributes
  for(var i = 0; i < mf; i++)
  {
    flakes.push({
      x: Math.random()*W,
      y: Math.random()*H,
      r: Math.random()*5+2, //min of 2px and max of 7px
      d: Math.random() + 1 //density of the flake

    })
  }

  //draw flakes onto canvas
  function drawFlakes()
  {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for(var i = 0; i < mf; i++){
      var f = flakes[i];
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
    }
    ctx.fill();
    moveFlakes();
  }

  //animate the flakes
  var angle = 0;
  function moveFlakes(){
    angle += 0.01;
    for(var i = 0; i < mf; i++)
    {
      //store current flake
      var f = flakes[i];

      //update X and Y coordinates of each snowflakes
      f.y += Math.pow(f.d, 2) + 1;
      f.x += Math.sin(angle) * 2;

      //if the snowflake reaches the bottom, send a new one to the top
      if(f.y > H){
        flakes[i] = {x: Math.random()*W, y: 0, r: f.r, d: f.d};
      }
    }
  }

  setInterval(drawFlakes, 25);
}