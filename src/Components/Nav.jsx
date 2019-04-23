import React from "react";
import { Link } from "@reach/router";
import "./css/Nav.css";

function Nav({ topics, changePath }) {
  return (
    <nav className="Nav">
      {topics.length
        ? topics.map(topic => (
            <Link to={`/${topic.slug}`} key={topic.slug} onClick={changePath}>
              {topic.slug}
            </Link>
          ))
        : "null"}
    </nav>
  );
}

export default Nav;
