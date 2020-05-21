const apiKey = `0fc73a1ffced9111b9e2a4e94bb3eb58`;
const currentConditionsEle = document.querySelector(`.current-conditions`);
const forecastEle = document.querySelectorAll(`.day`);
let date = new Date();
let currentDay = date.getDay();

navigator.geolocation.getCurrentPosition(position => {
  getCurrentConditions(position.coords.latitude, position.coords.longitude);
  fetchForecast(position.coords.latitude, position.coords.longitude);
});

function getCurrentConditions(latitude, longitude) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An error occured. Please try again!");
      }
    })
    .then(currentConditionsResults => {
      currentConditionsEle.innerHTML = `
      <h2>Current Conditions</h2>
      <img src="http://openweathermap.org/img/wn/${currentConditionsResults.weather[0].icon}@2x.png" />
      <div class="current">
        <div class="temp">${Math.floor(currentConditionsResults.main.temp)}℃</div>
        <div class="condition">${currentConditionsResults.weather[0].description}</div>
      `
    });
};

function fetchForecast(latitude, longitude) {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An error occured. Please try again!");
      }
    })
    .then(forecastResults => {
      filterForecastData(forecastResults.list);
    });
};

function filterForecastData(forecastResults) {
  let filteredForecastArr = [];
  let dateArray = [];

  forecastResults.forEach(timeStamp => {
    timeStampDate = new Date(timeStamp.dt_txt);
    timeStamp.weekday = new Date(timeStamp.dt_txt).toLocaleString('en-us', { weekday: 'long' });
    timeStamp.weekCode = timeStampDate.getDay();
  });

  filteredForecastArr = forecastResults.filter(timeStamp => timeStamp.weekCode != currentDay);

  dateArray = filteredForecastArr.reduce(function(week, forecast) {
    if (week[forecast.weekCode] === undefined) {
      week[forecast.weekCode] = [];
      week[forecast.weekCode].push({
        // dt_txt: forecast.dt_txt,
        weekday: forecast.weekday,
        weekCode: forecast.weekCode,
        max_temp: forecast.main.temp_max,
        min_temp: forecast.main.temp_min,
        description: forecast.weather[0].description,
        icon: forecast.weather[0].icon,
      })
    } else
      week[forecast.weekCode].push({
        // dt_txt: forecast.dt_txt,
        weekday: forecast.weekday,
        weekCode: forecast.weekCode,
        max_temp: forecast.main.temp_max,
        min_temp: forecast.main.temp_min,
        description: forecast.weather[0].description,
        icon: forecast.weather[0].icon,
      })

    return week;
  }, {

  });

  updateForecast(dateArray);
};

function updateForecast(dailyForecast) {

  console.log(dailyForecast)

  let arrayKey = Object.keys(dailyForecast);


  for (let x = 0; x < arrayKey.length; x++) {
    let maxTemp = 0;
    let minTemp = 0;

    dailyForecast[arrayKey[x]].forEach(data => {
      if (data.max_temp > maxTemp) {
        maxTemp = data.max_temp;
      } else if (data.min_temp > minTemp) {
        minTemp = data.min_temp;
      }
    });
    console.log(maxTemp)
    console.log(minTemp)
  }
  let nextForecast = currentDay + 1;

  for (let x = 0; x < forecastEle.length; x++) {
    forecastEle[x].innerHTML = `
          <h3>${dailyForecast[arrayKey[nextForecast]][0].weekday}</h3>
          <img src="http://openweathermap.org/img/wn/${dailyForecast[0][0].icon}@2x.png" />
          <div class="description">${dailyForecast[0][0].description}</div>
          <div class="temp">
            <span class="high">11℃</span>/<span class="low">-3℃</span>
          </div>
`
  }
}