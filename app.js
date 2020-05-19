const apiKey = `0fc73a1ffced9111b9e2a4e94bb3eb58`;


navigator.geolocation.getCurrentPosition(position => {
  console.log(position.coords.latitude, position.coords.longitude);

  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Invalid search input. Please try again.");
      }
    })
    .then(json => {
      console.log(json);
      console.log(json.main.feels_like);
      console.log(json.weather[0].description);

    });
});