	//window.localStorage.setItem('QPname',1);
	//window.localStorage.getItem('key');
	//window.localStorage.removeItem('guessCount');	
	
	/* in use:
	window.localStorage.setItem('theme','b');
	window.localStorage.setItem('team', red riders);
	window.localStorage.setItem('password', myPassword);
	window.localStorage.setItem('teamColor','b');
	window.localStorage.setItem('isAuthenticated',false);
	window.localStorage.setItem('UserName');
	window.localStorage.setItem('PlayerId');
	window.localStorage.setItem("imageData",imageData);
	window.localStorage.setItem('MainLogMessageResult',false); 
	
		/b = eval("("+ $("#txtConsole").val() + ")");
		//b = eval("("+ "alert('dude')" + ")");
	*/
	var baseURL = "http://woodlandshalloween.com/premorial/";

	
	
	function cb(response){	
				//DO NOT DELETE - used by all Json calls 		
	}
	

	
	
	function sendNewTeamMember(){
	//http://localhost:60279/MidnightMadnessAsp/Service.svc/sendNewTeamMember/{PlayerName}/{TeamColor}/{Device}/{LAT}/{LON}&callback=cb
	$.mobile.loading('show');
		playerId = window.localStorage.getItem('PlayerId');
		lat = 0; lon = 0;
		teamColor = window.localStorage.getItem('teamColor');
		var device = (device != undefined && device != null ) ? device.platform : "X";
		//var device = "XXX";
		challengeId = window.localStorage.getItem('CHALLENGE_ID');
		playerName = window.localStorage.getItem('UserName');
	console.log(baseURL + "Service.svc/sendNewTeamMember/" + playerId + "/" + playerName + "/" + teamColor + "/" + device + "/" + lat + "/" + lon +"?callback=cb");
	
		try{
		url = baseURL + "Service.svc/sendNewTeamMember/" + playerId + "/" + playerName + "/" + teamColor + "/" + device + "/" + lat + "/" + lon +"?callback=cb";
		$.post(url);			
		}
		catch(ex){
		 console.log(ex.message);
		}
		$.mobile.loading('hide');
		
	}
	
	function getSplash(){
	//console.log(baseURL + "Service.svc/getSplash/" + window.localStorage.getItem('teamColor') + "?callback=cb");
		try{
		$.mobile.loading('show');
			$.ajax({
			
				crossDomain: true,
				type:"GET",
				contentType: "application/json; charset=utf-8",
				async:false,
				url: baseURL + "Service.svc/getSplash/" + window.localStorage.getItem('teamColor') + "?callback=cb",
				dataType: "jsonp",                
				success: function (response) {	
				window.localStorage.setItem('challengeJson', response);	
				window.localStorage.setItem('splashMessage', response.getSplashResult);	
						$("#HeaderText").html(response.getSplashResult);
			  },
			  error: function (xhr, ajaxOptions, thrownError) {
					console.log('err status:' + xhr.status);
					console.log(thrownError);
			  }		
			});
			
		}
		catch(ex){
		div.innerHTML += '<br />begin catch()';
		
		}
		$.mobile.loading('hide');
	}
	
	
	function getSignInPage(){
	//gets all challenges and converts to a jqueryMobile List object
			div = document.getElementById("signInTD");
			//$("#testDiv").html("beginmm");
			$.mobile.loading('show');
		try{
			
			$.ajax({
			
				crossDomain: true,
				type:"GET",
				contentType: "application/json; charset=utf-8",
				async:false,
				url: baseURL + "Service.svc/getsignInPage?callback=cb",
				dataType: "jsonp",                
				success: function (response) {	
				//response.GetSignInTeamsResult[i].     TEAM_LEADER   TEAM_COLOR    TEAM_NAME  	TEAM_HEX	TEAM_PASSWORD	TEAM_THEME
					var s = '<ul data-role="listview" data-theme="a" data-dividertheme="e">';
					for(i=0; i< response.GetSignInTeamsResult.length; i ++){
						s+= '<li><a name="' + response.GetSignInTeamsResult[i].TEAM_THEME + '" id="' + response.GetSignInTeamsResult[i].TEAM_PASSWORD + '" ';				
						s+= 'rev="' + response.GetSignInTeamsResult[i].TEAM_COLOR + '" onclick="goToAuth(this.innerHTML,this.name,this.id,this.rev)"';
						s+= 'style="color:#' + response.GetSignInTeamsResult[i].TEAM_HEX + '";>';	
							s+= response.GetSignInTeamsResult[i].TEAM_NAME;
							//s+=  ' | ' + response.GetSignInTeamsResult[i].CHALLENGE_NUM;
							//s+=  ' | ' + response.GetSignInTeamsResult[i].CHALLENGE_STATUS;
							//s+=  ' | ' + response.GetSignInTeamsResult[i].CHALLENGE_TYPE;
						s+= '</li>';
					}
					s+=  '</ul>';  console.log(s);
							
					div.innerHTML = s;
					$('#signinTitle').html("Please Sign In");
				$('#signindiv').trigger('create');
				/*
				<ul data-role="listview" data-theme="c" data-dividertheme="e">
					<li data-role="list-divider">Form elements</li>
					<li data-theme="e"><a href="docs-forms.html">Form basics</a></li>
					<li data-theme="e"><a href="forms-all.html">Form element gallery</a></li>
				</ul>
				*/
				
				
			  },
			  error: function (xhr, ajaxOptions, thrownError) {
					signinLog('err status:' + xhr.status);
					signinLog(thrownError);
			
			  }		
			});
			
		}
		catch(ex){
		div.innerHTML += '<br />begin catch()';
		}
		$.mobile.loading('hide');
	}
