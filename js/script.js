let chunks = [];
let audioContainer = document.getElementById('audio-container');
let recorderContainer = document.getElementById('recorder-container');
let record = document.getElementById('record');
let stop = document.getElementById('stop');
let order = 0;

navigator.mediaDevices.getUserMedia({audio:true}) //Ask user for access to microphone
  .then(function(stream) {
  
    let mediaRecorder = new MediaRecorder(stream); //New MediaRecorder object created.
    

    record.addEventListener('click', function() { //Adding onclick event to button element with id of record
        mediaRecorder.start(); //function start() is called and begins recording audio from microphone
        record.style.display = "none";
        stop.style.display = "initial";
        console.log(mediaRecorder.state);
    });
    
    
/*------------------------------------------------------------------------------------*/
    stop.addEventListener('click', function() { //Adding onclick event to button element with id of stop
        mediaRecorder.stop(); //functino stop() is called and stops recording audio 
        record.style.display = "initial";
        stop.style.display = "none";
        console.log(mediaRecorder.state);
    });
/*------------------------------------------------------------------------------------*/
     mediaRecorder.ondataavailable = function(e) { //ondataavailable is an event handler that is fired when recoring has stopped
        chunks.push(e.data); //Audio is being saved to chunks array
        console.log(e);
      }
/*------------------------------------------------------------------------------------*/
      mediaRecorder.onstop = function() { //onstop is a function that is called when stop button clicked.
        let audio = document.createElement("AUDIO");
        // audio.style.order = order--;
        audio.setAttribute("style", `order: ${order--}`);
        audioContainer.appendChild(audio).setAttribute("controls", "");
        audioContainer.appendChild(audio).setAttribute("class", "audio-player");
        // audio.classList.add("audio-player");
        let blob = new Blob(chunks, { 'type' : 'audio/mp3; codecs=opus' }); //New blob object is created. Takes two parameters, an array and data type
        chunks = [];
        let audioURL = URL.createObjectURL(blob); //URL.createObjectURL() takes blob as parameter and creates a url to reference data., which is the audio recording
        audio.src = audioURL;
      }
/*------------------------------------------------------------------------------------*/

      function createAudioPlayerContainer() {
        let audioPlayerContainer = document.createElement("DIV");
        audioPlayerContainer.setAttribute("id", "audio-player");
        audioPlayerSection.appendChild(audioContainer);
      }

      function createAudioElement() {
        let audioElement = document.createElement("AUDIO");
        audioElement.setAttribute("controls", "");
        audioElement.setAttribute("style", `order: ${order--}`);
      }

      function audioPlayerContorls() {
        let recordSVG = 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z';
        let stopSVG = 'M6 6h12v12H6z';

        let recordButton = document.createElement("BUTTON");
        audioContainer.appendChild(recordButton);

        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("width", "80px");
        svg.setAttribute("height", "80px");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("fill", "#dd523c");
        recordButton.appendChild(svg);

        let path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("fill", "none");
        path1.setAttribute("d", "M0 0h24v24H0z");
        svg.appendChild(path1);

        let path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("d", recordSVG);
        svg.appendChild(path2);

      }
      // audioPlayerContorls();
      // controls.audioPlayerControls();
      // controls.audioPlayerControls();
      // let recorder = new Recorder();
      // recorder.recorderUI();
      // recorderContainer.addEventListener('click', recorder.controls, false);

      


  });
  

  // let controls = {
  //     recordSVG: 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
  //     stopSVG: 'M6 6h12v12H6z',

  //     audioPlayerControls() {
  //       let recordButton = document.createElement("BUTTON");
  //       audioContainer.appendChild(recordButton);

  //       let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  //       svg.setAttribute("viewBox", "0 0 24 24");
  //       svg.setAttribute("width", "80px");
  //       svg.setAttribute("height", "80px");
  //       svg.setAttribute("aria-hidden", "true");
  //       svg.setAttribute("fill", "#dd523c");
  //       recordButton.appendChild(svg);

  //       let path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  //       path1.setAttribute("fill", "none");
  //       path1.setAttribute("d", "M0 0h24v24H0z");
  //       svg.appendChild(path1);

  //       let path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  //       path2.setAttribute("d", this.recordSVG);
  //       svg.appendChild(path2);
  //     }

  // }

  // class Recorder {
  //   constructor() {
  //     this.recordSVG = 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z';
  //     this.stopSVG = 'M6 6h12v12H6z';
  //   }

  //   recorderUI() {
  //     this.recordButton = document.createElement("BUTTON");
  //     this.recordButton.setAttribute('data-control', 'recordSVG');
  //     recorderContainer.appendChild(this.recordButton);

  //     this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  //     this.svg.setAttribute("viewBox", "0 0 24 24");
  //     this.svg.setAttribute("width", "80px");
  //     this.svg.setAttribute("height", "80px");
  //     this.svg.setAttribute("aria-hidden", "true");
  //     this.svg.setAttribute("fill", "#dd523c");
  //     this.recordButton.appendChild(this.svg);

  //     this.path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  //     this.path1.setAttribute("fill", "none");
  //     this.path1.setAttribute("d", "M0 0h24v24H0z");
  //     this.svg.appendChild(this.path1);

  //     this.path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  //     this.path2.setAttribute("d", this.recordSVG);
  //     this.svg.appendChild(this.path2);
  //     console.log(this.recordButton.dataset.control);
  //   }

  //   stop() {
  //     this.path2.setAttribute("d", this.stopSVG);
  //   }

  //   record() {
  //     this.path2.setAttribute("d", this.recordSVG);
  //   }

  //   controls(e) {
  //     if (e.target !== e.currentTarget && this.recordButton.dataset.control === 'recordSVG') {
  //       this.recordButton.removeAttribute('data-control');
  //       this.recordButton.setAttribute('data-control', 'pauseSVG');
  //       this.path2.setAttribute("d", this.stopSVG);
  //      }
  //      else {
  //       this.recordButton.removeAttribute('data-control'); 
  //       this.recordButton.setAttribute('data-control', 'recordSVG');
  //       this.path2.setAttribute("d", this.recordSVG);
  
  //      }
  //     e.stopPropagation();
  //   }

  
    
  // }

 