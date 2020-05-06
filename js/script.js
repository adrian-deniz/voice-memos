let chunks = [];
let audioContainer = document.getElementById('audio-container');
let record = document.getElementById('record');
let stop = document.getElementById('stop');
let order = 0;

navigator.mediaDevices.getUserMedia({audio:true})
  .then(function(stream) {

    let mediaRecorder = new MediaRecorder(stream);
    

    record.addEventListener('click', function() {
        mediaRecorder.start();
        record.style.display = "none";
        stop.style.display = "initial";
        console.log(mediaRecorder.state);
    });
    
    
/*------------------------------------------------------------------------------------*/
    stop.addEventListener('click', function() {
        mediaRecorder.stop();
        record.style.display = "initial";
        stop.style.display = "none";
        console.log(mediaRecorder.state);
    });

      mediaRecorder.onstop = function(e) {
        
        let audio = document.createElement("AUDIO");
        audio.style.order = order--;
        audioContainer.appendChild(audio).setAttribute("controls", "");
        let blob = new Blob(chunks, { 'type' : 'audio/mp3; codecs=opus' });
        chunks = [];
        let audioURL = URL.createObjectURL(blob);
        audio.src = audioURL;
        
        
      }
/*------------------------------------------------------------------------------------*/
    mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      }
    
  });
