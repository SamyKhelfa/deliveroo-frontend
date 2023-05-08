import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

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
      <span>{}</span>
      <br />
      <ul>{}</ul>
    </div>
  );
}

export default App;