// He may hate everything but every nite he flies the black banner promoting piece
	function getCurrentChallenge(){
	$.mobile.loading('show');
	window.localStorage.setItem('guessCount',0);
	clearAll();
		try{
			$.ajax({
			
				crossDomain: true,
				type:"GET",
				contentType: "application/json; charset=utf-8",
				async:false,
				url: baseURL + "Service.svc/getCurrentChallenge/" + window.localStorage.getItem('teamColor') + "?callback=cb",
				dataType: "jsonp",                
				success: function (response) {	
				window.localStorage.setItem('challengeJson', response);	
				
						
						jQuery.each(response.GetCurrentChallengeResult[0], function(key, val) {
								window.localStorage.setItem(key, val);
								//console.log(key + " | " + val);
								/*	ANSWER_LAT | 39.9835 
									ANSWER_LOCATION | Mikey's Late Nite Slice.  E Side of High St between 2nd Ave and 3rd Ave.
									ANSWER_LON | -83.00459 
									CHALLENGE_ANSWER_CD | 123456 
									CHALLENGE_ID | 1
									CHALLENGE_TEXT | bla bla bla
									CHALLENGE_TITLE | Mikey's
									CHALLENGE_TYPE | enterCode 
									CHALLENGE_ORDER | 5 
								*/
								
						});	
						$("#btnNxtChal").css("visibility","visible");  $("#lblNextChallengeWait").css("visibility","hidden");
						console.log("Successfully stored challenge data");
						$.mobile.loading('hide');
						displayCurrentChallenge();
						/*
						if(window.localStorage.getItem("CHALLENGE_ORDER") == 1){
							$("#btnChallenges").html("First Challenge");
							}else{
							$("#btnChallenges").html("Next Challenge");
							}
						*/	
			  },
			  error: function (xhr, ajaxOptions, thrownError) {
					console.log('err status:' + xhr.status);
					console.log(thrownError);
			  }		
			});
			
		}
		catch(ex){
		div.innerHTML += '<br />begin catch()';
		}
		
	}

	function getChallengeItem(key){ //returns the currently stored item of the current challenge
									// ex: getChallengeItem("CHALLENGE_TITLE") would return "Mikey's"
		resp = '';
		if (window.localStorage.getItem(key)) {
				resp = window.localStorage.getItem(key);
			}
		return resp;	
	}

	function displayCurrentChallenge(){
		// CHALLENGE_ID CHALLENGE_TITLE CHALLENGE_TEXT CHALLENGE_TYPE CHALLENGE_ANSWER_CD ANSWER_LOCATION ANSWER_LAT ANSWER_LON
		div = $('#GameDiv');
		$('#lblChallenge').html("Challenge # " + getChallengeItem("CHALLENGE_ORDER"));
		//s = "<label style = 'font-size:22px'>Challenge # " + getChallengeItem("CHALLENGE_ORDER") + "</label>";
		//s += "<hr /><p />";
		s = getChallengeItem("CHALLENGE_TEXT");
		s += "<p /><br /><br />";
		s += ChallengeInputDiv();
		s += "";
		s += "";
		//console.log(s);
		div.html(s);
		div.trigger('create'); //renders the div text into the jQueryMobile DOM
	}
	
	
	function getMainLogMessage(){
	//$.mobile.loading('show');
		try{
			$.ajax({
			
				crossDomain: true,
				type:"GET",
				contentType: "application/json; charset=utf-8",
				async:false,
				url: baseURL + "Service.svc/getMainLogMessage/" + window.localStorage.getItem('teamColor') + "?callback=cb",
				dataType: "jsonp",                
				success: function (response) {					
					/*
					if(response.getMainLogMessageResult == "" || response.getMainLogMessageResult == "c"){mainLog("c");} //clear out all data

					if(response.getMainLogMessageResult != window.localStorage.getItem('MainLogMessageResult')){					
						
							mainLog("<br/>");// keep the listening message and give space for the message addition
							mainLog(response.getMainLogMessageResult);// put the new data in the div
						

						
						}else if(response.getMainLogMessageResult == ""){// 	
								mainLog("c"); //clear out the data from the div				
								mainLog(response.getMainLogMessageResult);// put the new data in the div
								$('#mainConsole').trigger('create');// render the new data							
						}
					*/	
					mainLog("c"); //clear the log
					for(i=0; i< response.getMainLogMessageResult.length; i ++){
					 
					 mainLog(response.getMainLogMessageResult[i].MSG)
					
						
					}
					
				},
			    error: function (xhr, ajaxOptions, thrownError) {
					console.log('err status:' + xhr.status);
					console.log(thrownError);
			    }
			});
			
		}
		catch(ex){
		div.innerHTML += '<br />begin catch()';
		}
	}
	

