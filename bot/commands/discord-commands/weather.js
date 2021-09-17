const CustomCommand = require('../custom-command');
const DiscordUtils = require('../../discord-utils');
const fetch = require('node-fetch');

const auth = require('../../../auth.json');

module.exports = class Weather extends CustomCommand
{
    constructor()
    {
        super('weather', 'COW bot tells the weather.');
    }

    action(msg)
    {
        // F to celcius
        function tF(c) { return c * 9.0 / 5.0 + 32; }

        DiscordUtils.send('Grabbing the weather now...', msg.channel);

        const API_KEY = auth.weatherAPI;
        const lat = Number(auth.weatherLat);
        const lon = Number(auth.weatherLon);

        fetch(`https://api.darksky.net/forecast/${API_KEY}/${lat},${lon}?units=si`).then(resp => resp.json().then(data =>
        {
            let weatherMsg =
                `== **Currently** ==\nTemperature: ${data.currently.temperature}°C (${~~Math.round(tF(data.currently.temperature))}°F)\n${data.hourly.summary}\nWind:${data.currently.windSpeed} m/s`;

            for (let i = 0; i <= 24; i++)
            {
                let hour = data.hourly.data[i];
                let time = new Date(hour.time * 1000);
                let sum = hour.summary;
                let precip = hour.precipType;
                let prob = hour.precipProbability;
                let temperature = hour.temperature;
                let wind = hour.windSpeed;

                if (weatherMsg.length > 1800)
                {
                    DiscordUtils.send(weatherMsg, msg.channel);
                    weatherMsg = "";
                }

                let timeStr = time.getHours() + '';
                if (time.getHours() > 12)
                    timeStr = time.getHours() % 12 + '';
                else if (time.getHours() === 0)
                    timeStr = '12';

                weatherMsg +=
                    `\n\n**== ${timeStr} ${time.getHours() >= 12 ? 'PM' : 'AM'}** ==\nTemperature: ${~~Math.round(temperature)}°C (${~~Math.round(tF(temperature))}°F)\nSummary: ${sum}\nPrecipitation: ${precip ? `${precip} ${~~Math.round(prob * 100)}%` : 'None'}\nWind: ${wind} m/s`;
            }

            DiscordUtils.send(`${weatherMsg}`, msg.channel);
        }));
    }
};