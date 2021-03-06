//get current location
	function setLocation(){
		if (navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
		}
	}
	//set the latitude and the longitude
	function successFunction(position) {
	  var lat = position.coords.latitude;
	  var lng = position.coords.longitude;
	  setConditions(lat, lng);
	}

	//geolocation failed
	function errorFunction() {
	  alert("Geocoder failed");
	}

	//get the weather conditions from the current coordinates
	function setConditions(lat, lng){
		var requestURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid=91f05e4330f6e85cab273b8b1ad8bb71&units=metric",
			request = new XMLHttpRequest();
			request.open('GET', requestURL);
			request.responseType = 'json';
			request.send();
			request.onload = function(){
				var condition = request.response;
				
				//fallback to this if no data
				var myCountry = "N/A",
				myCity = "N/A";
					 
				//value re-assignment if no errors
				myCountry = condition.sys.country;
				myCity = condition.name;
				 
				
				document.getElementById("currentCity").innerHTML = myCity;
				
				setTemp(myCountry, condition);
				setDirection(condition);
				setWind(myCountry, condition);
			}
	}
	
	//Temp
	function setTemp(myCountry, condition){
		
		//fallback
		var mainTemp = "N/A";
		mainTemp = Math.round(condition.main.temp);
		
		//Use Fahrenheit if in these countries
		if(myCountry == "US" || myCountry == "BZ" || myCountry == "PW" || myCountry == "KY" || myCountry == "BS"){
			var fahren ="N/A";
			//Celsius to Fahrenheit conversion
			fahren = Math.round(mainTemp * 1.8) + 32;
			document.getElementById("currentTemp").innerHTML = fahren + "°F";
		}
		//Celsius
		else{
			document.getElementById("currentTemp").innerHTML = mainTemp + "°C";

		}
	}
	//Wind Direction
	function setDirection(condition) {	
		
		var degree = condition.wind.deg;
		
		//fallback
		var windDir = "N/A";
		
		//main cardinals
		if(degree == 0 || degree == 360){
			windDir = "N";
		}
		else if(degree == 90){
			windDir = "E";
		}
		else if(degree == 180){
			windDir = "S";
		}
		else if(degree == 270){
			windDir = "W";
		}
		//sub cardinals
		else if(degree == 45){
			windDir = "NE";
		}
		else if(degree == 135){
			windDir = "SE";
		}
		else if(degree == 225){
			windDir = "SW";
		}
		else if(degree == 315){
			windDir = "NW";
		}
		//sub sub cardinals
		else if(degree > 0 && degree < 45){
			windDir = "NNE";
		}
		else if(degree > 45 && degree < 90){
			windDir = "ENE";
		}
		else if(degree > 90 && degree < 135){
			windDir = "ESE";
		}
		else if(degree > 135 && degree < 180){
			windDir = "SSE";
		}
		else if(degree > 180 && degree < 225){
			windDir = "SSW";
		}
		else if(degree > 225 && degree < 270){
			windDir = "WSW";
		}
		else if(degree > 270 && degree < 315){
			windDir = "WNW";
		}
		else if(degree > 315 && degree < 360){
			windDir = "NNW";
		}
		document.getElementById("compass").innerHTML = windDir;
	}

	//Wind Speed
	
	function setWind(myCountry, condition){
		
		//fallback
		var kmph = "N/A";
		
		//m/s to kmph conversion
		kmph = (condition.wind.speed * 3.6).toFixed(2);
		
		//Use imperial units for these countries
		if(myCountry == "US" || myCountry == "LR" || myCountry == "MM"){
			//fallback
			var mph = "N/A";
			//kmph to mph conversion
			mph = (condition.wind.speed * 2.237).toFixed(2);
			document.getElementById("speed").innerHTML = mph + " mph";
		}
		//Metric
		else{
			document.getElementById("speed").innerHTML = kmph + " kmph";
		}
	}
	setLocation();
