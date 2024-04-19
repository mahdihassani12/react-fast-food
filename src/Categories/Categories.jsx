import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

function Categories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://react-mini-projects-api.classbon.com/FoodCategory/categories"
      );
      setCategories(response.data);
      setLoading(false);
    };

    fetch();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }

    return (
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="#">
            همه فست فودها
          </a>
        </li>

        {categories.map((category) => {
          return (
            <li className="nav-item" key={category.id}>
              <a className="nav-link" href="#">
                {category.name}
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav className="container mt-n5">
      <div
        className="d-flex align-items-center bg-white rounded-3 shadow-lg py-4"
        style={{ height: "80px" }}
      >
        {renderContent()}
      </div>
    </nav>
  );
}

export default Categories;
