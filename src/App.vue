<template>
  <div id="app">
    <div class="container">

		<h1>{{getCntBuffered}} == {{durationSeconds}}</h1>
			<audio id="audio" :loop="innerLoop" ref="audiofile" :src="defaultSong" preload style="display: none" controls></audio>

     <div id = "computed_props">
         Kilometers : <input type = "text" v-model = "kilometers">
         Meters : <input type = "text" v-model = "meters">
      </div>
      <hr>
      <div class='row'>

        <template v-for='song in songs'>
          <div class="col-4 col-md-3 col-lg-2 song" >

            <div class='wrapper'>



              <div class="overlay-play text-center" v-if="isPlaying && (currentSong.id === song.id )" @click='pause'>
                <i class="fa fa-stop-circle"></i>
              </div>

              <div class="overlay-play text-center" @click='play(song)'v-else>
                <i class="fas fa-play-circle"></i>

              </div>

              <img :src="song.cover_art_url" alt="" class='img-fluid rounded'>
            </div>



            <p class='song-title mt-2'>{{song.title}}</p>
            <p class='song-artiste' >{{song.artist}}</p>

          </div>

        </template>
      </div>

    </div>

    <div class="music-player">

      <!-- the playlist -->
      <div class="container">
        <transition name="height">
          <div class="playlist" :class="showPlaylist?'show':'hide'" v-if="showPlaylist">
            <div class="wrap">
              <div class="song-wrap" v-for="song in playlist.songs" @click="play(song)">
                <div class="song-details" style="display: flex; align-content: space-between">
                  <div>
                  <span class="play">
                                        <i class="icon ion-ios-pause"
                                           v-if="isPlaying && (currentSong.id === song.id )"></i>
                                        <i class="icon ion-ios-play" v-else></i>
                                    </span> {{song.title}}
                  </div>
                  <div>
                  <span>
                                        <img class="music-bars-gif" src="https://res.cloudinary.com/dmf10fesn/image/upload/v1548886976/audio/assets/animated-sound-bars.gif"
                                             v-if="isPlaying && (currentSong.id === song.id )"/>
                                    </span> {{song.artist}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!-- end of playlist -->

      <!-- the audio player code starts here -->
      <div class="player" id="player">

        <div class="container">

          <div class="player-contents-wrap">

            <div class="album-art">
              <img :src="currentSong.cover_art_url" class="img" />
            </div>

            <div class="main-controls ">
              <div class="controls">

                <div class="skip-backward">
                  <i class="fas fa-backward" @click="skip('backward')"></i>
                </div>

                <div class="play">
                  <i class="fas fa-play-circle" v-if="!isPlaying" @click="playCurrentSong"></i>
                  <i class="fas fa-stop-circle" v-else @click="pause"></i>
                </div>
                <div class="play">
<!--                  <i class="fas fa-volume-mute"></i>-->
                  <i class="fas fa-volume-off" @click="mute"></i>
                </div>

                <div class="skip-forward">
                  <i class="fas fa-forward" @click="skip('forward')"></i>
                </div>

              </div>

              <div class="seek">
                <div class="title-and-time">

                  <div class="title">
                    {{currentSong.title}}: {{currentSong.artist}}
                  </div>

                  <div class="time">
                    {{currentPlayedTime}} / {{duration}}
                  </div>
                </div>

                <div class="progress-container">
                  <div class="progress" id="progress-wrap">
										<div :style="{width:cntBuffered + '%'}" class="bufferedPercent"></div>
                    <div class="progress-handle" :style="{left:progressPercentageValue}"></div>

                    <div class="transparent-seeker-layer" @click="seek"></div>

                    <div class="bar" :style="{width:progressPercentageValue}">

                    </div>
                  </div>

                </div>

                <div class="extra-controls">

                  <div class="playlist-icon" @click="toggleShowPlaylist">
                    <i class="icon ion-md-list"></i>
                  </div>

                  <div class="repeat">
                    <div class="repeat-info" v-if="onRepeat">
                      {{loop.value}}
                    </div>
                    <i class="icon ion-ios-repeat" @click="repeat"></i>
                  </div>

                  <div class="shuffle-icon">

                    <i class="icon ion-ios-shuffle" @click="shuffleToggle"></i>
                  </div>



                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
      <!-- the audio player code ends here -->

    </div>


  </div>
</template>
<script>

export default {
  data:()=>({
    kilometers : 0,
    meters:0,
    defaultSong: '',
    isPlaying: false,
    isLoaded: false,
    isCurrentlyPlaying: "",
    onRepeat: false,
    shuffle: false,

    loop: {
      state: false,
      value: 1
    },

    cntBuffered: undefined,

    durationSeconds: 0,
    currentSeconds: 0,
    audioPlayer: undefined,
    previousVolume: 35,
    volume: 100,
    autoPlay: false,
    progressPercentageValue: "0%",

    songs: [
      {
        id: 1,
        title: "Wow",
        artist: "Post Malone",
        album: "",
        url:
          "https://cdn.kitap.kz/storage/album/4/track_0.mp3",
        cover_art_url:
          "https://res.cloudinary.com/dmf10fesn/image/upload/v1548884701/audio/album%20arts/s-l300.jpg"
      },
      {
        id: 3,
        title: "Gods Plan",
        artist: "Drake",
        album: "",
        url:
          "https://cdn.kitap.kz/storage/album/4/track_1.mp3",
        cover_art_url:
          "https://res.cloudinary.com/dmf10fesn/image/upload/v1548884622/audio/album%20arts/a2497580059_10.jpg"
      },

      {
        id: 6,
        title: "Hamble",
        artist: "Kendrick Lamar",
        album: "",
        url:
          "https://cdn.kitap.kz/storage/album/4/track_5.mp3",
        cover_art_url:
          "https://res.cloudinary.com/dmf10fesn/image/upload/v1548884891/audio/album%20arts/FwqM2g6.png"
      },
  /*    {
        id: 5,
        title: "Chilling",
        artist: "Kwesi Arthur",
        album: "",
        url:
          "https://res.cloudinary.com/dmf10fesn/video/upload/v1548887340/audio/Kwesi-Arthur-Chill-Prod-by-Dannyedtracks.mp3",
        cover_art_url:
          "https://res.cloudinary.com/dmf10fesn/image/upload/v1548887458/audio/album%20arts/Kwesi-Arthur-Chill-Prod.-By-Dannyedtrackswww.Ghanasongs.com_.jpg"
      },
      {
        id: 2,
        title: "Better Now",
        artist: "Post Malone",
        album: "",
        url:
          "https://res.cloudinary.com/dmf10fesn/video/upload/v1548882769/audio/Post_Malone_-_Better_Now_playvk.com.mp3",
        cover_art_url:
          "https://res.cloudinary.com/dmf10fesn/image/upload/v1548884701/audio/album%20arts/s-l300.jpg"
      },

      {
        id: 4,
        title: "Dont Kill My Vibe",
        artist: "Kendrick Lamar",
        album: "",
        url:
          "https://res.cloudinary.com/dmf10fesn/video/upload/v1548884972/audio/Kendrick-Lamar-Bitch-Dont-Kill-My-Vibe.mp3",
        cover_art_url:
          "https://res.cloudinary.com/dmf10fesn/image/upload/v1548885857/audio/album%20arts/ae8e88aa099173dbee78d904f035e459bfb69f5a.jpg"
      }*/
    ],

    playlist: {
      currentIndex: 0,

      songs: [
        {
          id: 1,
          title: "Wow",
          artist: "Post Malone",
          album: "",
          url:
            "",
          cover_art_url:
            "https://res.cloudinary.com/dmf10fesn/image/upload/v1548884701/audio/album%20arts/s-l300.jpg"
        }
      ]
    },
    previousPlaylistIndex: 0,
    hasNext: false,
    originalSongArray: [],

    currentSong: {
      id: "",
      title: "",
      artist: "",
      album: "",
      url: "",
      cover_art_url: ""
    },

    /** ui control variables*/

    showPlaylist: false
  }),


  methods: {
    /** UI control methods
     * these methods are used to control the ui*/

    toggleShowPlaylist() {
      this.showPlaylist = !this.showPlaylist;
    },

    /**Music player methods
     * these methods are used to control the music player*/

    initPlayer() {
      // this.audioPlayer.src = this.playlist.songs[0].url;
      const curSong = this.songs[0]
      const audio = this.audioPlayer
      audio.src = curSong.url;
      this.setCurrentSong(curSong);
      audio.addEventListener("timeupdate", this.updateTimer);
      audio.addEventListener("loadeddata", this.load);
      audio.addEventListener("pause", () => {
        this.isPlaying = false;
      });
			audio.addEventListener("volumechange", this.changeVolume);

      audio.addEventListener("progress", this.bufferedProgress);
      // audio.addEventListener("progress", this.some);
      audio.addEventListener("play", () => {
        console.log('isPlaying', this.isPlaying)
        this.isPlaying = true;
      });
      audio.addEventListener("ended", this.playNextSongInPlaylist);

    },

		bufferedProgress(){
/*			this.cntBuffered = parseInt((this.audioPlayer.buffered.end(0) / this.durationSeconds) * 100)
			console.log(parseInt(this.audioPlayer.buffered.end(0)))*/
			if(this.isLoaded){
			  console.log('this.isLoaded')
        this.cntBuffered = parseInt((this.audioPlayer.buffered.end(0) / this.durationSeconds) * 100)
			}
        if(this.cntBuffered === Infinity){
          console.log('this.cntBuffered === Infinity')
          return  this.cntBuffered
        }
      return this.cntBuffered
		},
    play(song = {}) {
      if (typeof song === "object") {
        if (this.isLoaded) {
          //check if song exists in playlist

          if (this.currentSong.id === song.id && this.isPlaying) {
            this.pause();
          } else if (this.currentSong.id === song.id && !this.isPlaying) {
            this.playCurrentSong();
          } else if (this.currentSong.id !== song.id) {
            if (!this.containsObjectWithSameId(song, this.playlist.songs)) {
              this.addToPlaylist(song);
            } else {
              console.log("playMethod", "song already in playlist");
            }

            this.setAudio(song.url);
            this.setCurrentSong(song);
            this.playlist.currentIndex = this.getObjectIndexFromArray(
              song,
              this.playlist.songs
            );
            this.previousPlaylistIndex = this.playlist.currentIndex;
            this.audioPlayer.play();
          }
        } else {
          this.setAudio(song.url);
          this.audioPlayer.play();
        }

        this.isPlaying = true;
      } else {
        throw new Error("Type Error : Song must be an object");
      }
    },

    playCurrentSong() {
      this.audioPlayer.play();
      this.isPlaying = true;
    },

    stop() {
      this.audioPlayer.currentTime = 0;
    },

    pause() {
      this.audioPlayer.pause();
      this.isPlaying = false;
    },

    repeat() {
      if (!this.loop.state && !this.onRepeat) {
        //firstclick
        this.loop.state = true;
        this.loop.value = 1;
        this.onRepeat = true;
      } else if (this.loop.state && this.onRepeat && this.loop.value === 1) {
        //second click
        this.loop.state = true;
        this.loop.value = "all";
        this.onRepeat = true;
      } else if (
        this.loop.state &&
        this.onRepeat &&
        this.loop.value === "all"
      ) {
        this.loop.state = false;
        this.loop.value = 1;
        this.onRepeat = false;
      }
    },

    skip(direction) {
      if (direction === "forward") {
        this.playlist.currentIndex += 1;
      } else if (direction === "backward") {
        this.playlist.currentIndex -= 1;
      }

      /**if the current Index of the playlist is greater or equal to the length of the playlist songs (the index is out of range)
       reset the index to 0. It could also mean that the playlist is at its end. */

      if (this.playlist.currentIndex >= this.playlist.songs.length) {
        this.playlist.currentIndex = 0;
      }

      if (this.playlist.currentIndex < 0) {
        this.playlist.currentIndex = this.playlist.songs.length - 1;
      }

      this.audioPlayer.src = this.playlist.songs[
        this.playlist.currentIndex
        ].url;
      this.setCurrentSong(this.playlist.songs[this.playlist.currentIndex]);

      //the code below checks if a song is playing so it can go ahead and auto play
      if (this.isPlaying) {
        this.audioPlayer.play();
      }
    },

    mute() {
			this.audioPlayer.muted = !this.audioPlayer.muted
    },

    updateTimer() {
      this.currentSeconds = parseInt(this.audioPlayer.currentTime);
      this.progressPercentageValue =
        (this.currentSeconds / parseInt(this.audioPlayer.duration) * 100 || 0) +
        "%";
    },

    seek(e) {
      if (this.isLoaded) {
        let el = e.target.getBoundingClientRect();
        let seekPos = (e.clientX - el.left) / el.width;
        let seekPosPercentage = seekPos * 100 + "%";

        /**
         *  calculating the portion of the song based on where the user clicked
         *
         */

        let songPlayTimeAfterSeek = parseInt(
          this.audioPlayer.duration * seekPos
        );

        this.audioPlayer.currentTime = songPlayTimeAfterSeek;

        this.progressPercentageValue = seekPosPercentage;
      } else {
        throw new Error("Song Not Loaded");
      }
    },

    addAndPlayNext() {
      let selectedSong = {
        title: "Song Name 3",
        artist: "Artist Name",
        album: "Album Name",
        url: "./song2.mp3",
        cover_art_url: "/cover/art/url.jpg",
        isPlaying: false
      };

      //add the song to the playlist

      //get the index of the song that is currently being played in the player

      //insert the song at that position

      let indexOfCurrentSong = this.playlist.currentIndex;

      this.playlist.songs.splice(indexOfCurrentSong + 1, 0, selectedSong);
    },

    addToPlaylist(song) {
      this.playlist.songs.unshift(song);
    },

    dragSeek(e) {
      let el = e.target.getBoundingClientRect();
    },

    playNextSongInPlaylist() {
      if (this.onRepeat && this.loop.value === 1) {
        this.audioPlayer.play();
      } else {
        if (this.playlist.songs.length > 1) {
          if (this.random) {
            //generate a random number
            let randomNumber = this.generateRandomNumber(
              0,
              this.playlist.songs.length - 1,
              this.previousPlaylistIndex
            );

            //set the current index of the playlist
            this.playlist.currentIndex = randomNumber;

            //set the src of the audio player
            this.audioPlayer.src = this.playlist.songs[
              this.playlist.currentIndex
              ].url;
            //set the current song
            this.setCurrentSong(
              this.playlist.songs[this.playlist.currentIndex]
            );
            //begin to play
            this.audioPlayer.play();
          } else {
            /**if the current Index of the playlist is equal to the index of the last song played skip that song
             and add 1*/

            if (this.playlist.currentIndex === this.previousPlaylistIndex) {
              //increment the current index of the playlist by 1
              this.playlist.currentIndex += 1;
            }

            /**if the current Index of the playlist is greater or equal to the length of the playlist songs (the index is out of range)
             reset the index to 0. It could also mean that the playlist is at its end. */

            if (this.playlist.currentIndex >= this.playlist.songs.length) {
              if (this.onRepeat && this.loop.value === "all") {
                //if repeat is on then replay from the top
                this.playlist.currentIndex = 0;
              } else {
                return;
              }
            }

            this.audioPlayer.src = this.playlist.songs[
              this.playlist.currentIndex
              ].url;
            this.setCurrentSong(
              this.playlist.songs[this.playlist.currentIndex]
            );
            this.audioPlayer.play();
            this.playlist.currentIndex++;
          }
        } else {
        }
      }
    },

    shuffleToggle() {
      //shuffle the playlist songs and rearrange
      this.playlist.songs = this.shuffleArray(this.playlist.songs);

      //reset the playlist index when changed and rest the previous playlist index
      this.playlist.currentIndex = this.getObjectIndexFromArray(
        this.currentSong,
        this.playlist.songs
      );
      this.previousPlaylistIndex = this.playlist.currentIndex;
    },

    /** Helper methods
     * these methods are usually used within other methods*/

    formatTime(secs) {
      var minutes = Math.floor(secs / 60) || 0;
      var seconds = Math.floor(secs - minutes * 60) || 0;
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    },

    setAudio(song) {
      this.audioPlayer.src = song;
    },

    load() {
      if (this.audioPlayer.readyState >= 2) {
        this.isLoaded = true;
        // this.durationSeconds = parseInt(this.audioPlayer.duration);
      } else {
        throw new Error("Failed to load sound file.");
      }
    },

    playlistHelper() {},

    containsObjectWithSameId(obj, list) {
      let i;
      for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
          return true;
        }
      }
    },

    getObjectIndexFromArray(obj, list) {
      //this function just returns the index of the item with the id
      let i;
      for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
          return i;
        }
      }
    },

    setCurrentSong(song) {

      /*currentSong: {
        id: "",
            title: "",
            artist: "",
            album: "",
            url: "",
            cover_art_url: ""
      }*/
      this.currentSong.id = song.id;
      this.currentSong.title = song.title;
      this.currentSong.artist = song.artist;
      this.currentSong.album = song.album;
      this.currentSong.url = song.url;
      this.currentSong.cover_art_url = song.cover_art_url;
      this.previousPlaylistIndex = this.playlist.currentIndex;

    },

    generateRandomNumber(min, max, except) {
      let num = null;
      num = Math.floor(Math.random() * (max - min + 1)) + min;
      return num === except ? this.generateRandomNumber(min, max, except) : num;
    },

    shuffleArray(array) {
      let ctr = array.length;
      let temp;
      let index;

      // While there are elements in the array
      while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
      }
      return array;
    },

		changeVolume(e){
      	// e.target.volume = 20
			console.dir(e.target)
		}
  },

  created() {
    this.innerLoop = this.loop.state;
    this.defaultSong = this.getDefaultSongs

  },

  mounted() {
    this.audioPlayer = document.getElementById('audio');
    this.initPlayer();
    // this.audioPlayer.play()
  },

  computed: {
    currentPlayedTime() {

      return this.formatTime(this.currentSeconds);
    },

		getDefaultSongs(){
      return this.playlist.songs[0].url
		},
    duration() {
      return this.formatTime(this.durationSeconds);
    },
    progressPercentage() {
      return parseInt(this.currentSeconds / this.durationSeconds * 100);
    },
    muted() {
      //this returns true or false
      return this.volume / 100 === 0;
    },
    getCntBuffered(){
      return  this.cntBuffered
		}
  },
  watch: {
    kilometers: function(val) {
                  this.kilometers = val;
                  this.meters = val * 1000;
               },
    meters : function (val) {
                  this.kilometers = val/ 1000;
                 this.meters = val;
    }
  }
};

