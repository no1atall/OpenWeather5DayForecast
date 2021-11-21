import "./App.css";
import api from "./api.js";
import { useState, useEffect } from "react";

function App() {
  //States
  //State to store data from API
  const [responseDatas, setResponseDatas] = useState("");
  //State to display isLoading before axios returns data from API
  const [loading, setLoading] = useState(true);
  //State to display an error message if data isn't retrieved
  const [error, setError] = useState(null);

  //Transform date timestamp from API to a weekday
  function getWeekday(timestamp) {
    const date = new Date(timestamp * 1000);
    const day = date.toDateString().split(" ")[0];
    return day;
  }

  //Round temp to nearest degree C
  function fixTemp(temp) {
    return Math.round(temp);
  }

  //useEffect hook to call fetchData
  useEffect(() => {
    fetchData();
  }, []);

  //Async function using axios to get the data from the OpenWeather API
  async function fetchData() {
    try {
      const data = await api.getData();
      console.log(data.data);
      return setResponseDatas(data.data);
    } catch (erorr) {
      console.log("Error Fetching Data", error);
      setError(error);
    } finally {
      setLoading(false);
    }

  }
  if (loading) return "Loading...";
  if (error) return "Error!";
  return (
    <div className="h-screen flex items-center justify-center text-center text-gray-500 font-bold  ">
      {responseDatas.map((data) => (
        <div key={data.sunrise} id="Card-wrapper">
          <div id="card" className="w-24 mx-2">
            <h3 id="day">{getWeekday(data.dt)}</h3>
            <img
              alt={data.weather[0].description}
              className="mx-auto"
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            />
            <div id="temps" className="flex justify-around">
              <h3 id="highTemp" className="text-gray-900">
                {fixTemp(data.temp.max)}°
              </h3>
              <h3 id="lowTemp">{fixTemp(data.temp.min)}°</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
