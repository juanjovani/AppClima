const APIKEY = 'd010b248f422a7e820b49f55faf2c707';
const URLBASE = 'https://api.openweathermap.org/data/2.5/weather?';

async function request(url) {
    return fetch(url).then(result => result.json());
}

async function getClima(lat, lon) {
    const url = `${URLBASE}lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`; // Agregar "&units=metric" para obtener la temperatura en Celsius
    const data = await request(url);
    console.log("Temperatura: ", data.main.temp);
    console.log("Ciudad: ", data.name);
    updateDOM(data.main.temp, data.name);
}

function updateDOM(temperature, city) {
    const temperatureElement = document.getElementById('temperatura');
    const cityElement = document.getElementById('ciudad');

    temperatureElement.textContent = `${temperature} ºC`; // Mostrar la temperatura con el símbolo ºC
    cityElement.textContent = city;

    // Cambiar el color de fondo dependiendo de la temperatura
    const body = document.body;
    if (temperature > 25) {
        body.style.backgroundColor = 'red';
    } else if (temperature < 10) {
        body.style.backgroundColor = 'blue';
    } else {
        body.style.backgroundColor = 'green';
    }
}

// Agregar listener para el envío del formulario
const locationForm = document.getElementById('locationForm');
locationForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const locationInput = document.getElementById('ciudadInput').value;
    try {
        const locationData = await getLocationData(locationInput);
        getClima(locationData.lat, locationData.lon);
    } catch (error) {
        console.error("Error al obtener la ubicación:", error);
    }
});

async function getLocationData(location) {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${APIKEY}`);
    const data = await response.json();
    if (data.length === 0) {
        throw new Error('No se encontró la ubicación');
    }
    return { lat: data[0].lat, lon: data[0].lon };
}

// Pedir permiso para acceder a la ubicación del usuario
navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getClima(lat, lon);
});