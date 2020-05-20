const apiKey = `0fc73a1ffced9111b9e2a4e94bb3eb58`;
const currentConditions = document.querySelector(`.current-conditions`);
const fiveDayForecast = document.querySelectorAll(`.day`);

navigator.geolocation.getCurrentPosition(position => {
  console.log(position.coords.latitude, position.coords.longitude);
  getCurrentConditions(position.coords.latitude, position.coords.longitude);
  getForecast(position.coords.latitude, position.coords.longitude);
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
      currentConditions.innerHTML = `
      <h2>Current Conditions</h2>
      <img src="http://openweathermap.org/img/wn/${currentConditionsResults.weather[0].icon}@2x.png" />
      <div class="current">
        <div class="temp">${Math.floor(currentConditionsResults.main.temp)}℃</div>
        <div class="condition">${currentConditionsResults.weather[0].description}</div>
      `
    });
}

function getForecast(latitude, longitude) {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An error occured. Please try again!");
      }
    })
    .then(forecastResults => {
      getDailyForecast(forecastResults.list, 8);
    })
}

function getDailyForecast(array, size) {
  const dailyForecastArr = [];
  let dayCount = 0;

  for (let x = 0; x < array.length; x++) {
    const lastDay = dailyForecastArr[dailyForecastArr.length - 1];
    if (!lastDay || lastDay.length === size) {
      dailyForecastArr.push([array[x]]);
    } else {
      lastDay.push(array[x]);
    }

  };
  console.log(dailyForecastArr);


  dailyForecastArr.forEach(dailyCondition => {
    const date = new Date(dailyCondition[0].dt_txt);
    let temp_maxArr = [];
    let temp_minArr = [];

    for (let x = 0; x < dailyCondition.length; x++) {

      temp_maxArr.push(dailyCondition[x].main.temp_max);
      temp_minArr.push(dailyCondition[x].main.temp_min);
    };

    fiveDayForecast[dayCount].innerHTML = `
    <h3>${date.toLocaleString('en-us', { weekday: 'long' })}</h3>
        <img src="http://openweathermap.org/img/wn/${dailyCondition[4].weather[0].icon}@2x.png"/>
        <div class="description">${dailyCondition[4].weather[0].description}</div>
        <div class="temp">
          <span class="high">${Math.floor(Math.max(...temp_maxArr))}℃</span>/<span class="low">${Math.floor(Math.min(...temp_minArr))}℃</span>
        </div>
    `
    dayCount++;
  });
};