</script>

<style lang="scss">

  html, body {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }


  img {
    max-width: 100%;
    height: auto;
  }
  #app{
    width:100%;
    margin-top:50px;
  }
  .song{
    .wrapper{
      position:relative;
      width:100%;
      height:auto;
      .overlay-play{
        cursor:pointer;
        position:absolute;
        width:40px;
        height:40px;
        background-color: #FD6A02;
        bottom:5px;
        right:5px;
        border-radius:50%;
        i{
          font-size:1.8em;
          line-height:40px;
          color:#fff;
        }
      }
    }

    .song-title{
      font-weight:700;
      margin-bottom:0;
      line-height:auto;
    }

    .song-artiste{
      line-height:auto;

    }
  }
  .music-player {
    width: 100%;
    bottom: 0;
    position: fixed;

    .playlist {
      width: auto;
      max-width: 400px;
      background-color: rgba(255, 80, 0, 0.71);
      position: relative;
      margin-left: auto;
      z-index: 1;

      .header{

      }

      .show {
        overflow: auto;
      }

      .wrap {
        max-height: 75px;
        overflow: auto;

        .song-wrap {
          height: 25px;
          width: 100%;
          color: white;
          cursor: pointer;

          &:hover {
            background-color: rgba(255, 255, 255, 0.3);
          }

          &:not(:last-child) {

            border-bottom: 0.05em solid #cdcdcd;

          }

          .song-details {
            font-size: 0.8em;
            line-height: 25px;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-right: 10px;
            padding-left: 10px;

            span {
              line-height: 15px;

              &.play {
                display: inline-block;
                margin-right: 10px;
                border: 1px solid #fff;
                border-radius: 10px;
                height: 17px;
                width: 17px;
                text-align: center;


                i {
                  text-align: center;

                }
              }

            }

            .music-bars-gif {
              height: 10px;
            }
          }

        }

        scrollbar-width: 5px;

        &::-webkit-scrollbar {
          width: 5px;
        }

        &::-webkit-scrollbar-track {
          background-color: #CCC;
          -webkit-box-shadow: inset 0 0 6px rgb(145, 145, 145);
          border-radius: 0;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 0;
          background-color: #d2d2d2;
          -webkit-box-shadow: inset 0 0 6px rgba(238, 238, 238, 0.5);
        }
      }
    }

    .player {

      //styles for the player
      position: relative;
      z-index: 2;
      width: 100%;
      height: 60px;
      background-color: #6f6f6f;

      .player-contents-wrap {
        position: relative;
        width: 100%;
        height: 60px;

        .album-art {
          background-color: white;
          width: 60px;
          height: 60px;

          .img {
            width: 60px;
            height: 60px;
          }
        }

        .main-controls {
          position: absolute;
          right: 0;
          width: calc(100% - 60px);
          height: 60px;
          top: 0;

          i {
            cursor: pointer;
          }

          .controls {
            width: 15%;
            height: 60px;
            display: flex;
            justify-content: space-around;
            text-align: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.05);

            i {
              font-size: 1.8em;
              color: white;
            }

            .play {
              text-align: center;
              border-radius: 25px;
              width: 40px;
              height: 40px;
              border: 1px solid #fff;

              i {
                line-height: 40px;
                text-align: center;
              }
            }

            .pause {

            }

          }

          .seek {
            padding-left: 20px;
            padding-top: 0;
            position: absolute;
            height: 60px;
            width: 85%;
            top: 0;
            left: unset;
            right: 0;

            .title-and-time {
              height: 25px;
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;

              .title {

              }

              .time {

              }

            }

            .progress-container {
              position: relative;
              height: 10px;
              width: auto;
              display: flex;
              align-items: center;

              .progress {
                background-color: rgba(0, 0, 0, 0.05);
                height: 4px;
                //width: calc(75% - 30px);
                width: 100%;
                margin: 0;
                padding: 0 2px;
                border-radius: 0;
                display: flex;
                align-items: center;

                box-shadow: 0 1px 1px rgba(0, 0, 0, .1);

                .progress-handle {
                  display: block;
                  position: absolute;
                  z-index: 6;
                  margin-top: 0;
                  margin-left: -2px;
                  width: 8px;
                  height: 8px;
                  border-radius: 100%;
                  background-color: #fff;
                  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
                  cursor: pointer;

                  &:hover {
                    background-color: #000;
                  }
                }

                .transparent-seeker-layer {
                  //please do not delete this layer unless you know what you are doing
                  // this code allows the seeker click position to function well
                  width: 100%;
                  height: 6px;
                  background-color: transparent;
                  position: absolute;
                  cursor: pointer;
                  z-index: 5;

                }

                .bar {
                  width: 0;
                  background-color: #fff;
                  height: 4px;
                  position: absolute;

                }

              }
            }

            .extra-controls {
              height: 25px;
              width: 100%;
              display: flex;
              flex-direction: row-reverse;
              align-items: center;

              .like {
                padding-left: 8px;
                height: 25px;

                i {
                  font-size: 1em;
                  line-height: 25px;
                }
              }

              .download {
                padding-left: 8px;
                height: 25px;

                i {
                  font-size: 1em;
                  line-height: 25px;
                }
              }

              .shuffle-icon {
                padding-left: 8px;
                height: 25px;

                i {
                  font-size: 1.2em;
                  line-height: 25px;
                }
              }

              .repeat {
                position: relative;
                padding-left: 8px;
                height: 25px;

                .repeat-info {
                  background-color: red;
                  width: 13px;
                  height: 13px;
                  border-radius: 8px;
                  position: absolute;
                  font-size: 7px;
                  line-height: 12px;
                  text-align: center;
                  right: -12px;
                  top: 5px;
                  color: #fff;
                  text-transform: capitalize;
                  letter-spacing: 1px;
                }

                i {
                  font-size: 1.2em;
                  line-height: 25px;
                }
              }

              .playlist-icon {
                margin-left: 30px;
                height: 25px;
                i {
                  font-size: 1.2em;
                  line-height: 25px;
                }
              }

            }

          }

        }

        .volume {

        }
      }

    }
  }

  .bufferedPercent{
    background-color: red;
		height: 1rem;
		margin-bottom: 1rem;
	}

  .height-enter-active {
    animation: bounce-in .5s;
  }

  .height-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      max-height: 0;
    }
    100% {
      max-height: 75px;

    }
  }

</style>
