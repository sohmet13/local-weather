function icons(weather) {
			let prefix = 'wi wi-';
		    let icon = weather; 
			let today = new Date();
			let hour = today.getHours();
			(hour > 6 && hour < 20) ?  icon = "day-"+icon:   icon ="night-"+icon;
			return prefix + icon;
	}
test('Проверка получения иконок', function(){
	ok(icons('storm-showers')==='wi wi-day-storm-showers', 'для проверки с 6 утра до 8 вечера')
	ok(icons('storm-showers')==='wi wi-night--storm-showers', 'для проверки с 8 вечера до 6 утра')
})
	function getWeather (url) {
	  $.getJSON(url, function(data) {
		      return true;
		});
	};
asyncTest('Проверка получения данных', function(){
	setTimeout(function() {
		ok(getWeather('https://api.openweathermap.org/data/2.5/weather?lat=55.484301&lon=37.617188&APPID=ca840eee26ce8ed1cb4ecd5aed2c7a5e'), 'Данные успешно получены')
        start();
    }, 1500);
})
