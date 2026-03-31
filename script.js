  async function getWeather() {
      const cityInput = document.getElementById("city").value.trim();
      const weatherDiv = document.getElementById("weather");

      if (!cityInput) {
        weatherDiv.innerHTML = "Please enter a city!";
        weatherDiv.classList.remove("show");
        return;
      }

      weatherDiv.innerHTML = "Loading...";
      weatherDiv.classList.remove("show");

      const apiKey = "ad991800b6fb84eefbfa963226507d3f"; // <-- Replace with your actual OpenWeatherMap API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityInput)}&appid=${apiKey}&units=metric`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) {
          weatherDiv.innerHTML = "City not found 😢";
          weatherDiv.classList.add("show");
          return;
        }

        weatherDiv.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p class="temp">🌡️ ${data.main.temp} °C</p>
          <p>Condition: ${data.weather[0].description}</p>
          <img class="icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" />
        `;
        setTimeout(() => weatherDiv.classList.add("show"), 50);

      } catch (error) {
        weatherDiv.innerHTML = "API issue 😢 (check your key or network)";
        weatherDiv.classList.add("show");
        console.error(error);
      }
    }