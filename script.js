var isFarh = true;
var temp = 0;

$(document).ready(function() {

	// Get coordinates
	var lat = 0.0;
	var long = 0.0;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude; 
			long = position.coords.longitude;

			// Get weather from OpenWeatherMap
			var weather_url = "http://api.OpenWeatherMap.org/data/2.5/weather?lat=" +
			            lat + "&lon=" + long + "&APPID=30421fdcce2211f40385a1f3e6ce61b9&callback=?";

			$.getJSON(weather_url, function (data) { 
				console.log(JSON.stringify(data));
				json = data;

				var skies = json["weather"][0]["main"];
				var id = json["weather"][0]["icon"];
				var city = json["name"];
				temp = json["main"]["temp"];

				$(".city-name").html(city);
				$(".coords").html("latitude: " + lat + "<br>longitude: " + long);


				// Use the id to get the icon url
				var iconUrl = "http://openweathermap.org/img/w/"+id+".png";
				var icon_html = "<img src=\"" + iconUrl + "\"><br><p>"+skies+"</p>";

				$(".weather-icon").html(icon_html);

				// Convert to farenheit
				temp = temp * (9/5) - 459.67;
				var temp_str = "" + Math.round(temp) + "&deg F"
				$("#temp-btn").html(temp_str);

			}).fail(function (jqxhr, status, error) { 
				console.log('error', status, error) }
			);
		});
	}


	// When temp clicked, toggle Farenheit/celcius
	$("#temp-btn").click(function() {
		var temp_string = "";
		if (isFarh) {
			// convert to celcius
			temp = (temp - 32) * (5/9);
			isFarh = false;
			temp_str = "" + Math.round(temp) + "&deg C"
		} else {
			// convert to farenheit
			temp = temp * (9/5) + 32;
			isFarh = true;
			temp_str = "" + Math.round(temp) + "&deg F"
		}

		$("#temp-btn").html(temp_str)
	});
});
