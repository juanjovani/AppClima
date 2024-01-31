const APIKEY = 'd010b248f422a7e820b49f55faf2c707';
    const URLBASE = 'https://api.openweathermap.org/data/2.5/weather?';

    async function request(url) {
      return fetch(url).then(result => result.json());
    }

    async function getClima(lat, lon) {
      const url = `${URLBASE}lat=${lat}&lon=${lon}&appid=${APIKEY}`;
      const data = await request(url);
      console.log("Temperatura: ", data.main.temp);
      console.log("Ciudad: ", data.name);
      updateDOM(data.main.temp, data.name);
    }

    function updateDOM(temperature, city) {
      // Supongamos que tienes elementos con los IDs "temperatura" y "city" en tu HTML
      const temperatureElement = document.getElementById('temperatura');
      const cityElement = document.getElementById('city');

      // Actualiza el contenido de los elementos con la información del clima
      temperatureElement.textContent = `Temperatura: ${temperature}`;
      cityElement.textContent = `Ciudad: ${city}`;

      // Cambia el color dependiendo de la temperatura
      if (temperature > 25) {
        temperatureElement.style.color = 'red';
      } else if (temperature < 10) {
        temperatureElement.style.color = 'blue';
      } else {
        temperatureElement.style.color = 'black';
      }
    }

    navigator.geolocation.getCurrentPosition(positions => {
      const lat = positions.coords.latitude;
      const lon = positions.coords.longitude;
      getClima(lat, lon);
    });