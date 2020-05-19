const apiKey = `0fc73a1ffced9111b9e2a4e94bb3eb58`;
const currentConditions = document.querySelector(`.current-conditions`);



navigator.geolocation.getCurrentPosition(position => {
  console.log(position.coords.latitude, position.coords.longitude);
  getCurrentConditions(position.coords.latitude, position.coords.longitude);
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
        <div class="temp">${Math.ceil(currentConditionsResults.main.feels_like)}℃</div>
        <div class="condition">${currentConditionsResults.weather[0].description}</div>
      `
    });
}