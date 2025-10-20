import React from "react";
import { Link } from "react-router-dom";
export default function ButtonToCategories({ classes, label }) {
  return (
    <Link to="/categories">
      <button className={`${classes}`}>{label}</button>
    </Link>
  );
}
