import React from "react";
import FastFoodItem from "../FastFoodItem/FastFoodItem";

function FastFoodList({ fastFoodItems }) {
  let delay = 0.1;

  return (
    <div className="row">
      {fastFoodItems.map((food) => {
        delay += 0.03;
        return (
          <div className="col-md-4 col-sm-6 mb-grid-gutter" key={food.id}>
            <FastFoodItem {...food} delay={delay} />
          </div>
        );
      })}
    </div>
  );
}

export default FastFoodList;
