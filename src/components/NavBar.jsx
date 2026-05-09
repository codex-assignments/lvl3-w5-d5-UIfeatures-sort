import React from "react";
import { Link } from "react-router";

export default function () {
  return (
    <nav>
      <Link to="/">Assignment</Link>
      <Link to="/ecommerce">Ecommerce Demo</Link>
    </nav>
  );
}
