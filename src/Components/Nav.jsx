import React from "react";
import { Link } from "@reach/router";
import "./css/Nav.css";

function Nav({ topics, changePath }) {
  return (
    <nav className="Nav">
      <Link to={"/"} key="allTopics">
        all
      </Link>
      {topics.map(topic => (
            <Link to={`/${topic.slug}`} key={topic.slug}>
              {topic.slug}
            </Link>
          ))}
    </nav>
  );
}

export default Nav;
