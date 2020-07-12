class Recorder {
    constructor(audioRecorderSection, audioPlayerSection) {
      this.audioRecorderSection = document.getElementById(audioRecorderSection);
      this.chunks = [];
      this.audioPlayerSection = document.getElementById(audioPlayerSection)
      this.order = 0;
      this.playList = [];
    }

    audioRecorderBtn() {
    //Audio recorder button container is created with id, then container is nested inside of section
      this.audioRecorderBtnContainer = document.createElement("DIV");
      this.audioRecorderBtnContainer.setAttribute('id', 'audio-recorder-btn-container');
      this.audioRecorderSection.appendChild(this.audioRecorderBtnContainer);
    

    //Audio recorder button is created with class and event listener, then button is nested inside of container
      this.audioRecorderBtn = document.createElement("BUTTON");
      this.audioRecorderBtn.setAttribute('class', 'record-button');
      this.audioRecorderBtn.addEventListener('click', function(e) {
        (e.target.className === 'record-button') ? e.target.setAttribute('class', 'stop-button') : e.target.setAttribute('class', 'record-button');
      }, false);
      this.audioRecorderBtnContainer.appendChild(this.audioRecorderBtn);
    }
        
    engine() {
      navigator.mediaDevices.getUserMedia({audio:true}) //Ask user for access to microphone
    .then(function(stream) {
      this.mediaRecorder = new MediaRecorder(stream); //New MediaRecorder object created.
      
      this.audioRecorderBtn.addEventListener('click', function() {
        
        if(this.mediaRecorder.state === 'inactive') {
          this.mediaRecorder.start();
          console.log(this.mediaRecorder.state);
        }
        else {
          this.mediaRecorder.stop();
          console.log(this.mediaRecorder.state);
        }
      }.bind(this));
  /*------------------------------------------------------------------------------------*/
       this.mediaRecorder.ondataavailable = function(e) { //ondataavailable is an event handler that is fired when recoring has stopped
          this.chunks.push(e.data); //Audio is being saved to chunks array
        }.bind(this);
        
  /*------------------------------------------------------------------------------------*/
        this.mediaRecorder.onstop = function() { //onstop is a function that is called when stop button clicked.
          this.audioPlayerContainer = document.createElement('DIV');
          this.audioPlayerContainer.setAttribute('id', 'audio-player-container');
          this.audioPlayerContainer.setAttribute('class', 'cover-art');
          this.audioPlayerContainer.style.order = this.order--;
          this.audioPlayerSection.appendChild(this.audioPlayerContainer);

          

          this.audio = document.createElement("AUDIO");
          this.audioPlayerContainer.appendChild(this.audio);//.setAttribute("controls", "");
          this.blob = new Blob(this.chunks, { 'type' : 'audio/mp3; codecs=opus' }); //New blob object is created. Takes two parameters, an array and data type
          this.chunks = [];
          this.audioURL = URL.createObjectURL(this.blob); //URL.createObjectURL() takes blob as parameter and creates a url to reference data., which is the audio recording
          this.audio.src = this.audioURL;
  
          this.audioPlayerBtn = document.createElement('BUTTON');
          this.audioPlayerBtn.setAttribute('class', 'play-button');
          this.audioPlayerBtn.addEventListener('click', this.playPauseEvent, false);
          this.audioPlayerContainer.appendChild(this.audioPlayerBtn);

        }.bind(this);
  /*------------------------------------------------------------------------------------*/
    }.bind(this));
    }

    playPauseEvent(e) {
      if(e.target.className === 'play-button') {
        e.currentTarget.previousSibling.play();
        e.target.setAttribute('class', 'pause-button')
      }
      else {
        e.currentTarget.previousSibling.pause();
        e.target.setAttribute('class', 'play-button');
      }
    }
  
    render() {
      this.audioRecorderBtn();
      this.engine();
    }
}

let recorder = new Recorder('audio-recorder-section', 'audio-player-section')
recorder.render();