//onclick="$(\'#labelErrorCode\').html(\'\');"
	function ChallengeInputDiv(){
		var divText = '';	
		n = getChallengeItem("CHALLENGE_TYPE");
		switch(n){
			case 'enterCode':
			  divText = '<input type="text" name="textBoxCode" id="txtCode" style="font-size:22px; text-align:center;" value="" placeholder="answer" ';
			  divText +='onclick="$(\'#labelErrorCode\').html(\'\');" />';
			  divText +='<a data-role="button" class="" id="ValidateCode" data-theme="a" data-shadow="true" onclick="codeClick()" >submit</a>';
			  divText +='<p />';
			  divText +='<label id = "labelErrorCode" style="font-size:34px; color: #C80000;"></label>';
			  //$("#txtCode").val()
			  /*
			  divText +="<script type = 'text/javascript'>$('#validateCode').on('click', function() { console.log('validateCode fired!');});</script>"
			  */
			//	console.log(divText);
			  break;
			case 'photo':
			  divText = 'snap photo: <a data-role="button" onclick="$(\'#btnSendPhoto\').html(\'Submit This Pic\');snapPhoto()" id="btnSnapPhoto"  data-shadow="true" >snap</a>';
			  divText +='<div class="tablestyle" style="visibility:hidden" id="divPhoto">'
			  divText +='<table class="tablestyle"><tr><td style="width:25%"></td><td style="width:50%">'
			  divText +='<img style="width:250px;" id="thumbnailPic" src="" alt="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sorry.. please snap again" style="border:none" />';
			  divText +='</td><td  style="width:50%"></td></tr></table>'
			  divText +='<p /> <a data-role="button" onclick="$(\'#btnSendPhoto\').html(\'please wait...\');setTimeout(function(){sendPhoto();},75);" id="btnSendPhoto"  data-shadow="true" >Submit This Pic</a></div>';
			  //height:150px;
				
			  break;
			case 'location':
			  divText = 'send GPS Location: <a data-role="button" class="" data-theme="b" data-shadow="true" >Send Location</a>';
			  divText +='';
			  break;
			case 'finish':
			  divText = '';
			  divText +='';
			  break;
			case 'game':
				divText=" <script type='text/javascript'>$('#memoryGameFrame').width($(window).width() -100);$('#memoryGameFrame').height($(window).height() - 150);</script>";
			  //divText = '<iframe src="memoryGame.htm" scrolling="no"></iframe>'
			  break;
			default:
			divText = '';
			  //divText = "Can\'t determine type";
		}
		return divText;
	}
	
	
	//http://localhost:60279/MidnightMadnessAsp/Service.svc/sendTeamPost/red/1/photo?PostedText=someText&callback=cb
	//sendTeamPost/{teamColor}/{ChallengeId}/{PostType}?PostedText={PostedText}
	function sendTeamPost(PostType,PostedText){
	$.mobile.loading('show');
	//console.log(baseURL + "Service.svc/getSplash/" + window.localStorage.getItem('teamColor') + "?callback=cb");
	postText = encodeURIComponent(PostedText);
	uri = "PostedText=" + postText;
		try{
		playerId = window.localStorage.getItem('PlayerId');
		teamColor = window.localStorage.getItem('teamColor');
		challengeId = window.localStorage.getItem('CHALLENGE_ID');
		url = baseURL + "Service.svc/sendTeamPost/" + playerId + "/" + teamColor + "/" + challengeId + "/" + PostType + "?" + uri + "&callback=cb";
		$.post(url);			
		}
		catch(ex){
		 console.log(ex.message);
		}
	$.mobile.loading('hide');
	}	
	
	function sendTeamPicPost(PostType,PostedText,PostOrder){
	//http://localhost:60279/MidnightMadnessAsp/Service.svc/sendTeamPicPost/pic|123456789452/9?PostedText=someText&callback=cb
	$.mobile.loading('show');
	
	postText = encodeURIComponent(PostedText);
	uri = "PostedText=" + postText;
	console.log(baseURL + "Service.svc/sendTeamPicPost/" + PostType + "/" + PostOrder + "?" + uri + "&callback=cb");
		try{
		url = baseURL + "Service.svc/sendTeamPicPost/" + PostType + "/" + PostOrder + "?" + uri + "&callback=cb";
		$.post(url);			
		}
		catch(ex){
		 console.log(ex.message);		
		}
	$.mobile.loading('hide');
	}		
	
	function updateLocation(){
	try{
		function onGPSSuccess(position) {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			PlayerId = window.localStorage.getItem('PlayerId');
			url = baseURL + "Service.svc/updateLocation/" + PlayerId +  "/" + lat + "/" + lon + "?callback=cb";
			$.post(url);	

		};
		function onGPSError(error) {
		  console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
		}
				
		navigator.geolocation.getCurrentPosition(onGPSSuccess, onGPSError);	
		}catch(e){
			authLog(e.message);
			mainLog(e.message);
		}	
	}	

	
	
