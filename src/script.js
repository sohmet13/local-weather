import $ from 'jquery';

import '../node_modules/weathericons/font/weathericons-regular-webfont.eot';
import '../node_modules/weathericons/font/weathericons-regular-webfont.svg';
import '../node_modules/weathericons/font/weathericons-regular-webfont.ttf';
import '../node_modules/weathericons/font/weathericons-regular-webfont.woff';
import '../node_modules/weathericons/font/weathericons-regular-webfont.woff2';
import '../node_modules/weathericons/sass/weather-icons.min.scss';

import './style.sass';

$(document).ready(function() {
	var celcius, fahrenheit;
  //вычисляем координаты
    if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
	    let url = 'https://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude +'&lon=' +position.coords.longitude+'&APPID=ca840eee26ce8ed1cb4ecd5aed2c7a5e';
	    getWeather(url);
	  });
	} else {
		console.log("Geolocation is not supported by this browser.");
		alert("Geolocation is not supported by this browser.");
	}
	//добавление weather-icons
	function icons(weather) {
			let prefix = 'wi wi-';
		 	let code = weather.weather[0].id;
		    let icon = weatherIcons[code].icon; //переменная weatherIcons находится в локальном файле, файл привязан к index.html
			//отделяем иконки дня от ночи
			let today = new Date();
			let hour = today.getHours();
			(hour < 0 && hour > 6) ?  icon = "night-"+icon: icon ="day-"+icon;
			return prefix + icon;
	}
	//отображение получаемой информации на экране
	function UI (place, temp, icon) {
		$('#place').html(place);
		$('#temp').html(temp);
		$('a').html('C');
		$('#icon').addClass(icon);
	}
	// делаем запрос на сайт с погодой
	function getWeather (url) {
	   $.getJSON( url, function(data) {
		      celcius = data.main.temp-273.15;
			  fahrenheit = celcius*(9/5) + 32;
		      let place = data.name +', '+data.sys.country;
			  let temp = celcius.toFixed(1) + '&deg';
			  UI(place, temp, icons (data));
		});
	};
	 // кликаем на цельсий для фаренгейта и наоборот
	 $('a').on('click', function(e){
		 e.preventDefault();
		 if ($('a').text() === 'C') {
       $('#temp').html(fahrenheit.toFixed(1)+ '&deg');
       $('a').html('F');
		 } else {
		   $('#temp').html(celcius.toFixed(1)+ '&deg');
		   $('a').html('C');
		 }
	});
});
