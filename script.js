// Функция для получения погоды
async function getWeather() {
    const loadingElement = document.getElementById('loading');
    const weatherInfoElement = document.getElementById('weather-info');
    const errorElement = document.getElementById('error');
    const cityElement = document.querySelector('.city');
    const tempElement = document.querySelector('.temperature');
    const descElement = document.querySelector('.description');
    const iconElement = document.querySelector('.icon');
    const humidityElement = document.getElementById('humidity');
    const windElement = document.getElementById('wind');
    
    // Показываем индикатор загрузки
    loadingElement.classList.remove('hidden');
    weatherInfoElement.classList.add('hidden');
    errorElement.classList.add('hidden');
    
    try {
        // Координаты Санкт-Петербурга
        const lat = 59.9343;
        const lon = 30.3351;
        
        // Используем API Open-Meteo (бесплатно, без регистрации)
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Europe%2FMoscow`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Обновляем данные
        const current = data.current;
        cityElement.textContent = 'Санкт-Петербург';
        tempElement.textContent = `${Math.round(current.temperature_2m)}°C`;
        descElement.textContent = getWeatherDescription(current.weather_code);
        iconElement.textContent = getWeatherIcon(current.weather_code);
        humidityElement.textContent = `Влажность: ${current.relative_humidity_2m}%`;
        windElement.textContent = `Ветер: ${current.wind_speed_10m} м/с`;
        
        // Показываем информацию о погоде
        loadingElement.classList.add('hidden');
        weatherInfoElement.classList.remove('hidden');
        
    } catch (error) {
        console.error('Ошибка получения погоды:', error);
        loadingElement.classList.add('hidden');
        errorElement.classList.remove('hidden');
    }
}

// Функция для переключения темы
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Функция для получения описания погоды по коду
function getWeatherDescription(code) {
    const descriptions = {
        0: "Ясно",
        1: "Преимущественно ясно",
        2: "Частично облачно",
        3: "Облачно",
        45: "Туман",
        48: "Отложившийся туман",
        51: "Легкая морось",
        53: "Умеренная морось",
        55: "Сильная морось",
        56: "Легкий ледяной дождь",
        57: "Сильный ледяной дождь",
        61: "Небольшой дождь",
        63: "Умеренный дождь",
        65: "Сильный дождь",
        66: "Ледяной дождь",
        67: "Сильный ледяной дождь",
        71: "Небольшой снегопад",
        73: "Умеренный снегопад",
        75: "Сильный снегопад",
        77: "Снежные гранулы",
        80: "Невысокий ливень",
        81: "Умеренный ливень",
        82: "Сильный ливень",
        85: "Снежные ливни",
        86: "Сильные снежные ливни",
        95: "Гроза",
        96: "Гроза с градом",
        99: "Сильная гроза с градом"
    };
    
    return descriptions[code] || "Неизвестно";
}

// Функция для получения иконки погоды по коду
function getWeatherIcon(code) {
    const icons = {
        0: "☀️",
        1: "🌤️",
        2: "⛅",
        3: "☁️",
        45: "🌫️",
        48: "🌫️",
        51: "🌦️",
        53: "🌦️",
        55: "🌦️",
        56: "🌧️",
        57: "🌧️",
        61: "🌧️",
        63: "🌧️",
        65: "🌧️",
        66: "🌨️",
        67: "🌨️",
        71: "🌨️",
        73: "🌨️",
        75: "🌨️",
        77: "❄️",
        80: "🌦️",
        81: "🌦️",
        82: "🌦️",
        85: "🌨️",
        86: "🌨️",
        95: "⛈️",
        96: "⛈️",
        99: "⛈️"
    };
    
    return icons[code] || "❓";
}

// Загружаем погоду при загрузке страницы
// Проверяем сохранённую тему при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
    
    // Загружаем погоду
    getWeather();
});
