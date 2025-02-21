var frontCamera = false;
var currentStream;


const 
    cameraView = document.querySelector("#camera-view"),
    cameraDevice = document.querySelector("#camera-device"),
    photoDisplay = document.querySelector("#photo-display"),
    takePhotoButton = document.querySelector("#take-photo"),
    frontCameraButton = document.querySelector("#front-camera")



function cameraStart() {
    if(typeof currentStream !== 'undefined'){
        currentStream.getTracks().forEach(track => {
            track.stop();
        });
    }
}

    var constraints = {
        audio: false,
        video: {
            facingMode: (frontCamera) ? "user" : "environment"
        }
    };

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            currentStream = stream;
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Error: ", error);
        });

        takePhotoButton.onclick = function(){

            frontCamera = !frontCamera;
            if(frontCamera){
                cameraDevice.innerHTML = "Front Camera";
            }else{
                cameraDevice.innerHTML = "Back Camera";
            }
            cameraStart();
        }

        window.addEventListener("load", cameraStart);