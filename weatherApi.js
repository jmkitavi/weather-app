const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=8bab30fa7ae791693fa8966018744a4a'

export const fetchWeather = (lat, lon) => {
  const url = rootUrl + '&lat='+lat+"&lon="+lon+"&units=metric"

  return fetch(url)
    .then(res => res.json())
    .then(json => ({
      temp: json.main.temp,
      weather: json.weather[0].main
    }))
}