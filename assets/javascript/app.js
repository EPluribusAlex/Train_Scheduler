	const TS = {

		config: {
	    apiKey: "AIzaSyDfLnjaleh0rKM9SZ8bnQi6DeLPzEkEjRA",
	    authDomain: "class-practice-b9337.firebaseapp.com",
	    databaseURL: "https://class-practice-b9337.firebaseio.com",
	    projectId: "class-practice-b9337",
	    storageBucket: "class-practice-b9337.appspot.com",
	    messagingSenderId: "53248747928"
	  },

	  uiConfig: {
    	signInSuccessUrl: '<url-to-redirect-to-on-success>',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>'
    },

	  get ref() {

	  	return firebase.database().ref("trains");

	  },

	  signIn: function() {
    
	    // Initialize the FirebaseUI Widget using Firebase.
	    var ui = new firebaseui.auth.AuthUI(firebase.auth());
	    // The start method will wait until the DOM is loaded.
	    ui.start("#firebaseui-auth-container", TS.uiConfig);

	  },

	  ready: function() {

	  	firebase.initializeApp(TS.config);

	  	TS.signIn();

	 		TS.dataListen();

	  	$("#input_btn").on("click", function(event) { 

	  		event.preventDefault();

	  		TS.submit(); 	

	  	});

	  },

	  dataListen: function() {

	  	TS.ref.on("value", function(snapshot) {

	  		let a = [];

	  		snapshot.forEach(function(childSnap) {
	  			a.push(childSnap.val());
	  		});

	  		TS.display(a);

	  	}, function(err) {
	  		console.log(err, "Read failed");
	  	});

	  },

	  display: function(arr) {

	  	console.log(arr, "Firebase Data");

	  	$("#add_trains").empty();

	  	arr.forEach(function(entry) {

	  		const tInfo = TS.calcTime(entry);

	  		let tr = $("<tr>"),
	  				th1 = $("<th>").text(entry.name),
	  				th2 = $("<th>").text(entry.dest),
	  				th3 = $("<th>").text(entry.freq),
	  				th4 = $("<th>").text(tInfo.nextT),
	  				th5 = $("<th>").text(tInfo.waitT);

	  		tr.append(th1).append(th2).append(th3).append(th4).append(th5);

	  		$("#add_trains").append(tr);

	  	});

	  },

	  submit: function() {

	  	const name = $("#input1").val().trim(),
		  			dest = $("#input2").val().trim(),
		  			firstTime = $("#input3").val().trim(),
		  			freq = $("#input4").val().trim(); 

	  	if(name && dest && firstTime && freq) {

		  	TS.ref.push({
		  		name: name,
		  		dest: dest,
		  		firstTime: firstTime,
		  		freq: freq
		  	});

		  	$("#input1").val("");
		  	$("#input2").val("");
		  	$("#input3").val("");
		  	$("#input4").val("");

		  }

		  else {
		  	console.log("Incomplete fields");
		  }

	  },

	  calcTime: function(obj) {

	  	let t;

	  	const timeDist = moment(obj.firstTime, "HHmm").diff(moment(), "minutes");

	  	console.log(timeDist, "min till first train");

	  	if(Math.sign(timeDist) === -1) {

	  		let newTimeDist = timeDist;

	  		while(Math.sign(newTimeDist) === -1) {

	  			newTimeDist = newTimeDist + parseInt(obj.freq);

	  		}

	  		t = newTimeDist;

	  	}

	  	else {

	  		t = timeDist;

	  	}

	  	console.log(t, "min till next train");
	  	
	  	return {
	  		nextT: moment().add(t, "minutes").format("HHmm").toString(),
	  		waitT: t.toString()
	  	};

	  }

	};

$(document).ready(function() { TS.ready(); });
