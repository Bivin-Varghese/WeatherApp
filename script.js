let locationInput = document.getElementById('locationIn')


function currentLocation() {
    successCallback = (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lon=${longitude}&lat=${latitude}&appid=f58045e3074d5651f958b6875f095c54`)
            .then(data => data.json())
            .then(data => displayData(data))

    }
    navigator.geolocation.getCurrentPosition(successCallback)
}


locationInput.addEventListener('keypress', enterFunc)

function enterFunc(event) {
    if (event.key == 'Enter') {
        // console.log('enter worked');
        weatherData()
    }
}


function weatherData() {

    let locationVal = locationIn.value

    let apiKey = '0ca4ccdfe86dfbaf6a7681024347cabf';
    let api = 'https://api.openweathermap.org/data/2.5/weather?q=' + locationVal + '&appid=' + apiKey;


    fetch(api)
        .then(out => out.json())
        .then(data => {
            if (data.cod === '404') {
                document.querySelector('.error').style.display = 'block'
                // document.querySelector('.card').style.height = '450px'

                document.querySelector('.weather').style.display = 'none'
                document.querySelector('.tag-line').style.display = 'none'
            }
            else {
                displayData(data)

            }
        })



}


//function to display data
function displayData(data) {
    document.getElementById('temperature').innerHTML = Math.round(data.main.temp - 273.15) + '°C';
    document.getElementById('condition').innerHTML = data.weather[0].description;
    document.getElementById('place').innerHTML = data.name;
    document.getElementById('humidity').innerHTML = data.main.humidity + '%';
    document.getElementById('wind').innerHTML = data.wind.speed + 'Km/h';

    let weatherIcon = document.getElementById('w-icon');

    if (data.weather[0].main == 'Clouds') {
        weatherIcon.src = "images/clouds.png"
    }
    else if (data.weather[0].main == 'Clear') {
        weatherIcon.src = "images/clear.png"
    }
    else if (data.weather[0].main == 'Rain') {
        weatherIcon.src = "images/rain.png"
    }
    else if (data.weather[0].main == 'Drizzle') {
        weatherIcon.src = "images/drizzle.png"
    }
    else if (data.weather[0].main == 'Mist') {
        weatherIcon.src = "images/mist.png"
    }

    // document.querySelector('.weather').style.display = ''
    document.querySelector('.error').style.display = 'none'
    document.querySelector('.weather').style.display = 'block'
    document.querySelector('.tag-line').style.display = 'none'

    document.querySelector('.data').style.opacity = '1'


}

