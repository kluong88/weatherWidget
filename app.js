const apiKey = `0fc73a1ffced9111b9e2a4e94bb3eb58`;
const currentConditions = document.querySelector(`.current-conditions`);

navigator.geolocation.getCurrentPosition(position => {
  getCurrentConditions(position.coords.latitude, position.coords.longitude);
  getForecast(position.coords.latitude, position.coords.longitude);
});

function getCurrentConditions(latitude, longitude) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Invalid search input. Please try again.");
      }
    })
    .then(currentConditionsResults => {
      currentConditions.innerHTML = `
      <h2>Current Conditions</h2>
      <img src="http://openweathermap.org/img/wn/${currentConditionsResults.weather[0].icon}@2x.png" />
      <div class="current">
        <div class="temp">${Math.ceil(currentConditionsResults.main.temp)}℃</div>
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
        throw new Error("Invalid search input. Please try again.");
      }
    })
    .then(forecastResults => {
      console.log(forecastResults.list);
      getDailyForecast(forecastResults.list, 8);

      forecastResults.list.forEach(results => {})
    })
}

function getDailyForecast(array, size) {
  const dailyForecastArr = [];
  for (let x = 0; x < array.length; x++) {
    const last = dailyForecastArr[dailyForecastArr.length - 1];
    if (!last || last.length === size) {
      dailyForecastArr.push([array[x]]);
    } else {
      last.push(array[x]);
    }
  }
  console.log(dailyForecastArr);
  dailyForecastArr.forEach(dailyCondition => {
    console.log(dailyCondition[3].weather[0].description);
  })


  console.log(dailyForecastArr[0][3].weather[0].description);
}