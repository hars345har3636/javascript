const apiKey = '54b8d378b11a6e5a110664e41bf669bc'; 
const defaultCity = 'Delhi';

document.getElementById('search-btn').addEventListener('click', fetchWeather);

function fetchWeather() {
    const city = document.getElementById('city-input').value || defaultCity;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            displayForecastChart(data);
        })
        .catch(error => alert('Error fetching weather data: ' + error.message));
}

function displayWeather(data) {
    const location = data.city.name + ', ' + data.city.country;
    const dateTime = new Date().toLocaleString();
    const currentWeather = `Temperature: ${data.list[0].main.temp}°C, ${data.list[0].weather[0].description}`;

    document.getElementById('location').textContent = location;
    document.getElementById('date-time').textContent = dateTime;
    document.getElementById('current-weather').textContent = currentWeather;
}

function displayForecastChart(data) {
    const labels = data.list.map(entry => new Date(entry.dt * 1000).toLocaleDateString());
    const temperatures = data.list.map(entry => entry.main.temp);

    const ctx = document.getElementById('forecast-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                }
            }
        }
    });
}

// Fetch default weather on load
fetchWeather();