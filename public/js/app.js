// var weatherApi = "/weather";
// const weatherForm = document.querySelector("form");

// const search = document.querySelector("input");

// const weatherIcon = document.querySelector(".weatherIcon i");

// const weatherCondition = document.querySelector(".weatherCondition");

// const tempElement = document.querySelector(".temperature span");

// const locationElement = document.querySelector(".place");

// const dateElement = document.querySelector(".date");
// const currentDate = new Date();
// const options = { month: "long" };
// const monthName = currentDate.toLocaleString("en-US", options);
// dateElement.textContent = new Date().getDate() + ", " + monthName;

// weatherForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   //   console.log(search.value);
//   locationElement.textContent = "Loading...";
//   weatherIcon.className = "";
//   tempElement.textContent = "";
//   weatherCondition.textContent = "";

//   showData(search.value);
// });

// if ("geolocation" in navigator) {
//   locationElement.textContent = "Loading...";
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;
//       const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

//       fetch(apiUrl)
//         .then((response) => response.json())
//         .then((data) => {
//           if (data && data.address && data.address.city) {
//             const city = data.address.city;

//             showData(city);
//           } else {
//             console.error("City not found in location data.");
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching location data:", error);
//         });
//     },
//     function (error) {
//       console.error("Error getting location:", error.message);
//     }
//   );
// } else {
//   console.error("Geolocation is not available in this browser.");
// }

// function showData(city) {
//   getWeatherData(city, (result) => {
  
//     if (result.cod == 200) {
//       if (
//         result.weather[0].description == "rain" ||
//         result.weather[0].description == "fog"
//       ) {
//         weatherIcon.className = "wi wi-day-" + result.description;
//       } else {
//         weatherIcon.className = "wi wi-day-cloudy";
//       }
//       locationElement.textContent = result?.name;
//       tempElement.textContent =
//         (result?.main?.temp - 273.5).toFixed(2) + String.fromCharCode(176);
//       weatherCondition.textContent =
//         result?.weather[0]?.description?.toUpperCase();
//     } else {
//       locationElement.textContent = "City not found.";
//     }
//   });
// }

// function getWeatherData(city, callback) {
//   const locationApi = weatherApi + "?address=" + city;
//   fetch(locationApi).then((response) => {
//     response.json().then((response) => {
//       callback(response);
//     });
//   });
// }


// Base API endpoint for weather (handled by your backend)
var weatherApi = "/weather";

// DOM Elements
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");
const tempElement = document.querySelector(".temperature span");
const locationElement = document.querySelector(".place");
const dateElement = document.querySelector(".date");

// Set current date
const currentDate = new Date();
const options = { month: "long" };
const monthName = currentDate.toLocaleString("en-US", options);
dateElement.textContent = new Date().getDate() + ", " + monthName;

// Handle form submit
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  locationElement.textContent = "Loading...";
  weatherIcon.className = "";
  tempElement.textContent = "";
  weatherCondition.textContent = "";

  showData(search.value);
});

// Get user location automatically
if ("geolocation" in navigator) {
  locationElement.textContent = "Loading...";
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.address) {
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.county;
            if (city) {
              showData(city);
            } else {
              console.error("City not found in location data.");
              locationElement.textContent = "Unable to detect city.";
            }
          } else {
            console.error("Invalid location data.");
            locationElement.textContent = "Unable to detect city.";
          }
        })
        .catch((error) => {
          console.error("Error fetching location data:", error);
          locationElement.textContent = "Unable to detect city.";
        });
    },
    function (error) {
      console.error("Error getting location:", error.message);
      locationElement.textContent = "Location access denied.";
    }
  );
} else {
  console.error("Geolocation is not available in this browser.");
  locationElement.textContent = "Geolocation not supported.";
}

// Fetch and display weather data
function showData(city) {
  getWeatherData(city, (result) => {
    if (result.cod == 200) {
      const weatherType = result.weather[0].main.toLowerCase();
      const iconMap = {
        clear: "wi-day-sunny",
        clouds: "wi-day-cloudy",
        rain: "wi-day-rain",
        fog: "wi-day-fog",
        snow: "wi-day-snow",
        haze: "wi-day-haze",
        drizzle: "wi-day-showers",
        thunderstorm: "wi-day-thunderstorm"
      };

      weatherIcon.className = "wi " + (iconMap[weatherType] || "wi-day-cloudy");

      locationElement.textContent = result.name;
      tempElement.textContent =
        (result.main.temp - 273.15).toFixed(2) + "°";
      weatherCondition.textContent =
        result.weather[0].description.toUpperCase();
    } else {
      locationElement.textContent = "City not found.";
      tempElement.textContent = "";
      weatherCondition.textContent = "";
      weatherIcon.className = "wi wi-na";
    }
  });
}

// Function to call backend API
function getWeatherData(city, callback) {
  const locationApi = weatherApi + "?address=" + encodeURIComponent(city);
  fetch(locationApi)
    .then((res) => res.json())
    .then((data) => callback(data))
    .catch((err) => {
      console.error("Error fetching weather:", err);
      locationElement.textContent = "Error fetching weather data.";
    });
}
