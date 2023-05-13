import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import logo from "./assets/img/deliveroo-logo.png";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const addToCart = (meal) => {
    const newCart = [...cart];
    let exists = false;
    //Vérifier si le plat est déjà dans le panier
    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].title === meal.title) {
        newCart[i].quantity += 1; //Si oui augmenter la quantité
        exists = true;
        break;
      }
    }

    // Si le plat n'est pas déjà dans le panier, l'y ajouter avec une quantité de 1
    if (!exists) {
      newCart.push({ ...meal, quantity: 1 });
    }
    setCart(newCart);
  };

  const incrementMeal = (meal) => {
    const newCart = [...cart];
    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].title === meal.title) {
        newCart[i].quantity += 1;
        break;
      }
    }
    setCart(newCart);
  };

  const decrementMeal = (meal) => {
    const newCart = [...cart];
    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].title === meal.title) {
        if (newCart[i].quantity > 1) {
          newCart[i].quantity -= 1;
        } else {
          newCart.splice(i, 1);
        }
        break;
      }
    }
    setCart(newCart);
  };

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
        <img
          src={data.restaurant.picture}
          alt={data.restaurant.name}
          className="restaurant-image"
        />
      </div>
      <div className="main-content">
        {/* Affichage des catégories et des plats */}
        {data.categories.map((category) => (
          <div className="category" key={category.name}>
            <h2>{category.name}</h2>
            <div className="meals">
              {category.meals.map((meal) => (
                <div
                  className="meal"
                  key={meal.id}
                  onClick={() => addToCart(meal)}
                >
                  <div className="meal-text">
                    <h3>{meal.title}</h3>
                    <p className="meal-price">{meal.price} €</p>
                    <p className="meal-description">{meal.description}</p>
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
        <div className="cart">
          {cart.map((item, index) => (
            <div key={index}>
              <p>{item.title}</p>
              <div className="quantity-control">
                <button onClick={() => decrementMeal(item)}>-</button>
                <p>{item.quantity}</p>
                <button onClick={() => incrementMeal(item)}>+</button>
              </div>
              <p>{item.price * item.quantity} €</p>
            </div>
          ))}
          {cart.reduce((acc, item) => acc + item.price * item.quantity, 0) >
            0 && (
            <p>
              Total :{" "}
              {cart
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}{" "}
              €
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
