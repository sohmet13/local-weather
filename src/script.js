import $ from 'jquery';

import '../node_modules/weathericons/font/weathericons-regular-webfont.eot';
import '../node_modules/weathericons/font/weathericons-regular-webfont.svg';
import '../node_modules/weathericons/font/weathericons-regular-webfont.ttf';
import '../node_modules/weathericons/font/weathericons-regular-webfont.woff';
import '../node_modules/weathericons/font/weathericons-regular-webfont.woff2';
import '../node_modules/weathericons/sass/weather-icons.min.scss';

import './style.sass';

let celcius, fahrenheit, iconsData, celciusIsShowed = true;

$(document).ready(() => {
  //вычисляем координаты
    if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition((position) => {
	      $.getJSON('https://gist.githubusercontent.com/tbranyen/' +
              '62d974681dea8ee0caa1/raw/3405bfb2a76b7cbd90fde33d8536f0cd13706955/icons.json')
              .done((data) => {iconsData = data})
              .always(() => $.getJSON(`https://api.openweathermap.org/data/2.5/weather?lat=${
                  position.coords.latitude}&lon=${position.coords.longitude}&APPID=ca840eee26ce8ed1cb4ecd5aed2c7a5e`)
                  .done(parseWeatherData)
                  .fail(error)
              );
	  });
	} else {
		console.error("Geolocation is not supported by this browser.");
		alert("Geolocation is not supported by this browser.");
	}

	 // кликаем на цельсий для фаренгейта и наоборот
	 $('.weather-info__degrees-icon').on('click', function(e) {
         e.preventDefault();
         $('.weather-info__temperature').html(`${celciusIsShowed ? fahrenheit : celcius}&deg`);
         $(this).html(celciusIsShowed ? 'F' : 'C');
         celciusIsShowed = !celciusIsShowed;
	});
});

const parseWeatherData = (data) => {
        celcius = (data.main.temp - 273.15).toFixed(1);
        fahrenheit = (celcius * (9/5) + 32).toFixed(1);

        let icon = iconsData ? iconsData[data.weather[0].id].icon : '';
        //отделяем иконки дня от ночи
        const hour = new Date().getHours();
        icon = (hour < 0 && hour > 6) ? `night-${icon}` : `day-${icon}`;

        showWeatherInfo(`${data.name}, ${data.sys.country}`, `wi wi-${icon}`);
};

//отображение получаемой информации на экране
const showWeatherInfo = (place, icon) => {
    $('.weather-info__place').html(place);
    $('.weather-info__temperature').html(`${celcius}&deg`);
    $('.weather-info__degrees-icon').html('C');

    $('.weather-info__icon').addClass(icon);
};

const error = (error) => {
    const errorText = `Unfortunately, we couldn't get data about the weather. ${error.statusText}`;
    alert(errorText);
    console.error(errorText);
};