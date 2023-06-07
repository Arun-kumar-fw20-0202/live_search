import React from "react";

export const Items = ({ country, city }) => {
  return (
    <>
      <div className="list">
        <h3>{country}</h3>
        <p>{city}</p>
      </div>
    </>
  );
};
