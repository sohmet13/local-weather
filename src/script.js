import $ from 'jquery';

import '../node_modules/weathericons/font/weathericons-regular-webfont.eot';
import '../node_modules/weathericons/font/weathericons-regular-webfont.svg';
import '../node_modules/weathericons/font/weathericons-regular-webfont.ttf';
import '../node_modules/weathericons/font/weathericons-regular-webfont.woff';
import '../node_modules/weathericons/font/weathericons-regular-webfont.woff2';
import '../node_modules/weathericons/sass/weather-icons.min.scss';

import './style.sass';

let celcius, fahrenheit, iconsData;

$(document).ready(function() {
  //вычисляем координаты
    if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
	    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=ca840eee26ce8ed1cb4ecd5aed2c7a5e`;
	    let weatherIconsUrl = 'https://gist.githubusercontent.com/tbranyen/62d974681dea8ee0caa1/raw/3405bfb2a76b7cbd90fde33d8536f0cd13706955/icons.json';
	    $.getJSON(weatherUrl)
            .done(parseWeatherData)
            .fail(error);
	    $.getJSON(weatherIconsUrl)
            .done((data) => {iconsData = data})
            .fail(error);
	  });
	} else {
		console.error("Geolocation is not supported by this browser.");
		alert("Geolocation is not supported by this browser.");
	}

	 // кликаем на цельсий для фаренгейта и наоборот
	 $('.weather-info__degrees-icon').on('click', function(e){
         e.preventDefault();
		 if ($(this).text() === 'C') {
           $('.weather-info__temperature').html(fahrenheit.toFixed(1)+ '&deg');
           $(this).html('F');
		 } else {
		   $('.weather-info__temperature').html(celcius.toFixed(1)+ '&deg');
		   $(this).html('C');
		 }
	});
});

const parseWeatherData = (data) => {
        celcius = data.main.temp-273.15;
        fahrenheit = (celcius*(9/5) + 32);

        let place = `${data.name}, ${data.sys.country}`;
        let temp = `${celcius.toFixed(1)}&deg`;

        let code = data.weather[0].id;
        let icon = iconsData[code].icon;
        //отделяем иконки дня от ночи
        let hour = new Date().getHours();
        icon = (hour < 0 && hour > 6) ? `night-${icon}` : `day-${icon}`;

        showWeatherInfo(place, temp, `wi wi-${icon}`);
};

//отображение получаемой информации на экране
const showWeatherInfo = (place, temp, icon) => {
    $('.weather-info__place').html(place);
    $('.weather-info__temperature').html(temp);
    $('.weather-info__degrees-icon').html('C');

    $('.weather-info__icon').addClass(icon);
}

const error = (error) => {
    const errorText = `Unfortunately, we couldn't get data about the weather. ${error}`;
    alert(errorText);
    console.error(errorText);
};