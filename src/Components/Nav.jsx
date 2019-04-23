import React from "react";
import { Link } from "@reach/router";
import "./css/Nav.css";

function Nav({ topics }) {
  return (
    <nav className="Nav">
      {topics.length
        ? topics.map(topic => (
            <Link to={`/${topic.slug}`} key={topic.slug}>
              {topic.slug}
            </Link>
          ))
        : "null"}
    </nav>
  );
}

export default Nav;
