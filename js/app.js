const apiKey = `0fc73a1ffced9111b9e2a4e94bb3eb58`;
const currentConditionsEle = document.querySelector(`.current-conditions`);
const forecastEle = document.querySelectorAll(`.day`);

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
    })
}

function filterForecastData(forecastResults) {

  forecastResults.forEach(timeStamp => {
    timeStamp.dayOfWeek = new Date(timeStamp.dt_txt).toLocaleString('en-us', { weekday: 'long' });
  });

  sortForecastData(forecastResults);
};

function sortForecastData(filteredForecastData) {
  currentDay = new Date().toLocaleString('en-us', { weekday: 'long' });

  let filteredForecastArr = [];
  let dateArray = [];
  let day = [];


  filteredForecastArr = filteredForecastData.filter(timeStamp => timeStamp.dayOfWeek != currentDay);

  filteredForecastArr.forEach(timeStamp => {
    console.log(timeStamp);
    day = [{ day: timeStamp.dayOfWeek }]
  })

  console.log(day);




}




// const weekdays = {
//   0: [],
//   1: [],
//   2: [],
//   3: [],
//   4: [],
//   5: [],
//   6: [],
// }

// filteredForecastData.forEach(timeStamp => {
//   if (timeStamp.dayOfWeek != currentDay) {
//     filteredForecastArr.push(timeStamp);
//   }
// })

// // console.log(filteredForecastArr);

// filteredForecastArr.forEach(timeStamp => {
//   if (timeStamp.dayOfWeek == `Monday`) {
//     weekdays[0].push(timeStamp);
//   } else if (timeStamp.dayOfWeek == `Tuesday`) {
//     weekdays[1].push(timeStamp);
//   } else if (timeStamp.dayOfWeek == `Wednesday`) {
//     weekdays[2].push(timeStamp);
//   } else if (timeStamp.dayOfWeek == `Thursday`) {
//     weekdays[3].push(timeStamp);
//   } else if (timeStamp.dayOfWeek == `Friday`) {
//     weekdays[4].push(timeStamp);
//   } else if (timeStamp.dayOfWeek == `Saturday`) {
//     weekdays[5].push(timeStamp);
//   } else if (timeStamp.dayOfWeek == `Sunday`) {
//     weekdays[6].push(timeStamp);
//   }
// })
// updateForecast(weekdays);




function updateForecast(dailyData) {

  console.log(dailyData);
  let insertCount = 0;
  forecastEle[insertCount].innerHTML = `
          <h3>Tuesday</h3>
          <img src="http://openweathermap.org/img/wn/01d@2x.png" />
          <div class="description">clear sky</div>
          <div class="temp">
            <span class="high">11℃</span>/<span class="low">-3℃</span>
          </div>
`

}

// let temp_maxArr = [];
// let temp_minArr = [];

// for (let x = 0; x < weekdays.monday.length; x++) {

//   temp_maxArr.push(weekdays.monday[x].main.temp_max);
//   temp_minArr.push(weekdays.monday[x].main.temp_min);

//   console.log(`${Math.floor(Math.max(...temp_maxArr))}℃`);
// };