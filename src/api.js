import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

const KEY = process.env.REACT_APP_API_KEY;

export default {
    getData: () =>
    instance({
        "method": "get",
        "url": `onecall?lat=33.44&lon=-94.04&exclude=current,minutely,hourly&units=metric&appid=${KEY}`,
        transformResponse: [function (data) {
            const json = JSON.parse(data)
            const daily = json.daily.slice(0,5)   
            return daily
        }]
    })
}



