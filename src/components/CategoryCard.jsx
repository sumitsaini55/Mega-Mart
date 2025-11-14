import React from "react";

export default function CategoryCard({ name, onClick }) {
  return (
    <button onClick={() => onClick(name)} className="category-pill mr-3 mb-3">
      {name}
    </button>
  );
}
