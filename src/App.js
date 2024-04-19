import React, { useEffect, useState } from "react";
import Categories from "./Categories/Categories";
import Header from "./Header/Header";
import "./App.css";
import Loading from "./Loading/Loading";
import axios from "axios";
import FastFoodList from "./FastFoodList/FastFoodList";
import Search from "./Search/Search";
import notFound from './assets/images/404.png';

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

  const filterItems = (categoryId) => {
    fetchData(categoryId);
  };

  const searchItems = async (term) => {
    setLoading(true);
    const response = await axios.get(
      `https://react-mini-projects-api.classbon.com/FastFood/search${
        term ? "?term=" + term : ""
      }`
    );

    setLoading(false);
    setFoods(response.data);
  };

  const renderContent = () => {
    if (loading) {
      return <Loading theme="dark" />;
    }

    if (foods.length === 0) {
      return (
        <>
          <div className="alert alert-warning text-center">
            برای کلیدواژه فوق هیچ آیتمی یافت نشد
          </div>
          <img className="mx-auto mt-5 d-block fade-in-horiz" src={notFound} />
        </>
      );
    }

    return <FastFoodList fastFoodItems={foods} />;
  };

  return (
    <div className="wrapper bg-faded-dark">
      <Header></Header>
      <Categories filterItems={filterItems} >
        <Search searchItems={searchItems} />
      </Categories>

      <div className="container mt-4">{renderContent()}</div>
    </div>
  );
}

export default App;
