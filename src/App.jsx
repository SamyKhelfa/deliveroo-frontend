import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import logo from "./assets/img/deliveroo-logo.png";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--deliveroo-backend--btw6jz59pgz8.code.run/"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      <div className="header">
        <img src={logo} alt="Header" />
      </div>
      <div className="description">
        <span>{data.restaurant.name}</span>
        <br />
        <p className="restaurant-description">{data.restaurant.description}</p>
        <img
          src={data.restaurant.picture}
          alt={data.restaurant.name}
          className="restaurant-image"
        />
      </div>
    </div>
  );
}

export default App;
