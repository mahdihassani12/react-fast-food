import React, { useEffect, useState } from "react";
import Categories from "./Categories/Categories";
import Header from "./Header/Header";
import "./App.css";
import Loading from "./Loading/Loading";
import axios from "axios";
import FastFoodList from "./FastFoodList/FastFoodList";

function App() {
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);

  const fetchData = async (categoryId = null) => {
    setLoading(true);
    const response = await axios.get(
      `https://react-mini-projects-api.classbon.com/FastFood/list/${
        categoryId ? "?categoryId=" + categoryId : ""
      }`
    );

    setLoading(false);
    setFoods(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderContent = () => {
    if(loading) {
      return <Loading theme="dark" />
    }

    return <FastFoodList fastFoodItems={foods} />;
  }

  return (
    <div className="wrapper bg-faded-dark">
      <Header></Header>
      <Categories />

      <div className="container mt-4">
        { renderContent() }
      </div>

    </div>
  );
}

export default App;
