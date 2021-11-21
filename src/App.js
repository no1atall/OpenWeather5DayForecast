import "./App.css";
import api from "./api.js";
import { useState, useEffect } from "react";

function App() {
  const [responseDatas, setResponseDatas] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getWeekday(timestamp) {
    const date = new Date(timestamp * 1000);
    const day = date.toDateString().split(" ")[0];
    return day;
  }

  function fixTemp(temp) {
    return Math.round(temp);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    api
      .getData()

      .then((response) => {
        setResponseDatas(response.data);
        console.log(response.data);
        // console.log("Response Data", response.data);
      })
      .catch((error) => {
        console.log("Error Fetching Data", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  if (loading) return "Loading...";
  if (error) return "Error!";
  return (
    <div  className="h-screen flex items-center justify-center text-center text-gray-500 font-bold  ">
      {responseDatas.map((data) => (
        <div key={data.sunrise} id="Card-wrapper">
          <div id="card" className="w-24 mx-2">
            <h3 id="day">{getWeekday(data.dt)}</h3>
            <img
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
