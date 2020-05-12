let chunks = [];
let audioContainer = document.getElementById('audio-container');
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
        audio.style.order = order--;
        audioContainer.appendChild(audio).setAttribute("controls", "");
        let blob = new Blob(chunks, { 'type' : 'audio/mp3; codecs=opus' }); //New blob object is created. Takes two parameters, an array and data type
        chunks = [];
        let audioURL = URL.createObjectURL(blob); //URL.createObjectURL() takes blob as parameter and creates a url to reference data., which is the audio recording
        audio.src = audioURL;
      }
/*------------------------------------------------------------------------------------*/
  });

  