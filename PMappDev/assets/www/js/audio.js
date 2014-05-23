var my_media = null;
var mediaTimer = null;
var playing = false;
        // Play audio
        //
   function playAudio(src) {
	try{
            // Create Media object from src
			
		if(device.platform != null && device.platform !== undefined){
			if(device.platform.toUpperCase().indexOf("ANDRO") >= 0) src = "/android_asset/www/" + src;
			
            my_media = new Media(src, onSuccess, onError);

            // Play audio
            my_media.play();
			playing = true;
            // Update my_media position every second
            if (mediaTimer == null) {
                mediaTimer = setInterval(function() {
                    // get my_media position
                    my_media.getCurrentPosition(
                        // success callback
                        function(position) {
                            if (position > -1) {
                                setAudioPosition((position) + " sec");
                            }
                        },
                        // error callback
                        function(e) {
                            console.log("Error getting pos=" + e);
                            setAudioPosition("Error: " + e);
                        }
                    );
                }, 1000);
            }
		}else{
		
		/////////
		var audio = document.getElementById("myAudio");
		audio.play();
		}
			////////
			}catch(e){
				alert(e.message);
			}
			
        }

        // Pause audio
        // 
        function pauseAudio() {
		playing = false;
		try{
            if (my_media) {
                my_media.pause();
            }
			
			}catch(e){
				testLog(e.message);
			}
        }

        // Stop audio
        // 
        function stopAudio() {
		playing = false;
		try{
		if(device.platform != null && device.platform !== undefined){
            if (my_media) {
                my_media.stop();
            }
            clearInterval(mediaTimer);
            mediaTimer = null;
			}else{
			var audio = document.getElementById("myAudio");
			audio.load();
			}
			
		}catch(e){
				testLog(e.message);
			}
        }

        // onSuccess Callback
        //
        function onSuccess() {
            console.log("playAudio():Audio Success");
        }

        // onError Callback 
        //
        function onError(error) {
		playing = false;
        }

        // Set audio position
        // 
        function setAudioPosition(position) {
            document.getElementById('audio_position').innerHTML = position;
        }
