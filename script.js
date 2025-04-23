    // Replace with your actual API key
    const apiKey = 'fd5a71f1a9mshda9c430bfa58a60p191068jsn19317e5ebbb0';

    // Function to fetch and display weather data for a given city
    async function fetchWeather(city, elementId) {
      const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(city)}`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
      };
    
      try {
        const response = await fetch(url, options);
        const result = await response.json();
    
        // Extract relevant data
        const name=result.location.name;
        const localtime=result.location.localtime;
        const timezone=result.location.tz_id;
        const region=result.location.region;
        const country=result.location.country;
        const temperature = result.current.temp_c;
        const condition = result.current.condition.text;
        const humidity = result.current.humidity;
        const windSpeed = result.current.wind_kph;
        const iconPath = result.current.condition.icon;
        const iconUrl = `https:${iconPath}`;
    
    
        // Construct HTML content
        const weatherInfo = `
          <h2>${city}</h2>
          <img src="${iconUrl}" alt="${condition}" />
          <p><strong>Region:</strong> ${region}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Time Zone:</strong> ${timezone}</p>
          <p><strong>Local Time:</strong> ${localtime}</p>
          <p><strong>Temperature:</strong> ${temperature}°C</p>
          <p><strong>Condition:</strong> ${condition}</p>
          <p><strong>Humidity:</strong> ${humidity}%</p>
          <p><strong>Wind Speed:</strong> ${windSpeed} kph</p>
    
        `;
    
        // Update the corresponding weather card
        document.getElementById(elementId).innerHTML = weatherInfo;
      } catch (error) {
        console.error(`Error fetching weather data for ${city}:`, error);
        document.getElementById(elementId).innerHTML = `<h2>${city}</h2><p>Error fetching data.</p>`;
      }
    }
    
    // Event listener for the search form
    document.getElementById('searchForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const city = document.getElementById('searchInput').value.trim();
      if (city) {
        fetchWeather(city, 'searchResult');
      }
    });
    
    // Fetch weather data for predefined cities on page load
    window.addEventListener('DOMContentLoaded', () => {
      fetchWeather('Kolkata', 'city1');
      fetchWeather('Bengaluru', 'city2');
      fetchWeather('Tokyo', 'city3');
    });
    document.getElementById('currentLocationBtn').addEventListener('click', function(e) {
      e.preventDefault();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchWeather(`${lat},${lon}`, 'searchResult');
        }, (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch location. Please allow location access.");
        });
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    });
    