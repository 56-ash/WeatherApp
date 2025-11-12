Features

Fetches live weather data using OpenWeatherMap API

Displays temperature, humidity, and weather conditions

User-friendly interface with dynamic updates

Error handling for invalid city names

Responsive front-end using Handlebars (hbs)

🛠️ Technologies Used

Node.js

Express.js

Handlebars (hbs)

HTML, CSS, JavaScript

OpenWeatherMap API

⚙️ Installation & Setup

Clone the repository

git clone https://github.com/your-username/weather-app.git


Navigate to the project folder

cd weather-app


Install dependencies

npm install


Add your OpenWeatherMap API Key

Open utils/weatherData.js

Replace the placeholder with your actual API key:

const openWeatherMap = {
  BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
  SECRET_KEY: "YOUR_API_KEY_HERE",
};


Start the server

npm start


or

node src/app.js


Open in browser

http://localhost:3000

📸 Screenshots

(Add screenshots of your app’s UI here — e.g. homepage, results page)

![Weather App Screenshot](images/screenshot.png)

💡 Example

Search: London
Output:

City: London  
Temperature: 15°C  
Condition: Cloudy  
Humidity: 68%

🧩 Folder Structure
weather-app/
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── src/
│   ├── app.js
│   └── utils/
│       └── weatherData.js
│
├── templates/
│   ├── views/
│   └── partials/
│
├── package.json
└── README.md

🐞 Troubleshooting

Error: Missing parameter name or invalid path
→ Check if your routes are correctly defined in app.js

Weather not loading
→ Make sure your API key is valid and internet connection is active