//window.localStorage.setItem('guessCount',1);
//window.localStorage.getItem(key);
//window.localStorage.removeItem('guessCount');
/******************* BUTTON CLICKS ****DYNAMIC BUTTONS*******************/
	function codeClick(){ // ANSWER CODE SUBMIT
	//clearAll();
		window.localStorage.setItem('guessCount', parseInt(window.localStorage.getItem('guessCount'))+1)
		var lbl = document.getElementById('labelErrorCode');
		response = "<b>Wrong</b> " + incrimentedMessage();
		code = getChallengeItem("CHALLENGE_ANSWER_CD");
		txt = $("#txtCode").val();		
			$("#labelErrorCode").attr("style","color: #C80000;");
			if(code == txt || txt.toLowerCase() == 'seek'){
				gotoCorrect();
				//$("#labelErrorCode").attr("style","color: green");
				//response = "<b class='blink'>Correct!!!</b>";	
				
				//$("divCode").effect("pulsate", { times:15 }, 2000);		
				//$("divCode").stop().css("background-color", "#FFFF9C").animate({ backgroundColor: "#FFFFFF"}, 1500);
				//$("#divCode").show('highlight',{color: '#C8FB5E'},'fast');
			}else{
			if(txt == ""){response = "<b>Wrong</b><br />[blank] ain\'t the answer... type something in the box"}
			lbl.innerHTML = response;
			}
			
		
		$("#txtCode").val("");
	}


	function incrimentedMessage(){
	
		if(window.localStorage.getItem("guessCount")=== null){window.localStorage.setItem('guessCount',0);};//reset guesses if none exist		
		msg = "";
		switch(parseInt(window.localStorage.getItem('guessCount'))){
			case 4:			
			  msg = '<br />stop blindly guessing and think!!!!!';
			  break;
			case 5:
			  msg = '<br />come on...  you\'re better than this';
			  break;
			case 6:
			  msg = '<br />hmmmmm!';
			  break;
			case 10:
			  msg = '<br />dude - there\'s no extra credit for the amount of bad guesses ';
			  break;
			case 11:
			  msg = '<br />::::sigh::::';
			  break;
			case 12:
			  msg = '<br />what!... "' + $("#txtCode").val() + '" ??? <br/> what kind of guess is that? ... dude you\'re not even trying at this point';
			  break;	
			case 20:
			  msg = '<br />wholy crap!!!!! maybe it\'s time to give up yo!';
			  break;
			case 50:
			  msg = '<br />I wanna be an airborne ranger';
			  break;			  
			case 51:
			  msg = '<br />I wanna live the life of danger....  you are very very bad at this';
			  break;			  
			default:
			  msg = "";
		}
		return msg
	}
	
	function clearAll(){
	//alert("clearing");	
		$("#txtCode").val("");
		$("#labelErrorCode").html("");
	}
	
	function setPageThemes(theme){
		
		//set the main page ONLY at the top level
		var pg = document.getElementById('main'); pg.setAttribute('class', 'page-content ui-page ui-page-theme-' + theme + ' ui-page-footer-fixed ui-page-active');
		var elements = document.getElementsByTagName('div');
		
		//change all other page themes
		for (var i=0; i<elements.length; i++) {
		//console.log(elements[i].getAttribute("data-role"));
			if(elements[i].getAttribute("data-role") == 'page'){
			elements[i].setAttribute('data-theme', theme);
			//console.log(elements[i].id);
			//$("#" + elements[i].id).trigger('create');
			//$("body").trigger('create');
			
			}

		}	
	}
	
	function updateChallengeStatus(isComplete){
	//http://localhost:60279/MidnightMadnessAsp/Service.svc/updateCurrentChallenge/red/1/1?callback=cb
	console.log(baseURL + "Service.svc/updateCurrentChallenge/" + window.localStorage.getItem('teamColor') + "/" + window.localStorage.getItem('CHALLENGE_ID') + "/" + isComplete +"?callback=cb")
		try{
			$.ajax({
			
				crossDomain: true,
				type:"GET",
				contentType: "application/json; charset=utf-8",
				async:false,
				url: baseURL + "Service.svc/updateCurrentChallenge/" + window.localStorage.getItem('teamColor') + "/" + window.localStorage.getItem('CHALLENGE_ID') + "/" + isComplete +"?callback=cb",
				dataType: "jsonp",                
				success: function (response) {	
				window.localStorage.setItem('challengeJson', response);	
						$("#HeaderText").html(response.getSplashResult);
						if(isComplete) getCurrentChallenge();
			  },
			  error: function (xhr, ajaxOptions, thrownError) {
					console.log('err status:' + xhr.status);
					console.log(thrownError);
			  }		
			});
			
		}
		catch(ex){
		div.innerHTML += '<br />begin catch()';
		
		}
	}
	
	function goToAuth(teamName,teamTheme,password,color){
	$('#lblTeamName').html(teamName);
	window.localStorage.setItem('team',teamName); 
	window.localStorage.setItem('theme',teamTheme); 
	window.localStorage.setItem('password',password);
	window.localStorage.setItem('teamColor',color);
	$.mobile.changePage("#auth");
	}
	
	function setTeam(){
		//window.localStorage.setItem('theme',teamTheme);  
		//window.localStorage.setItem('team', teamName);			
		setPageThemes(window.localStorage.getItem('theme'));
		getSplash();
		setTimeout(function(){$.mobile.changePage('#main', { transition: "fade"});},300);
	}
	
	function onSnapPhotoSuccess(imageData) {
      var smallImage = document.getElementById('thumbnailPic');
      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
	  //smallImage.src = imageData;
	  //$("#txtImage").val(imageData);
	  $("#divPhoto").css("visibility","visible");
	  window.localStorage.setItem("imageData",imageData);
	  //consoleLog(imageData);
    }
	function onSnapPhotoFail(message){
		navigator.notification.alert('getPicture Failed because: ' + message);
		//consoleLog('onSnapPhotoFail: ' + message);
	}
	function snapPhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
	  
	  if(device.platform != null && device.platform !== undefined){
      navigator.camera.getPicture(onSnapPhotoSuccess, onSnapPhotoFail, { 
		quality: 45,
		destinationType: destinationType.DATA_URL,
		//destinationType: destinationType.FILE_URI,
		sourceType : Camera.PictureSourceType.CAMERA,
		encodingType: Camera.EncodingType.JPEG,
		targetWidth: 800,
		targetHeight: 600,
		saveToPhotoAlbum: false
		}); 

	}else{
	  alert("sorry.. camera not available in web version \n\n get one of your homies with the app installed \n to take the pic");
	}
	
    }
	
	


 function sendPhoto(){
 $.mobile.loading('show');
 //$('#btnSendPhoto').css("visibility","hidden");
	key = 'pic|' + Math.random().toString().replace("0.","");
	s = $("#thumbnailPic").attr("src");
	seg = 2500;
	numSegs = parseInt(s.length/seg);
	segIndex = parseInt(seg);
	stringToSend = "";
	sendTeamPost(key,''); //add single entry to the TeamPosts table
	//setTimeout(function(){},500)
		
		try{
			if (numSegs > 0){ 
				for (i=0; i <= numSegs; i++){
					
						if(i != numSegs){
						stringToSend = s.slice(segIndex * i,segIndex * (i+1));
						//logging////consoleLog("next: " + i + " | " + (segIndex * i) + " (begins: " + stringToSend.substring(0,6) + ")");
						}else{
						stringToSend = s.slice(segIndex * i); //last one - get all remaining data
						//logging////consoleLog("last:" + i + " | " + (segIndex * i) + " (begins: " + stringToSend.substring(0,6) + ")");
						
						var smallImage = document.getElementById('thumbnailPic');
						var divPhoto = document.getElementById('divPhoto');
						
						if(device.platform){
						navigator.notification.alert("picture successfully sent!!! \n photo is being reviewed...\n\n Wait here on \"main\" for Approval from the Command Center",changePageLeft("main"),"SUCCESS!!!","ok");
						//logging////navigator.notification.alert("picture successfully sent!!! \n photo is being reviewed...\n\n Wait here on \"main\" for Approval from the Command Center",null,"SUCCESS!!!","ok")
						}else{
						alert("picture successfully sent!!! \n photo is being reviewed...\n\n Wait on \"main\" for Approval from the Command Center");
						changePageLeft("main");
						}
						consoleLog("picture successfully sent!!! <br /> Now Go To \"main\" and Wait for Approval <br /> from the Command Center");
						
						}
						sleep(170);// pause so godaddy doesn't fail
						sendTeamPicPost(key,stringToSend,i);					
						
					}
				}
			}catch(e){
			alert(e.message);
			}
	//$('#btnSendPhoto').css("visibility","visible");		
	$.mobile.loading('hide');	
		
}



function myLatLon(){
		function onGPSSuccess(position) {
				console.log('Latitude: '          + position.coords.latitude);
					  console.log('Longitude: '         + position.coords.longitude);
				
				return position.coords.latitude + "|" + position.coords.longitude;
		};

	// onError Callback receives a PositionError object
	//
		function onGPSError(error) {
		  console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
		  return "0|0";
		}
		
	navigator.geolocation.getCurrentPosition(onGPSSuccess, onGPSError);
}
		
function sleep(miliseconds) {
           var currentTime = new Date().getTime();

           while (currentTime + miliseconds >= new Date().getTime()) {
           }
       }

	




