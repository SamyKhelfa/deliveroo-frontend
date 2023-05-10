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
        <div className="restaurant-info">
          <h1 className="restaurant-name">{data.restaurant.name}</h1>
          <p className="restaurant-description">
            {data.restaurant.description}
          </p>
        </div>
        {
          <img
            src={data.restaurant.picture}
            alt={data.restaurant.name}
            className="restaurant-image"
          />
        }
      </div>
      {/* Affichage des catégories et des plats */}
      {data.categories.map((category) => (
        <div className="category" key={category.name}>
          <h2>{category.name}</h2>
          <div className="meals">
            {category.meals.map((meal) => (
              <div className="meal" key={meal.id}>
                <div className="meal-text">
                  <h3>{meal.title}</h3>
                  <p className="meal-price">{meal.price} €</p>

                  {/* <p className="meal-description">{meal.description}</p> */}
                </div>
                <div className="meal-img">
                  <img
                    src={meal.picture}
                    alt={meal.title}
                    className="img-meal"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
