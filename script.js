$( document ).ready(function() {
    const chicago_button = $('#chicago')
    const burbank_button = $('#burbank')
    const dallas_button = $('#dallas')
    const city_name = $('#city_name')
    const curr_temp = $('#curr_temp')
    const weather_description = $('#weather_description')
    const t_choice = $('#t_choice')

    const locations = {
        'chicago': [41.878113, 87.629799],
        'burbank': [34.180840, -118.308968],
        'dallas' : [32.776665,-96.796989]
    }

    let choice;

    chicago_button.bind('click', function() {
        get_weather_data(locations['chicago'])
    })

    burbank_button.bind('click', function() {
        get_weather_data(locations['burbank'])
    })

    dallas_button.bind('click', function() {
        get_weather_data(locations['dallas'])
    })

    t_choice.bind('change', function() {
        if ( choice != undefined ){
            get_weather_data(choice)
        }
    })

    function get_weather_data(location) {
        choice = location
        let lat = location[0]
        let lon = location[1]

        const weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1000976ee9867cf34c89115f9cbb8588`

        let c_name = Object.keys(locations).find(key => locations[key] === location)
        city_name.text(c_name[0].toUpperCase() + c_name.substring(1))

        fetch(weather)
        .then(response => response.json())
        .then(weather_data => {
            console.log(weather_data)
            let temp = weather_data.main.temp
            let curr_weather = weather_data.weather[0].description
            let f = (temp - 273.15) * (9/5) + 32
            let c = temp - 273.15

            weather_description.text(curr_weather)


            if ( t_choice.val() == 'F') {
                curr_temp.text(`${Math.round(f)}°F`)
            }
            else {
                curr_temp.text(`${Math.round(c)}°C`)
            }
        })
    }
})