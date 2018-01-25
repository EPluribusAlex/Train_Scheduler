	const TS = {

		config: {
	    apiKey: "AIzaSyDfLnjaleh0rKM9SZ8bnQi6DeLPzEkEjRA",
	    authDomain: "class-practice-b9337.firebaseapp.com",
	    databaseURL: "https://class-practice-b9337.firebaseio.com",
	    projectId: "class-practice-b9337",
	    storageBucket: "class-practice-b9337.appspot.com",
	    messagingSenderId: "53248747928"
	  },

	  get ref() {

	  	return firebase.database().ref("trains");

	  },

	  ready: function() {

	  	firebase.initializeApp(TS.config);

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

	  	arr.forEach(function(entry) {

	  		const nextArrive = TS.calcNext(entry),
	  					timeTill = TS.calcTill(entry);

	  		let tr = $("<tr>"),
	  				th1 = $("<th>").text(entry.name),
	  				th2 = $("<th>").text(entry.dest),
	  				th3 = $("<th>").text(entry.freq),
	  				th4 = $("<th>").text(nextArrive),
	  				th5 = $("<th>").text(timeTill);

	  		tr.append(th1).append(th2).append(th3);

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

	  calcNext: function(obj) {

	  	moment.relativeTimeThreshold('m', 1440);

	  	const timeDist = moment(obj.firstTime, "HHmm").fromNow("m");

	  	console.log(obj.firstTime);

	  	console.log(timeDist);

	  },

	  calcTill: function() {



	  }

	};

$(document).ready(function() { TS.ready(); });
